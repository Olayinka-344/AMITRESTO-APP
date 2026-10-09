import { useEffect, useState } from "react";
import { client } from "../sanity/client";
import { carouselQuery } from "../sanity/queries";
import Hero from "../assets/pictures/hero.mp4";
import { urlFor } from "../sanity/imageUrl";
import { PercentageQuery } from "../sanity/queries";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { FaCartArrowDown } from "react-icons/fa";

function Home() {
  const [ carousels, setCarousels ] = useState([]);
  const [ percentOff, setPercentOff ] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    client
      .fetch(carouselQuery)
      .then((data) => {
        console.log(data);
        setCarousels(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const ArrivalCarousel = carousels.find(
    (carousel) => carousel.section === "arrivals",
  );

  const DiscountCarousel = carousels.find(
    (carousel) => carousel.section === "discount",
  );

  useEffect(() => {
    client
      .fetch(PercentageQuery)
      .then((data) => {
        console.log(data);
        setPercentOff(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  function handleAddToCart(item: any) {
    console.log("home item:", item._id, item.percentagePrice);
    addToCart({
      _id: item._id,
      name: item.percentageName,
      image: item.image,
      price: item.percentagePrice,
    }, 1);
    toast.success("Item added to cart");
  }

  return (
    <section id="HomePage" className="Homepage">
      <video src={Hero} autoPlay muted loop preload="metadata"></video>

      <div className="Arrival">
        <div className="arrival-track">
          {ArrivalCarousel?.image?.map((image: any, index: number) => (
            <img src={urlFor(image).width(600).url()} key={index} alt="" />
          ))}

          {ArrivalCarousel?.image?.map((image: any, index: number) => (
            <img src={urlFor(image).width(600).url()} key={index} alt="" />
          ))}
        </div>
      </div>

      <div className="Discount_grid">
        {DiscountCarousel?.image?.map((image: any, index: number) => (
          <img src={urlFor(image).width(600).url()} key={index} alt="" />
        ))}
      </div>

      <div className="foodContainer percentage-off-container">
        <div className="percentOff-grid products-grid">
          {percentOff.map((item: any, index: number) => (
          <div key={item.id ?? index} className="percentage-off-card product-card">
            <div className="percent-image">
              {item.image && (
              <img src={urlFor(item.image).url()} alt={item.percentageName} />
            )}
            </div>
            <div className="percentage-tag">{item.percentage}%</div>
            <h5>{item.percentageName}</h5>
            <p>₦{item.percentagePrice}</p>
            <p className="initial-price">₦{item.originalPrice}</p>
            <button onClick={() => handleAddToCart(item)} className="search-cart-btn">
              <FaCartArrowDown /> <span>Add to cart</span>
            </button>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}

export default Home;

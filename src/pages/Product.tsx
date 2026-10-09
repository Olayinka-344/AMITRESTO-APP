import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../sanity/client";
import { allFoods } from "../sanity/queries";
import { urlFor } from "../sanity/imageUrl";
import { FaCartArrowDown } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { MdNoMeals } from "react-icons/md";
import { toast } from "react-toastify";

function Products() {
  const { categoryId } = useParams();
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, SetLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    SetLoading(true);

    client
      .fetch(allFoods, { categoryId })
      .then((data) => {
        setFoods(data);
        setSelectedIndex(0);
        SetLoading(false);
      })
      .catch((error) => {
        console.error(error);
        SetLoading(false);
      });
  }, [categoryId]);

  function handleSelect(newIndex: number) {
    if (selectedIndex !== null && newIndex !== selectedIndex) {
      setDirection(newIndex > selectedIndex ? "left" : "right");
    }
    setSelectedIndex(newIndex);
    setQuantity(1);
  }

  function handleAddToCart() {
    addToCart(
      { _id: food._id, name: food.name, image: food.image, price: food.price },
      quantity,
    );
    toast.success("Item added to cart");
  }

  if (loading)
    return (
      <div className="loaders">
        <div className="spinner-border spinner-border-sm loader" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow spinner-grow-sm loader" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  const food = selectedIndex !== null ? foods[selectedIndex] : null;

  return (
    <div className="Products-page">
      {food && (
        <div className="food-detailed-card-wrapper">
          <div key={food._id}>
            <div className="detail-top">
              <h1>{categoryId}</h1>
              <p className="detail-description">
                {food.name || "A deliciouse meal"}
              </p>
            </div>

            {food.image && (
              <img
                src={urlFor(food.image).width(600).url()}
                alt=""
                className={`food-detail-card detail-image slide-${direction}`}
              />
            )}

            <div className="portion-selector">
              <span className="detail-price">₦{food.price * quantity}</span>
              <div className="qty-control">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>
            </div>

            <div>
              <button className="add-to-cart" onClick={handleAddToCart}>
                <div className="btn-svg-cart">
                  <FaCartArrowDown />
                  <p>Add To Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="foodContainer">
        <div className="products-grid">
          {foods.length > 0 ? (
            foods.map((food, index) => (
              <div
                key={food._id}
                className="product-card"
                onClick={() => handleSelect(index)}
              >
                {food.image && (
                  <img src={urlFor(food.image).url()} alt={food.name} />
                )}
                <h5>{food.name}</h5>
                <p>₦{food.price}</p>
              </div>
            ))
          ) : (
            <div className="no-items-yet">
              <div className="no-item-svg-container">
                <MdNoMeals />
              </div>
              <p>no items yet.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default Products;

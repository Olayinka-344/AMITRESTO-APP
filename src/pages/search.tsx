import { useEffect, useRef, useState } from "react";
import { client } from "../sanity/client";
import { GlobalFoods } from "../sanity/queries";
import { urlFor } from "../sanity/imageUrl";
import { useCart } from "../context/CartContext";
import { FaCartArrowDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { toast } from "react-toastify";

function Search() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSearch() {
    if (!keyword.trim()) return;

    client
      .fetch(GlobalFoods, { keyword: `*${keyword}*` })
      .then((data) => setResult(data))
      .catch((error) => console.error(error));
  }

  function handleAddToCart(food: any) {
    addToCart({
      _id: food._id,
      name: food.name,
      image: food.image,
      price: food.price,
      quantity: 1,
    });
    toast.success("Item added to cart");
  }

  return (
    <div className="search-page">
      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setResult([])}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
          placeholder="Search By Keyword"
        />
        <button type="button" onClick={handleSearch} className="Search-btn">
          <IoSearch />
        </button>
      </div>

      <div className="search-result products-grid">
        {result.map((food) => (
          <div key={food._id} className="search-card product-card">
            {food.image && (
              <img src={urlFor(food.image).url()} alt={food.name} />
            )}
            <h5>{food.name}</h5>
            <p>{food.price}</p>
            <button onClick={() => handleAddToCart(food)} className="search-cart-btn">
              <FaCartArrowDown /> <span>Add to cart</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;

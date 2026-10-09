import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../sanity/client";
import { FoodQuery, CategoryFlyerQuery } from "../sanity/queries";
import { urlFor } from "../sanity/imageUrl";
import { Link } from "react-router-dom";

function CategoryDetails() {
  const { categoryId } = useParams();
  const [foods, setFoods] = useState<any[]>([]);
  const [flyer, setFlyer] = useState<any>(null);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    SetLoading(true);

    Promise.all([
      client.fetch(FoodQuery, { categoryId }),
      client.fetch(CategoryFlyerQuery, { categoryId }),
    ])
      .then(([foodData, flyerData]) => {
        setFoods(foodData);
        setFlyer(flyerData);
        SetLoading(false);
      })
      .catch((error) => {
        console.error(error);
        SetLoading(false);
      });
  }, [categoryId]);

  if (loading)
    return (
      <div className="category-Detail">
        <div className="food-card">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="foodCard">
              <div className="placeholder-glow">
                <span
                  className="placeholder col-12"
                  style={{ height: "150px", display: "block" }}
                ></span>
                <span className="placeholder col-7 mt-2"></span>
                <span className="placeholder col-4"></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="category-Detail">
      <div className="View-all">
        <Link to={`/products/${categoryId}`}>All Products</Link>
      </div>
      {flyer?.flyerImage && (
        <img
          src={urlFor(flyer.flyerImage).url()}
          alt={`${categoryId} flyer`}
          className="category-flyer"
        />
      )}

      <div>
        <div className="food-card-grid">
          {foods.length > 0 ? (
            foods.map((food) => (
              <div key={food._id} className="foodCard">
                <div className="food-Image">
                  {food.image && (
                    <img src={urlFor(food.image).url()} alt={food.name} />
                  )}
                </div>
                <h5>{food.name}</h5>
                <p>${food.price}</p>
              </div>
            ))
          ) : (
            <p className="no-Items">No items Yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default CategoryDetails;

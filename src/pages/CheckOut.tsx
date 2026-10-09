import { useState, type SubmitEvent } from "react";
import { useCart } from "../context/CartContext";
import { IoArrowUndoCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { placeOrder } from "../Hooks/OrderService";
import { toast } from "react-toastify";

function CheckOut() {
  const { cartItems } = useCart();
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handlePlaceOrder = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPlacingOrder(true);
    const result = toast.promise(
      placeOrder(cartItems, { name, phone, email, address }),
      {
        pending: "Placing Your Order",
        success: "order placed successfully",
        error:
        "couldn't place order. check your internet connection and try again",
      }
    );
    console.log("toast.promise returned:", result);
    result.finally(() => {
      setIsPlacingOrder(false);
    });
    };
  const totalItems = cartItems.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="checkout-page">
      <div className="Pc-summary-container">
        <div className="summary-bar">
          <div className="go-back">
            <Link to="/cart">
              <IoArrowUndoCircle />
            </Link>
          </div>
          <div className="summary-info">
            <span>
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </span>
            <span>(₦{totalPrice})</span>
          </div>
          <div></div>

          <button
            className="expand-arrow"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? <IoMdArrowDropupCircle /> : <IoMdArrowDropdownCircle />}
          </button>
        </div>

        {expanded && (
          <table className="summary-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price ₦</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: any) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₦{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <form className="order-form" onSubmit={handlePlaceOrder}>
        <div className="form-group">
          <label htmlFor="">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            type="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Delivery Address</label>
          <textarea
            name="deliveryAdress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={5}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isPlacingOrder}>
          {isPlacingOrder ? (
            <>
              <div
                className="spinner-border spinner-border-sm"
                role="status"
              ></div>
              <div className="spinner-grow spinner-grow-sm" role="status"></div>
            </>
          ) : (
            "Place Order"
          )}
        </button>
      </form>
    </div>
  );
}

export default CheckOut;

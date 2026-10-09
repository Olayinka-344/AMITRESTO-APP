import { useCart } from "../context/CartContext";
import { urlFor } from "../sanity/imageUrl";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


function Cart() {
    const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();
    const total = cartItems.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity, 0
    );

    function handleRemove(id: string){
        removeFromCart(id);
        toast.success("Removed from cart");
        
    }
    
    if (cartItems.length === 0) {
        return (
            <div className="cart-page emptyPage">
                <div className="Svg-container">
                    <HiMiniShoppingCart />
                </div>
                <h4 className="empty-cart"> Your cart is empty!.</h4>
                <p>Browse our categories and discover our best deals!</p>
                <Link to="/category"><button className="start-shopping">Start Shopping</button></Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-summary">
                <h5>Cart Summary :</h5>
                <div className="underline"></div>
                <p>Cart <span className="sumry-span">{cartItems.length}</span></p>
                <div className="underline"></div>
                <p>Total<span className="sumry-span">${total}</span></p>
                <div className="underline"></div>
                <Link to="/checkout"><button className="checkout-btn">Checkout</button></Link>
            </div>
            
            <div className="cart-items">
                <div className="PcMediaQuery-Cart">
                    {cartItems.map((item: any) => (
                    <div key={item._id} className="cart-card">
                        {item.image && (
                            <img src={urlFor(item.image).width(150).url()} alt={item.name}  />
                        )}

                        <div className="cart-card-info">
                            <h5>{item.name}</h5>
                            
                            <div className="underline"></div>
                            <p className="cart-item-price">$ {item.price * item.quantity}</p>
                            <div className="underline"></div>

                            <div className="cart-qty-control">
                                <button onClick={() => decreaseQty(item._id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => increaseQty(item._id)}>+</button>
                            </div>

                            <button className="remove" onClick={() => handleRemove(item._id) }>Remove</button>
                        </div>
                        
                    </div>
                ))}
                </div>
            </div>

        </div>
    );
}

export default Cart;
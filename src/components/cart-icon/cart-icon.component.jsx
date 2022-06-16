import { ReactComponent as ShoppingIcon } from "../../assetts/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import "./cart-icon.styles.scss";
const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartQuantity } = useContext(CartContext);
  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartQuantity}</span>
    </div>
  );
};

export default CartIcon;

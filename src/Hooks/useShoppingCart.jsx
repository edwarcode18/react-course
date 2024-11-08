import { useContext } from "react";
import { ShoppingCartContext } from "../Context";

export const useShoppingCart = () => useContext(ShoppingCartContext);
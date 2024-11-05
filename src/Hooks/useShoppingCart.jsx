import { useContext } from "react";
import { ShoppingCartContext } from "../Context";

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
};
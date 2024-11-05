import { createContext, useState } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    // Shopping Cart . Increment quantity
    const [count, setCount] = useState(0);
    const incrementCount = () => setCount(count + 1);

    // Product Detail . Open / Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const [productToShow, setProductToShow] = useState(null);

    // Product Detail . Show product
    const showProduct = (productDetail) => {
        setIsProductDetailOpen(true);
        setProductToShow(productDetail);
        setIsCheckoutSideMenuOpen(false);
    };

    // Checkout Side Menu . Open / Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);

    // Shopping Cart . Add products to cart
    const [cartProducts, setCartProducts] = useState([]);

    return (
        <ShoppingCartContext.Provider value={{ count, incrementCount, isProductDetailOpen, setIsProductDetailOpen, productToShow, showProduct, cartProducts, setCartProducts, isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
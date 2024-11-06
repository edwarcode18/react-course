import { createContext, useState } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
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

    const totalPrice = (products) => products.reduce((sum, product) => sum + product.price, 0);

    const [order, setOrder] = useState([])

    return (
        <ShoppingCartContext.Provider value={{ isProductDetailOpen, setIsProductDetailOpen, productToShow, showProduct, cartProducts, setCartProducts, isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen, totalPrice, order, setOrder }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
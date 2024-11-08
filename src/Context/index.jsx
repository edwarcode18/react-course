import { createContext, useState, useEffect } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { FaPlus, FaCheck } from "react-icons/fa6";
import Card from "../Components/Card"

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

    const getTotalPrice = (products) => products.reduce((sum, product) => sum + product.price, 0);

    // Shopping Cart . Order
    const [order, setOrder] = useState([])

    // Get products
    const [products, setProducts] = useState([]);

    // Get Orders Card
    const currentDate = () => new Date().toLocaleDateString();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.escuelajs.co/api/v1/products');
                if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const menu1 = [
        { to: '/', text: 'Shopi', className: 'font-semibold text-lg' },
        { to: '/', text: 'All', className: '' },
        { to: '/clothes', text: 'Clothes', className: '' },
        { to: '/electronics', text: 'Electronics', className: '' },
        { to: '/furnitures', text: 'Furnitures', className: '' },
        { to: '/toys', text: 'Toys', className: '' },
        { to: '/others', text: 'Others', className: '' }
    ]

    const menu2 = [
        { to: '/email', text: 'edwar@gmail.com', className: 'text-black/60' },
        { to: '/my-orders', text: 'My Orders', className: '' },
        { to: '/my-account', text: 'My Account', className: '' },
        { to: '/sing-in', text: 'Sing In', className: '' },
        {
            to: '/shopping-cart',
            element: (
                <div className="flex items-center gap-1">
                    <GiShoppingCart className='w-6 h-6' />
                    <div>{cartProducts.length}</div>
                </div>
            ),
            className: ''
        },
    ]

    // Functions Checkout Side Menu
    const handleDelete = (id) => setCartProducts(cartProducts.filter(product => product.id != id));

    const handleCheckout = () => {
        const orderToAdd = {
            date: currentDate(),
            products: cartProducts,
            totalProducts: cartProducts.length,
            totalPrice: getTotalPrice(cartProducts)
        }

        setOrder([...order, orderToAdd]);
        setCartProducts([]);
        setIsCheckoutSideMenuOpen(false);
    }

    // Function Card
    const addProductsToCart = (e, productData) => {
        e.stopPropagation();
        setCartProducts([...cartProducts, productData]);
        setIsCheckoutSideMenuOpen(true);
    }

    const renderIcon = (data) => {
        const isInCart = cartProducts.some(product => product.id === data?.data?.id);
        const IconComponent = isInCart ? FaCheck : FaPlus;
        return (
            <button className={`absolute top-0 right-0 flex justify-center items-center bg-white rounded-full m-2 p-1`} {...(!isInCart && { onClick: (e) => addProductsToCart(e, data?.data) })}>
                <IconComponent className={`w-6 h-6 text-${isInCart ? 'green' : 'black'}`} />
            </button>
        )
    }

    // Get products by title
    const [searchByTitle, setSearchByTitle] = useState('');

    // Get products
    const [filteredItems, setFilteredItems] = useState(null);

    const filteredItemsByTitle = (items, searchByTitle) =>
        items?.filter(item => item?.title.toLowerCase().includes(searchByTitle.toLowerCase()));

    useEffect(() => {
        if (searchByTitle) {
            setFilteredItems(filteredItemsByTitle(products, searchByTitle));
        } else {
            setFilteredItems(products);
        }
    }, [searchByTitle, products]);

    const renderView = () => {
        const itemsToRender = searchByTitle
            ? filteredItems : products;

        return itemsToRender
            ? itemsToRender.map(item => (
                <Card key={item.id} data={item} />
            ))
            : <p>No Results Found</p>;
    }

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchByTitle(inputValue);
        }, 300);

        return () => clearTimeout(timer);
    }, [inputValue, setSearchByTitle]);

    return (
        <ShoppingCartContext.Provider value={{
            isProductDetailOpen, setIsProductDetailOpen, productToShow, showProduct, cartProducts, setCartProducts, isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen, getTotalPrice, order, setOrder, products, setProducts, currentDate, menu1, menu2, handleDelete, handleCheckout, addProductsToCart, renderIcon, searchByTitle, setSearchByTitle, renderView, setInputValue
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

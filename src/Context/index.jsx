import { useCallback, createContext, useState, useEffect } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { FaPlus, FaCheck } from "react-icons/fa6";
import Card from "../Components/Card"

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    // Product Detail . Open / Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const [productToShow, setProductToShow] = useState(null);
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
    const [cartProducts, setCartProducts] = useState([]);
    const [order, setOrder] = useState([])
    const [products, setProducts] = useState([]);
    const [searchByTitle, setSearchByTitle] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [category, setCategory] = useState(null);

    // Fetch products
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

    // Filtrar productos por título
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchByTitle(inputValue);
        }, 300);

        return () => clearTimeout(timer);
    }, [inputValue]);

    useEffect(() => {
        let filtered = products;
        if (searchByTitle) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchByTitle.toLowerCase())
            );
        }
        if (category) {
            setSearchByTitle(null);
            filtered = filtered.filter(product =>
                product.category.name.toLowerCase().trim() === category.toLowerCase().trim()
            );
        }
        setFilteredItems(filtered);
    }, [searchByTitle, category, products]);

    const filterProductsByCategory = (categoryParam) => {
        setCategory(categoryParam);
    };

    const renderView = () => {
        return filteredItems.length > 0
            ? filteredItems.map(item => <Card key={item.id} data={item} />)
            : <p>No Results Found</p>;
    };

    // Product Detail . Show product
    const showProduct = (productDetail) => {
        setIsProductDetailOpen(true);
        setProductToShow(productDetail);
        setIsCheckoutSideMenuOpen(false);
    };

    const getTotalPrice = (products) => products.reduce((sum, product) => sum + product.price, 0);

    // Get Orders Card
    const currentDate = () => new Date().toLocaleDateString();

    const menu1 = [
        { to: '/', text: 'Shopi', className: 'font-semibold text-lg' },
        { to: '/', text: 'All', className: '' },
        { to: '/category/clothes', text: 'Clothes', className: '' },
        { to: '/category/electronics', text: 'Electronics', className: '' },
        { to: '/category/furnitures', text: 'Furnitures', className: '' },
        { to: '/category/toys', text: 'Toys', className: '' },
        { to: '/category/others', text: 'Others', className: '' }
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

    return (
        <ShoppingCartContext.Provider value={{
            isProductDetailOpen, setIsProductDetailOpen, productToShow, showProduct, cartProducts, setCartProducts, isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen, getTotalPrice, order, setOrder, products, setProducts, currentDate, menu1, menu2, handleDelete, handleCheckout, addProductsToCart, renderIcon, searchByTitle, setSearchByTitle, renderView, setInputValue, filterProductsByCategory, category, setCategory
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

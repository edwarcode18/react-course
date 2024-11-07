import { IoMdClose } from "react-icons/io";
import { useShoppingCart } from "../../Hooks/useShoppingCart";
import OrderCard from "../OrderCard";
import { Link } from "react-router-dom";

const CheckoutSideMenu = () => {
    const { isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen, cartProducts, setCartProducts, totalPrice, order, setOrder } = useShoppingCart();

    const handleDelete = (id) => setCartProducts(cartProducts.filter(product => product.id != id));

    const handleCheckout = () => {
        const orderToAdd = {
            date: '01.02.23',
            products: cartProducts,
            totalProducts: cartProducts.length,
            totalPrice: totalPrice(cartProducts)
        }

        setOrder([...order, orderToAdd]);
        setCartProducts([]);
        setIsCheckoutSideMenuOpen(false);
    }

    return (
        <aside className={`${isCheckoutSideMenuOpen ? 'flex' : 'hidden'} w-[360px] top-[68px] flex-col fixed right-0 border border-black rounded-lg bg-white h-[calc(100vh-68px)]`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>My Order</h2>
                <IoMdClose className='h-6 w-6 cursor-pointer' onClick={() => setIsCheckoutSideMenuOpen(false)} />
            </div>
            <div className='px-6 overflow-y-auto flex-1'>
                {
                    cartProducts.map(product => (
                        <OrderCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            imageUrl={product.images[0]}
                            price={product.price}
                            handleDelete={handleDelete}
                        />
                    ))
                }
            </div>
            <div className='px-6 mb-6'>
                <p className='flex justify-between items-center mb-2'>
                    <span className='font-light'>Total:</span>
                    <span className='font-medium text-2xl'>${totalPrice(cartProducts)}</span>
                </p>
                {cartProducts.length > 0 ? (
                    <Link to='/my-orders/last'>
                        <button className='bg-black text-white rounded-lg py-3 w-full' onClick={() => handleCheckout()}>Checkout</button>
                    </Link>
                ) : null}

            </div>
        </aside >
    )
}

export default CheckoutSideMenu
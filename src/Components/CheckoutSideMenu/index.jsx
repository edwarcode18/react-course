import { IoMdClose } from "react-icons/io";
import { useShoppingCart } from "../../Hooks/useShoppingCart";
import OrderCard from "../OrderCard";

const CheckoutSideMenu = () => {
    const { isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen, cartProducts } = useShoppingCart();
    return (
        <aside className={`${isCheckoutSideMenuOpen ? 'flex' : 'hidden'} w-[360px] top-[68px] flex-col fixed right-0 border border-black rounded-lg bg-white h-[calc(100vh-68px)]`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>My Order</h2>
                <IoMdClose className='h-6 w-6 cursor-pointer' onClick={() => setIsCheckoutSideMenuOpen(false)} />
            </div>
            <div>
                {
                    cartProducts.map(product => {
                        <OrderCard
                            key={product.id}
                            title={product.title}
                            imageUrl={product.images[0]}
                            price={product.price}
                        />
                    })
                }
            </div>
        </aside >
    )
}

export default CheckoutSideMenu
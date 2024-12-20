import { FaChevronRight } from "react-icons/fa";
import { useShoppingCart } from "../../Hooks/useShoppingCart";

const OrdersCard = props => {
    const { currentDate } = useShoppingCart();
    const { totalPrice, totalProducts } = props;

    return (
        <div className='flex justify-between items-center mb-4 border border-black rounded-lg p-4 w-80'>
            <div className='flex justify-between w-full'>
                <p className='flex flex-col'>
                    <span className='font-light'>{currentDate()}</span>
                    <span className='font-light'>{totalProducts} articles</span>
                </p>
                <p className='flex items-center gap-2'>
                    <span className='font-medium text-2xl'>${totalPrice}</span>
                    <FaChevronRight className='h-6 w-6 cursor-pointer' />
                </p>
            </div>
        </div>
    )
}

export default OrdersCard
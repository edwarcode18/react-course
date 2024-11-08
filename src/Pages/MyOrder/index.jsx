import OrderCard from "../../Components/OrderCard";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../Hooks/useShoppingCart";
import { useParams } from "react-router-dom";

function MyOrder() {
    const { order } = useShoppingCart();
    const { id } = useParams()

    return (
        <div>
            <div className='flex items-center justify-center relative w-80 mb-6'>
                <Link to='/my-orders' className='absolute left-0'>
                    <FaChevronLeft className='h-6 w-6 cursor-pointer' />
                </Link>
                <h1>My Order</h1>
            </div>
            <div className='flex flex-col w-80'>
                {
                    order?.at(id === 'last' ? -1 : id)?.products.map(product => (
                        <OrderCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            imageUrl={product.images[0]}
                            price={product.price}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default MyOrder
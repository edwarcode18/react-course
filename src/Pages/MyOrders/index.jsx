import OrdersCard from "../../Components/OrdersCard"
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../Hooks/useShoppingCart";

function MyOrders() {
    const { order } = useShoppingCart();

    return (
        <div>
            <div className='flex items-center justify-center relative w-80'>
                <h1>My Orders</h1>
            </div>
            {
                order.map((order, index) => {
                    <Link key={index} to={`/my-orders/${order.id}`}>
                        <OrdersCard
                            totalPrice={order.totalPrice} totalProducts={order.totalProducts} />
                    </Link>
                })
            }
        </div>
    )
}

export default MyOrders
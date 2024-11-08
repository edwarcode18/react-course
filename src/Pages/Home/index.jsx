import ProductDetail from "../../Components/ProductDetail";
import { useShoppingCart } from "../../Hooks/useShoppingCart";

function Home() {
    const { setInputValue, renderView } = useShoppingCart();

    return (
        <div>
            <div className='flex items-center justify-center relative w-80 mb-4'>
                <h1 className='font-medium text-xl'>Exclusive Products</h1>
            </div>
            <input
                type="text"
                placeholder='Search a product'
                className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
                onChange={(event) => setInputValue(event.target.value)} />
            <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
                {renderView()}
            </div>
            <ProductDetail />
        </div>
    );
}

export default Home

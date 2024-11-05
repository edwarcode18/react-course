import { FaPlus } from "react-icons/fa6";
import { useShoppingCart } from "../../Hooks/useShoppingCart";

const Card = (data) => {
    const { incrementCount, showProduct, cartProducts, setCartProducts, setIsCheckoutSideMenuOpen } = useShoppingCart();

    const addProductsToCart = (e, productData) => {
        e.stopPropagation();
        incrementCount();
        setCartProducts([...cartProducts, productData]);
        setIsCheckoutSideMenuOpen(true);
    }

    return (
        <article className='bg-white cursor-pointer w-56 h-60 rounded-lg' onClick={() => showProduct(data?.data || {})}>
            <figure className='relative mb-2 w-full h-4/5'>
                <figcaption className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>{data?.data?.category?.name || ''}</figcaption>
                <img className='w-full h-full object-cover rounded-lg' src={data?.data?.images[0]?.replace(/[\[\]"]/g, '') || ''} alt={data?.data?.title} />
                <FaPlus className='absolute top-0 right-0 flex justify-center items-center bg-white text-black w-6 h-6 rounded-full m-2 p-1' onClick={(e) => addProductsToCart(e, data?.data)} />
            </figure>
            <p className='flex justify-between items-center'>
                <span className='text-sm font-light'>{data?.data?.title}</span>
                <span className='text-lg font-medium'>${data?.data?.price}</span>
            </p>
        </article>
    )
}

export default Card
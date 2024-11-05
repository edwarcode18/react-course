import { IoMdClose } from "react-icons/io";
import { useShoppingCart } from "../../Hooks/useShoppingCart";

const ProductDetail = () => {
    const { isProductDetailOpen, setIsProductDetailOpen, productToShow } = useShoppingCart();
    return (
        <aside className={`${isProductDetailOpen ? 'flex' : 'hidden'} w-[360px] top-[68px] flex-col fixed right-0 border border-black rounded-lg bg-white h-[calc(100vh-68px)]`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>Detail</h2>
                <IoMdClose className='h-6 w-6 cursor-pointer' onClick={() => setIsProductDetailOpen(false)} />
            </div>
            {productToShow ? (
                <>
                    <figure className='px-6'>
                        <img className='w-full h-full object-cover rounded-lg' src={productToShow?.images[0]?.replace(/[\[\]"]/g, '') || ''} alt={productToShow?.title} />
                    </figure>
                    <p className='flex flex-col p-6'>
                        <span className='font-medium text-2xl mb-2'>${productToShow?.price}</span>
                        <span className='font-medium text-md'>{productToShow?.title}</span>
                        <span className='font-light text-sm'>{productToShow?.description}</span>
                    </p>
                </>
            ) : (
                <p className='p-6'>Cargando detalles del producto...</p>
            )}
        </aside >
    )
}

export default ProductDetail
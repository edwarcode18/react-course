import { useState, useEffect } from "react";
import Card from "../../Components/Card"
import ProductDetail from "../../Components/ProductDetail";

function Home() {
    const [products, setProducts] = useState([]);
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

    return (
        <div>
            Home
            <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
                {products?.map((product, index) => (
                    <Card key={product?.id ? `product-${product.id}` : `error-${index}-${Math.random()}`} data={product} />
                ))}
            </div>
            <ProductDetail />
        </div>
    );
}

export default Home

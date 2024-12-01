import { useEffect, useState } from "react"
import productsJson from "../../assets/products/products.json"
import ProductContainer from "./ProductContainer";
import Product from "./Product";

interface ProductContainerHandlerProps {

}

export default function ProductContainerHandler({}: ProductContainerHandlerProps) {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const products = productsJson.products.map((product: any) => new Product(product.image, product.imgDescription, product.title, product.description, product.direction, product.bg))
        setProducts(products);
    },[])
    return (
        <div>
            {products.map((product, i) => <ProductContainer key={i} {...product} direction={i%2==1 ? "right" : "left"} />)}
        </div>
    )

}
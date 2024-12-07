import { useCart } from "../context/CartContext"

export default function Cart() {
    const { products } = useCart();
    return (
        <div>
            <h1>Cart</h1>
            <div>
                {products && products.map((product, index) => {
                    return (
                        <div key={index}>
                            <img src={product.image} alt="product" />
                            <p>Product type: {product.product_type}</p>
                            <p>Quantity: {product.quantity}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
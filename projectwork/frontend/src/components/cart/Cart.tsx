import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from "../context/CartContext";
import { getPriceFromId } from '../../product/product';
import classes from './Cart.module.css';
import Button from '../../common/button/Button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Cart() {
    const { products } = useCart();
    const total = products?.reduce((acc, product) => acc + getPriceFromId(product.product_type) * product.quantity, 0) || 0;
    const navigator = useNavigate();
    const { isLoggedIn } = useUser();

    return (
        <div className="container">
            <div className="d-flex flex-column w-100" style={{ paddingTop: "5rem" }}>
                <h2>My Cart</h2>
                <p>You can manage your custom products here before ordering them. You can change the amount and delete unwanted items.</p>
                {!products || products.length === 0 &&
                    <div className="alert alert-warning" role="alert">
                        There is nothing in your cart.
                    </div>
                }
                {products && products.length > 0 &&
                    <div className={classes.cardBodyCart}>
                        {products.map((product, index) => (
                            <ProductRow key={product.id} product={product} index={index} />
                        ))}
                        <div className="text-end w-100 mt-4">
                            <h5 className="fw-bold">Total: {total.toLocaleString()} Ft</h5>
                            <Button onClick={() => {
                                if (!isLoggedIn) {
                                    navigator('/login?redirect=/order');
                                    return;
                                }
                                navigator('/order');
                            }} text='Order' buttonStyle='btn-success'></Button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

function ProductRow({ product, index }: { product: any, index: number }) {
    const { removeProduct, addProduct, deleteProduct } = useCart();
    return (
        <div className={"row align-items-center py-3 w-100 " + classes.cardCart} key={index}>
            <div className={"col-2"}>
                <img src={product.image} alt="Product" className="img-fluid rounded" />
            </div>
            <div className='col-6'>
                <h5 className="mb-1">{product.name}</h5>
                <p className="mb-0 text-muted">{product.description}</p>
            </div>
            <div className="col-2">
                <h4 className="mb-1">{product.product_type}</h4>
                <p className="mb-0 text-muted">Amount: {product.quantity}</p>
                <div className='d-flex justify-content-center'>
                    <div onClick={() => removeProduct(product)}>-</div>
                    <div onClick={() => addProduct(product)}>+</div>
                </div>
                <div onClick={() => deleteProduct(product)}>Delete</div>
            </div>
            <div className="col-2 text-end">
                <h4 className="mb-0">{getPriceFromId(product.product_type)} Ft</h4>
            </div>
        </div>
    );
}
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from "../context/CartContext";

export default function Cart() {
    const { products } = useCart();

    if (!products) {
        return (
            <div className="container my-5">
                <div className="alert alert-warning" role="alert">
                    Nincs termék a kosárban.
                </div>
            </div>
        );
    }

    const total = 5000;

    return (
        <div className="container my-5">
            <h1>Cart</h1>
            <div className="card shadow">
                <div className="card-body">
                    {products.map((product, index) => (
                        <div className="row align-items-center border-bottom py-3" key={index}>
                            <div className="col-2">
                                <img src={product.image} alt="Product" className="img-fluid rounded" />
                            </div>
                            <div className="col-6">
                                <h5 className="mb-1">{product.product_type}</h5>
                                <p className="mb-0 text-muted">Mennyiség: {product.quantity}</p>
                            </div>
                            <div className="col-4 text-end">
                                <h6 className="mb-0">{("5000").toLocaleString()} Ft</h6>
                            </div>
                        </div>
                    ))}
                    <div className="text-end mt-4">
                        <h5 className="fw-bold">Összesen: {total.toLocaleString()} Ft</h5>
                        <button className="btn btn-danger mt-2">Rendelés</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
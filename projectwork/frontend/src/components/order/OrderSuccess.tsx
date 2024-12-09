import { useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

export default function OrderSuccess({ }) {
    const location = useLocation();
    const { setProducts } = useCart();
    useEffect(() => {
        setProducts([]);
    }, []);


    const order = location.state || {};
    const { billing, address } = order.orderData;
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Data Display</h1>

            <section style={{ marginBottom: "20px" }}>
                <h2>Billing Information</h2>
                <p><strong>First Name:</strong> {billing.firstName}</p>
                <p><strong>Last Name:</strong> {billing.lastName}</p>
                <p><strong>Email:</strong> {billing.email}</p>
                <p><strong>Phone:</strong> {billing.phone}</p>
            </section>

            <section>
                <h2>Address Information</h2>
                <p><strong>ID:</strong> {address.id}</p>
                <p><strong>Zip Code:</strong> {address.zipCode}</p>
                <p><strong>City:</strong> {address.city}</p>
                <p><strong>County:</strong> {address.county}</p>
                <p><strong>Address Line:</strong> {address.addressLine}</p>
                <p><strong>Name:</strong> {address.name}</p>

                <h3>User Information</h3>
                <p><strong>User ID:</strong> {address.useriId.id}</p>
                <p><strong>Username:</strong> {address.useriId.username}</p>
                <p><strong>Email:</strong> {address.useriId.email}</p>
                <p><strong>Password:</strong> {address.useriId.password}</p>
                <p><strong>First Name:</strong> {address.useriId.firstname}</p>
                <p><strong>Last Name:</strong> {address.useriId.lastname}</p>
                <p><strong>Date of Birth:</strong> {new Date(address.useriId.dob).toLocaleString()}</p>
                <p><strong>Subscription:</strong> {address.useriId.subscription ? "Active" : "Inactive"}</p>
                <p><strong>Image:</strong> {address.useriId.image || "No image available"}</p>
            </section>
        </div>
    )
}
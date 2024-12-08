import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { Address, createAddress, fetchAddresses } from '../../network/address';
import Button from '../../common/button/Button';
import Input from '../../common/input/Input';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

//TODO Ezt az egészet kb újra kéne írni, sok a GPT elég kaksi.

// Child components
type Billing = {
    firstName: string;
    lastName: string;
    email: string;
}

type Order = {
    billing: Billing;
    address: Address;
}

const UserDetailsForm: React.FC<{ orderData: Order, setOrderData: React.Dispatch<React.SetStateAction<Order>> }> = ({ orderData, setOrderData }) => {
    const { user } = useUser();

    const [billingData, setBillingData] = useState<Billing>({} as Billing);

    const setBillingDataOut = (data: Billing) => {
        setOrderData({
            ...orderData,
            billing: data
        });
        setBillingData(data);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBillingDataOut({
            ...billingData,
            [e.target.name]: e.target.value
        });
    }

    const [isProfileChecked, setIsProfileChecked] = useState(false);

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center pb-3' style={{ height: "5rem" }}>
                <h4 className='mb-0'>Use Profile Details</h4>
                <input
                    type="checkbox"
                    id="useProfile"
                    checked={isProfileChecked}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setIsProfileChecked(e.target.checked); if (user) setBillingDataOut({ firstName: user.firstname, lastName: user.lastname, email: user.email }) }}
                    style={{ width: "1.5rem", height: "1.5rem" }}
                />

            </div>
            <h4 className='mb-5'>Billing Details</h4>
            <div>
                <Input title='First Name' name="firstName" handleChange={handleChange} required disabled={isProfileChecked} defaultValue={isProfileChecked ? user?.firstname : ""} />
                <Input title='Last Name' name="lastName" handleChange={handleChange} required disabled={isProfileChecked} defaultValue={isProfileChecked ? user?.lastname : ""} />
                <Input title='Email Address' name="email" handleChange={handleChange} required pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" disabled={isProfileChecked} defaultValue={isProfileChecked ? user?.email : ""} />

                <Input title='Phone' name="phone" handleChange={handleChange} required />
            </div>
        </div>

    );
};

const AddressSelector: React.FC<{ orderData: Order, setOrderData: React.Dispatch<React.SetStateAction<Order>> }> = ({ orderData, setOrderData }) => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [showNewAddress, setShowNewAddress] = useState(true);
    const [addressData, setAddressData] = useState<Address>({} as Address);

    const setAddressDataOut = (address: Address) => {
        setOrderData({
            ...orderData,
            address: address
        });
        setAddressData(address);
    }

    useEffect(() => {
        const getData = async () => {
            const data = await fetchAddresses();
            setAddresses(data as Address[]);
        };
        getData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressDataOut({
            ...addressData,
            [e.target.name]: e.target.value
        });
    }

    const onSave = async (e: React.MouseEvent<HTMLButtonElement>, addressData: Address) => {
        e.preventDefault();
        if (addresses.find((address) => {
            return address.addressLine === addressData.addressLine && address.city === addressData.city && address.county === addressData.county && address.zipCode == addressData.zipCode
        })) {
            alert("This address is already saved!");
            return;
        }
        if (!addressData.city || !addressData.county || !addressData.addressLine || isNaN(Number(addressData.zipCode)) || !addressData.name) return;
        const response = await createAddress({
            name: addressData.name,
            city: addressData.city,
            county: addressData.county,
            addressLine: addressData.addressLine,
            zipCode: addressData.zipCode
        });
        if (response) {
            const data = await fetchAddresses();
            response.useriId = undefined;
            setAddresses(prevAddresses => [...prevAddresses, response]);
        }
    }

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        if (e.target.value == "-1") {
            setShowNewAddress(true);
            setAddressDataOut({} as Address);
        }
        else {
            setShowNewAddress(false);
            setAddressDataOut(addresses.find((address: Address) => address.id === Number(e.target.value)) as Address);
        }
    }

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center pb-3' style={{ height: "5rem" }}>
                <h4 className='mb-0'>Select an Address</h4>
                <select style={{ padding: "1rem", borderRadius: "2rem", borderColor: "#ccc" }} name="savedAddresses" onChange={onSelectChange} defaultValue={"-1"}>
                    <option key="newaddress" value="-1" >Save a new Address</option>
                    {addresses.map((address: Address) => (
                        <option key={address.id} value={address.id}>{address.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <h4 className='mb-5'>Address Details</h4>
                <Input title='Name' note='(This is used to identify your addresses)' name="name" handleChange={handleChange} required disabled={!showNewAddress} defaultValue={addressData.name} />
                <Input title='City' name="city" handleChange={handleChange} required disabled={!showNewAddress} defaultValue={addressData.city} />
                <Input title='County' name="county" handleChange={handleChange} required disabled={!showNewAddress} defaultValue={addressData.county} />
                <Input title='Address Line' name="addressLine" handleChange={handleChange} required disabled={!showNewAddress} defaultValue={addressData.addressLine} />
                <Input title='Postal Code' name="zipCode" handleChange={handleChange} required disabled={!showNewAddress} defaultValue={addressData.zipCode} pattern="^\d{5}(-\d{4})?$" />

                <Button text="Save Address" buttonStyle="btn-primary" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {

                    onSave(e, addressData)
                }} />
            </div>
        </div >
    );
};

const PaymentPlaceholder: React.FC = () => (
    <div>
        <h4>Payment</h4>
        <p>Barion or SimplePay payment integration goes here...</p>
    </div>
);

// Main Component
const OrderForm: React.FC = () => {

    const [orderData, setOrderData] = useState<Order>({} as Order);
    const { products, setProducts } = useCart();

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(orderData);
        setProducts([]);
        navigate('/ordersuccess', { state: { orderData: orderData } });
    };

    return (
        <form onSubmit={handleSubmit} className='container' style={{ padding: "1rem", paddingTop: "5rem" }}>
            <div className='d-flex flex-wrap'>
                <div className='col-6 p-5'>
                    <UserDetailsForm setOrderData={setOrderData} orderData={orderData} />
                </div>
                <div className="col-6 p-5">
                    <AddressSelector orderData={orderData} setOrderData={setOrderData}
                    />

                </div>
                <div className="col-12">
                    <PaymentPlaceholder />
                </div>
            </div>


            <Button onClick={() => { }} text='Order' buttonStyle='btn-success' />
        </form>
    );
};


export default OrderForm;

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Product = {
    product_type: number,
    quantity: number,
    image: string
}

// Define the context structure
interface CartContextType {
    products: Product[] | null;
    addProduct: (product: Product) => void;
    setProducts: (products: Product[] | null) => void;
}

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>({
    products: null,
    addProduct: (product: Product) => { },
    setProducts: (products: Product[] | null) => { }
});

// Custom hook to use the CartContext
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// Provider component to wrap the app
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[] | null>(null);
    useEffect(() => {
        const localProducts = localStorage.getItem("products");
        if (localProducts) {
            setProducts(JSON.parse(localProducts));
        }
    }, []);

    useEffect(() => {
        if (products) {
            localStorage.setItem("products", JSON.stringify(products));
        }
    }, [products]);
    
    const addProduct = (product: Product) => {

        setProducts((prevProducts) => {
            if (!prevProducts || prevProducts.findIndex((p) => p.image === product.image && p.product_type === product.product_type) === -1) {
                return [...(prevProducts || []), product]
            }
            else {
                const newProducts = [...(prevProducts || [])];
                newProducts.find((p) => p.image === product.image && p.product_type === product.product_type)!.quantity += product.quantity;
                return newProducts;
            }
        });
    }

    return (
        <CartContext.Provider value={{ products, addProduct, setProducts }}>
            {children}
        </CartContext.Provider>
    );
};
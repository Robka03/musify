import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../../product/product';

// Define the context structure
interface CartContextType {
    products: Product[] | null;
    addProduct: (product: Product) => void;
    removeProduct: (product: Product) => void;
    setProducts: (products: Product[] | null) => void;
    deleteProduct: (product: Product) => void;
}

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>({
    products: null,
    addProduct: (product: Product) => { },
    removeProduct: (product: Product) => { },
    setProducts: (products: Product[] | null) => { },
    deleteProduct: (product: Product) => { }
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
            if (!prevProducts || prevProducts.findIndex((p) => p.id === product.id) === -1) {
                return [...(prevProducts || []), product]
            }
            else {
                const newProducts = [...(prevProducts || [])];
                newProducts.find((p) => p.id === product.id)!.quantity += 1;
                return newProducts;
            }
        });
    }

    const removeProduct = (product: Product) => {
        setProducts((prevProducts) => {
            if (!prevProducts || prevProducts.findIndex((p) => p.id === product.id) === -1) {
                return [...(prevProducts || []), product]
            }
            else {
                const newProducts = [...(prevProducts || [])];
                const foundProduct:Product | undefined = newProducts.find((p) => p.id === product.id);
                if (foundProduct && foundProduct.quantity > 1) {
                    foundProduct.quantity -= 1;
                }
                return newProducts;
            }
        });
    }

    const deleteProduct = (product: Product) => {
        setProducts((prevProducts) => {
            if (!prevProducts) {
                return prevProducts;
            }
            const newProducts = [...prevProducts];
            const index = newProducts.findIndex((p) => p.id === product.id);
            if (index !== -1) {
                newProducts.splice(index, 1);
            }
            return newProducts;
        });
    }

    return (
        <CartContext.Provider value={{ products, addProduct, removeProduct, setProducts, deleteProduct }}>
            {children}
        </CartContext.Provider>
    );
};
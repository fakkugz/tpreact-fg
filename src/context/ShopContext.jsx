import { createContext, useState, useEffect } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {

    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        setIsLoading(true);
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setAllProducts(data.products);
                setFilteredProducts(data.products);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        const existingProductIndex = cart.findIndex((item) => item.id === product.id);
        if (existingProductIndex >= 0) {
            const updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity += 1;
            setCart(updatedCart)
        } else {
            setCart([...cart, { ...product, quantity: 1 }])
        }
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
    };

    const increaseQuantity = (productId) => {
        const updatedCart = cart.map(item => 
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
    };

    const decreaseQuantity = (productId) => {
        const updatedCart = cart
            .map(item => {
                if (item.id === productId) {
                    const newQty = item.quantity - 1;
                    return newQty > 0 ? { ...item, quantity: newQty } : null;
                }
                return item;
            })
            .filter(Boolean); // elimina productos con cantidad 0
        setCart(updatedCart);
    };

    return (
        <ShopContext.Provider value={{
            allProducts, setAllProducts,
            filteredProducts, setFilteredProducts,
            isLoading, setIsLoading,
            cart, setCart, addToCart, removeFromCart,
            increaseQuantity, decreaseQuantity
        }}>
            {children}
        </ShopContext.Provider>
    )
}
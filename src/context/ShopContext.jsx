import { createContext, useState, useEffect } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {

    const [allProducts, setAllProducts] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
      });

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => setAllProducts(data.products))
            .catch(err => console.error(err))
    }, [])

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
            setCart([...cart, { ...product, quantity: 1}])
        }
    }

    return (
        <ShopContext.Provider value={{ allProducts,
            isAuthenticated, setIsAuthenticated,
            cart, setCart, addToCart
         }}>
            {children}
        </ShopContext.Provider>
    )
}
import Footer from "./components/Footer"
import Menu from "./components/Menu"
import ProductsList from "./components/ProductsList"
import Login from './pages/Login'
import ProductDetails from "./pages/ProductDetails"
import { ShopProvider } from "./context/ShopContext"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Cart from "./pages/Cart"
import ProtectedRoute from "./components/ProtectedRoute"
import Admin from "./pages/Admin"
import { AuthProvider } from "./context/AuthContext"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';

const App = () => {

  return (
    <BrowserRouter basename="/tpreact-fg">
      <HelmetProvider>
        <AuthProvider>
          <ShopProvider>
            <div className="d-flex flex-column min-vh-100">
              <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
              <Menu />
              <main className="flex-grow-1 d-flex justify-content-center">
                <Routes>
                  <Route path='/' element={<ProductsList category='all' />} />
                  <Route path='/groceries' element={<ProductsList category='groceries' />} />
                  <Route path='/fragrances' element={<ProductsList category='fragrances' />} />
                  <Route path="/search" element={<ProductsList category="search" />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/product/:id' element={<ProductDetails />} />
                  <Route path='/cart' element={<Cart />} />
                  <Route
                    path='/admin'
                    element={
                      <ProtectedRoute>
                        <Admin />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </ShopProvider>
        </AuthProvider>
      </HelmetProvider>
    </BrowserRouter>
  )
}

export default App

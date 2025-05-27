import Footer from "./components/Footer"
import Menu from "./components/Menu"
import ProductsList from "./components/ProductsList"
import Login from './pages/Login'
import ProductDetails from "./pages/ProductDetails"
import { ShopProvider } from "./context/ShopContext"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Cart from "./pages/Cart"

const App = () => {

  return (
    <BrowserRouter>
      <ShopProvider>
        <div className="d-flex flex-column min-vh-100">
          <Menu />
          <main className="flex-grow-1 d-flex justify-content-center">
            <Routes>
              <Route path='/' element={<ProductsList category='all' />} />
              <Route path='/groceries' element={<ProductsList category='groceries' />} />
              <Route path='/fragrances' element={<ProductsList category='fragrances' />} />
              <Route path='/admin' element={<Login />} />
              <Route path='/product/:id' element={<ProductDetails />} />
              <Route path='/cart' element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ShopProvider>
    </BrowserRouter>
  )
}

export default App

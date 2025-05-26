import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Menu = () => {

  const { cart } = useContext(ShopContext);

  return (
    <Navbar expand="lg" className="bg-success text-white" variant='dark'>
      <Container className='d-flex justify-content-between'>
        <Navbar.Brand as={NavLink} to="/">Talento Tech Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 d-flex justify-content-end gap-5 me-5">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/groceries">Groceries</Nav.Link>
            <Nav.Link as={NavLink} to="/fragrances">Fragrances</Nav.Link>
            <Nav.Link as={NavLink} to="/admin">Admin</Nav.Link>
          </Nav>
          <Link to='/cart' className="position-relative text-white">
            <i className="bi bi-cart-fill fs-3"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger mt-2">
              {cart.length}
            </span>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
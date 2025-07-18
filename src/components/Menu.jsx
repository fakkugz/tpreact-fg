import { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Menu = () => {
  const { cart, setFilteredProducts, allProducts } = useContext(ShopContext);
  const { user, logout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setExpanded(false); // cerrar menú
  };

  const handleToggle = (isExpanded) => {
    setExpanded(isExpanded);
  };

  const handleLinkClick = () => {
    setExpanded(false); // cerrar menú cuando clickean un link
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const results = allProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
    navigate('/search');
    setExpanded(false); // cerrar menú al buscar
  };

  return (
    <Navbar
      expanded={expanded}
      onToggle={handleToggle}
      expand="lg"
      sticky="top"
      className="bg-success text-white shadow"
      variant="dark"
      role="navigation"
      aria-label="Primary Navigation"
      style={{ position: 'relative' }}
    >
      <Container fluid className="px-4">
        <Navbar.Brand as={NavLink} to="/" tabIndex={0} aria-label="Go to home page" onClick={handleLinkClick}>
          <img
            src={logo}
            alt="Logo Talento Tech Shop"
            style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}
            className="mx-1"
          />
          Talento Tech Shop
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Toggle navigation menu" />

        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{
            position: expanded ? 'absolute' : 'static',
            top: expanded ? '100%' : 'auto',
            left: 0,
            width: expanded ? '100%' : 'auto',
            backgroundColor: expanded ? '#198754' : 'transparent',
            zIndex: expanded ? 1050 : 'auto',
            borderRadius: expanded ? '0 0 0.25rem 0.25rem' : '0',
          }}
        >
          <div className="d-flex flex-column flex-lg-row justify-content-lg-end align-items-center gap-3 w-100">
            {/* Form Search */}
            <Form
              className="d-flex justify-content-center w-100 w-lg-auto mt-2 mt-lg-0 me-lg-5"
              role="search"
              aria-label="Site-wide product search"
              onSubmit={handleSearchSubmit}
            >
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 w-50"
                aria-label="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-outline-light" aria-label="Submit product search">
                <i className="bi bi-search" aria-hidden="true"></i>
              </button>
            </Form>

            {/* Navigation links */}
            <Nav
              className="d-flex flex-column flex-lg-row align-items-center gap-3 me-lg-1"
              role="menubar"
              aria-label="Primary menu"
            >
              <Nav.Link
                as={NavLink}
                to="/"
                role="menuitem"
                tabIndex={0}
                aria-current={window.location.pathname === '/' ? 'page' : undefined}
                onClick={handleLinkClick}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/groceries"
                role="menuitem"
                tabIndex={0}
                aria-current={window.location.pathname === '/groceries' ? 'page' : undefined}
                onClick={handleLinkClick}
              >
                Groceries
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/fragrances"
                role="menuitem"
                tabIndex={0}
                aria-current={window.location.pathname === '/fragrances' ? 'page' : undefined}
                onClick={handleLinkClick}
              >
                Fragrances
              </Nav.Link>

              {!user ? (
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  className="btn btn-link text-white px-2 border"
                  style={{ minWidth: '70px' }}
                  role="menuitem"
                  tabIndex={0}
                  aria-current={window.location.pathname === '/login' ? 'page' : undefined}
                  onClick={handleLinkClick}
                >
                  Login
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/admin"
                    role="menuitem"
                    tabIndex={0}
                    aria-current={window.location.pathname === '/admin' ? 'page' : undefined}
                    onClick={handleLinkClick}
                  >
                    Admin
                  </Nav.Link>
                  <Nav.Link
                    as="button"
                    onClick={handleLogout}
                    className="btn btn-link text-white px-2 border"
                    style={{ minWidth: '70px' }}
                    role="menuitem"
                    tabIndex={0}
                  >
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>

            {/* Cart icon */}
            <Link
              to="/cart"
              className="position-relative text-white mt-2 mt-lg-0"
              aria-label={`Shopping cart with ${cart.length} items`}
              role="link"
              tabIndex={0}
              onClick={handleLinkClick}
            >
              <i className="bi bi-cart-fill fs-3" aria-hidden="true"></i>
              {cart.length > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger mt-2"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;

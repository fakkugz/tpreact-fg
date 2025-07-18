import { Container, Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import ProductCard from '../components/ProductCard';
import { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import { Helmet } from 'react-helmet-async';

const getPageTitle = (category) => {
  if (category === 'all') return 'All The Products';
  if (category === 'search') return 'Search Results';
  return category[0].toUpperCase() + category.slice(1);
};

const ProductList = ({ category }) => {
  const navigate = useNavigate();
  const { allProducts, filteredProducts, isLoading } = useContext(ShopContext);

  let productsToShow;
  if (category === 'search') {
    productsToShow = filteredProducts;
  } else if (category === 'all') {
    productsToShow = allProducts;
  } else {
    productsToShow = allProducts.filter(p => p.category === category);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsToShow.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(productsToShow.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkTo = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  return (
    <>
      <Helmet>
        <title>{getPageTitle(category)} | Talento Tech Shop</title>
        <meta
          name="description"
          content={
            category === 'all'
              ? 'Browse all available products on Talento Tech Shop.'
              : category === 'search'
              ? 'Search results for your query on Talento Tech Shop.'
              : `Browse products in the ${category} category on Talento Tech Shop.`
          }
        />
      </Helmet>

      <Container fluid className="m-4" as="main" role="main" aria-labelledby="product-list-title">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 id="product-list-title" className="list-title">
            {getPageTitle(category)}
          </h1>
        </div>

        <Row role="region" aria-label="Product grid">
          {isLoading ? (
            <Col
              xs={12}
              className="d-flex flex-column justify-content-center align-items-center"
              role="status"
              aria-live="polite"
            >
              <h3>Loading products...</h3>
              <Spinner animation="border" variant="success" aria-hidden="true" />
            </Col>
          ) : currentProducts.length > 0 ? (
            currentProducts.map(product => (
              <Col
                onClick={() => handleLinkTo(product.id)}
                key={product.id}
                xs={12} sm={6} md={4}
                className="mb-3 d-flex justify-content-center pointer"
                role="button"
                tabIndex={0}
                aria-label={`View details for ${product.title}`}
              >
                <ProductCard
                  id={product.id}
                  img={product.images[0]}
                  title={product.title}
                  subtitle={product.category}
                  description={product.description}
                  price={product.price}
                />
              </Col>
            ))
          ) : (
            <Col
              xs={12}
              className="d-flex flex-column justify-content-center align-items-center"
              role="alert"
              aria-live="polite"
            >
              <h3>No products found.</h3>
            </Col>
          )}
        </Row>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-3" role="navigation" aria-label="Pagination Navigation">
            <Pagination className="custom-pagination">
              <Pagination.First
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                aria-label="Go to first page"
              />
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Go to previous page"
              />
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => handlePageChange(i + 1)}
                  aria-current={i + 1 === currentPage ? "page" : undefined}
                  aria-label={`Go to page ${i + 1}`}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
              />
              <Pagination.Last
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                aria-label="Go to last page"
              />
            </Pagination>
          </div>
        )}
      </Container>
    </>
  );
};

export default ProductList;

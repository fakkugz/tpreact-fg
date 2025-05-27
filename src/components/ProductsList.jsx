import { Container, Row, Col, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import ProductCard from '../components/ProductCard';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ category }) => {

    const navigate = useNavigate();

    const { allProducts, isAuthenticated, setIsAuthenticated } = useContext(ShopContext);

    const filteredProducts = category === 'all' ? allProducts : allProducts.filter(p => p.category === category)

    const handleLinkTo = (id) => {
        navigate(`/product/${id}`)
    };

    return (
        <Container className='my-4'>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="list-title">
                    {
                        category === 'all' ? "All The Products" : `${category[0].toUpperCase() + category.slice(1)}`
                    }
                </h1>
                {isAuthenticated && <Button onClick={()=> setIsAuthenticated(false)} variant="success" className='h-75'>Log Out</Button>}
            </div>
            <Row>
                {filteredProducts.length > 0 ?
                    filteredProducts.map(product => 
                        <Col onClick={() => handleLinkTo(product.id)} key={product.id} xs={2} md={3} lg={4}
                             className='mb-3 d-flex justify-content-center pointer'>
                            <ProductCard
                                id={product.id}
                                img={product.images[0]}
                                title={product.title}
                                subtitle={product.category}
                                description={product.description}
                                price={product.price} />
                        </Col>
                    ) : (
                        <Row>
                            <Col xs={12} className='d-flex flex-column justify-content-center align-items-center'>
                                <h3>Loading products...</h3>
                                <Spinner animation="border" variant="success" />
                            </Col>
                        </Row>
                    )}
            </Row>
        </Container>
)
};

export default ProductList;
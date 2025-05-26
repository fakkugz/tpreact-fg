import { Container, Row, Col, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const ProductList = ({ category }) => {

    const { allProducts, isAuthenticated, setIsAuthenticated } = useContext(ShopContext);

    const filteredProducts = category === 'all' ? allProducts : allProducts.filter(p => p.category === category)

    return (
        <Container className='mt-4'>
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
                        <Col key={product.id} xs={2} md={3} lg={4} className='mb-3 d-flex justify-content-center'>
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
                            <Col xs={12}>
                                No products found
                            </Col>
                        </Row>
                    )}
            </Row>
        </Container>
)
};

export default ProductList;
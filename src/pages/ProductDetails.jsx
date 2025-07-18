import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ProductDetails = () => {
    const { allProducts, addToCart } = useContext(ShopContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const product = allProducts.find(p => p.id === Number(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAddToCart = () => {
        const newProduct = {
            id: product.id,
            img: product.images[0],
            title: product.title,
            price: product.price
        };
        addToCart(newProduct);
    };

    return (
        <>
            <Helmet>
                <title>{product.title} | Talento Tech Shop</title>
                <meta name="description" content={product.description.slice(0, 150)} />
            </Helmet>
            <div className="d-flex flex-column mx-4 align-items-start">
                <Button
                    variant="outline-success"
                    className="ms-4 mt-3 mb-3"
                    onClick={() => navigate(-1)}
                    aria-label="Go back to product list"
                >
                    ← Back to Products
                </Button>
                <Container
                    className='mx-4 mb-5 p-2 border border-success rounded-2'
                    as="main"
                    role="main"
                    aria-labelledby="product-title"
                >
                    <Row className='d-flex p-2 gap-0'>
                        <Col
                            xs={6}
                            className='p-0 d-flex justify-content-center'
                            role="region"
                            aria-label={`Image of ${product.title}`}
                        >
                            <img
                                className='w-75'
                                src={product.images[0]}
                                alt={`Image of ${product.title}`}
                            />
                        </Col>
                        <Col
                            xs={6}
                            className='px-2 d-flex flex-column justify-content-start'
                            role="region"
                            aria-labelledby="product-title"
                        >
                            <h1 id="product-title">{product.title}</h1>
                            <hr />
                            <h2 className='text-center fs-1 mb-3' aria-label={`Price: ${product.price} dollars`}>
                                $ {product.price}
                            </h2>
                            <Stack direction="horizontal" gap={2} className='mb-3'>
                                <Button
                                    className='w-100'
                                    variant="success"
                                    aria-label="Buy product now"
                                >
                                    BUY NOW
                                </Button>
                                <Button
                                    className='w-100'
                                    variant="outline-success"
                                    onClick={handleAddToCart}
                                    aria-label={`Add ${product.title} to cart`}
                                >
                                    ADD TO CART
                                </Button>
                            </Stack>
                            <hr />
                            <p className='px-3' aria-label="Product description">
                                {product.description}
                            </p>
                            <div
                                className='d-flex justify-content-around mt-auto fw-bold'
                                role="contentinfo"
                                aria-label="Additional product information"
                            >
                                <span aria-label={`Rating: ${product.rating}`}>
                                    Rating: {product.rating}
                                </span>
                                <div className="vr" />
                                <span aria-label={`Status: ${product.availabilityStatus}`}>
                                    Status: {product.availabilityStatus}
                                </span>
                                <div className="vr" />
                                <span aria-label={`Shipping: ${product.shippingInformation}`}>
                                    Shipping: {product.shippingInformation}
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default ProductDetails;

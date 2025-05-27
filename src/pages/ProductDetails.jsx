import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {

    const { allProducts, addToCart } = useContext(ShopContext);
    const { id } = useParams();

    const product = allProducts.find(p => p.id === Number(id));

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log(product);
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
        allProducts.length === 0 ?
        <p className="text-center">Cargando producto...</p> :
        <Container className='m-4 p-2 border border-success rounded-2'>
            <Row className='d-flex p-2 gap-0'>
                <Col xs={6} className='p-0 d-flex justify-content-center'>
                    <img className='w-75' src={product.images[0]} alt={product.title} />
                </Col>
                <Col xs={6} className='px-2 d-flex flex-column justify-content-start'>
                    <h1>{product.title}</h1>
                    <hr />
                    <h2 className='text-center fs-1 mb-3'>$ {product.price}</h2>
                    <Stack direction="horizontal" gap={2}>
                            <Button className='w-100' variant="success">BUY NOW</Button>
                            <Button className='w-100' variant="outline-success" onClick={handleAddToCart}>ADD TO CART</Button>
                    </Stack>
                    <hr />
                    <p className='px-3'>{product.description}</p>
                    <div className='d-flex justify-content-around mt-auto fw-bold'>
                        <span>
                            Rating: {product.rating}
                        </span>
                        <div className="vr" />
                        <span>
                            Status: {product.availabilityStatus}
                        </span>
                        <div className="vr" />
                        <span>
                            Shipping: {product.shippingInformation}
                        </span>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductDetails;
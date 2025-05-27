import { useContext } from "react";
import { Container, Row, Col, Button, Card, Stack } from "react-bootstrap";
import { ShopContext } from "../context/ShopContext";

const Cart = () => {

    const { cart, removeFromCart } = useContext(ShopContext);

    return (
        <Container fluid className="cart-container m-4">
            <Row className='px-2'>
                <Col xs={8} className='p-2'>
                    <Container className="list-container border border-success border-1 rounded-3 p-3">
                        <h2>Products in Cart</h2>
                        <hr className="text-success" />
                        {
                            cart.length > 0 ?
                                cart.map(product =>
                                    <Card key={product.id} className='d-flex flex-row align-items-center justify-content-between my-3 px-2 gap-1' style={{ width: 'auto', height: '6rem' }}>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <Button onClick={() => removeFromCart(product.id)} className='p-1 h-50' style={{ width: '2.5rem' }} variant="outline-success">
                                                <i className="bi bi-trash3"></i>
                                            </Button>
                                            <Card.Img style={{ height: '6rem' }} variant='left' src={product.img} />
                                            <Card.Title>{product.title}</Card.Title>
                                        </div>
                                        <Card.Body className='d-flex justify-content-between align-items-center' style={{ maxWidth: '300px' }}>
                                            <div className='d-flex align-items-center'>
                                                <Button className='w-25 py-0 d-flex justify-content-center' variant='outline-success'>
                                                    <i className="bi bi-dash"></i>
                                                </Button>
                                                <Card.Text className='px-2 mb-0 fs-5'>{product.quantity}</Card.Text>
                                                <Button className='w-25 py-0 d-flex justify-content-center' variant='outline-success'>
                                                    <i className="bi bi-plus"></i>
                                                </Button>
                                            </div>
                                            <Card.Text>$ {product.price * product.quantity}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                ) : (
                                    <Card>
                                        <Card.Body>No Products in Cart</Card.Body>
                                    </Card>
                                )
                        }
                        <hr className="text-success" />
                        <h4 className='d-flex justify-content-end'>Subtotal: $1000</h4>
                    </Container>
                </Col>
                <Col className='p-2'>
                    <Container fluid className="cart-summary border border-success border-1 rounded-3 p-3">
                        <h2>Order Summary</h2>
                        <hr className="text-success" />
                        <div className='d-flex justify-content-between fw-bold fs-5'>
                            <p>Products (0)</p>
                            <p>$ 2000</p>
                        </div>
                        <div className='d-flex justify-content-between fw-bold fs-5'>
                            <p>Shipping</p>
                            <p>$ 500</p>
                        </div>
                        <hr className="text-success" />
                        <div className='d-flex justify-content-between mb-4'>
                            <h3>Total:</h3>
                            <h3>$ 2000</h3>
                        </div>
                        <Stack gap={2} className="col-md-5 mx-auto">
                            <Button variant="success">BUY NOW</Button>
                            <Button variant="outline-success">CLEAR CART</Button>
                        </Stack>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
import { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Stack, Modal } from "react-bootstrap";
import { ShopContext } from "../context/ShopContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Cart = () => {
    const { cart, setCart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(ShopContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showBuyModal, setShowBuyModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalProducts = cart.reduce((acc, item) => acc + item.quantity, 0);
    const shipping = 50;
    const total = subtotal + shipping;

    const formatPrice = (price) => `$ ${price.toFixed(2)}`;

    const clearCart = () => setCart([]);

    const handleBuyNow = () => {
        if (!user) {
            setShowLoginModal(true);
            return;
        }

        setShowBuyModal(true);
        clearCart();
    };

    const goToLogin = () => {
        setShowLoginModal(false);
        navigate("/login");
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>Shopping Cart | Talento Tech Shop</title>
                <meta
                    name="description"
                    content="Review the products in your shopping cart and complete your purchase at Talento Tech Shop."
                />
            </Helmet>

            <Container fluid className="cart-container m-4" aria-label="Shopping cart">
                <Row className="px-2 flex-column flex-lg-row">
                    {/* Products in Cart */}
                    <Col xs={12} lg={8} className="order-0 order-lg-0 p-2">
                        <Container className="list-container border border-success border-1 rounded-3 p-3" aria-label="Products in cart list">
                            <h2>Products in Cart</h2>
                            <hr className="text-success" />
                            {cart.length > 0 ? (
                                cart.map(product => (
                                    <Card
                                        key={product.id}
                                        className="cart-item-card d-flex align-items-center justify-content-between my-3 px-2 gap-1"
                                        style={{ width: '100%', height: '6rem' }}
                                        role="listitem"
                                    >
                                        <div className="cart-item-header d-flex align-items-center gap-2" style={{ maxWidth: '60%' }}>
                                            <Button
                                                onClick={() => removeFromCart(product.id)}
                                                className="p-1 h-50"
                                                style={{ width: '2.5rem' }}
                                                variant="outline-success"
                                                aria-label={`Remove ${product.title} from cart`}
                                            >
                                                <i className="bi bi-trash3"></i>
                                            </Button>
                                            <Card.Img
                                                style={{ height: '6rem', width: '6rem', objectFit: 'contain' }}
                                                variant="left"
                                                src={product.img}
                                                alt={product.title}
                                            />
                                            <Card.Title
                                                className="cart-item-title mb-0 text-truncate"
                                                style={{
                                                    maxWidth: '180px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    fontSize: '1rem'
                                                }}
                                            >
                                                {product.title}
                                            </Card.Title>
                                        </div>
                                        <Card.Body className="d-flex justify-content-between align-items-center" style={{ maxWidth: '300px' }}>
                                            <div className="d-flex align-items-center">
                                                <Button
                                                    className="w-25 py-0 d-flex justify-content-center"
                                                    variant="outline-success"
                                                    onClick={() => decreaseQuantity(product.id)}
                                                    aria-label={`Decrease quantity of ${product.title}`}
                                                >
                                                    <i className="bi bi-dash"></i>
                                                </Button>
                                                <Card.Text className="px-2 mb-0 fs-5" aria-live="polite" aria-atomic="true">
                                                    {product.quantity}
                                                </Card.Text>
                                                <Button
                                                    className="w-25 py-0 d-flex justify-content-center"
                                                    variant="outline-success"
                                                    onClick={() => increaseQuantity(product.id)}
                                                    aria-label={`Increase quantity of ${product.title}`}
                                                >
                                                    <i className="bi bi-plus"></i>
                                                </Button>
                                            </div>
                                            <Card.Text className="fs-5">
                                                {formatPrice(product.price * product.quantity)}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <Card>
                                    <Card.Body>No Products in Cart</Card.Body>
                                </Card>
                            )}
                            <hr className="text-success" />
                            <h4 className="d-flex justify-content-end me-3" aria-label="Subtotal">
                                Subtotal: {formatPrice(subtotal)}
                            </h4>
                        </Container>
                    </Col>

                    {/* Order Summary */}
                    <Col xs={12} lg={4} className="order-1 order-lg-1 p-2">
                        <Container
                            className="cart-summary border border-success border-1 rounded-3 p-3"
                            aria-label="Order summary"
                        >
                            <h2 className="fs-3">Order Summary</h2>
                            <hr className="text-success" />
                            <div className="d-flex justify-content-between fw-bold fs-5">
                                <p>Products ({totalProducts})</p>
                                <p>{formatPrice(subtotal)}</p>
                            </div>
                            <div className="d-flex justify-content-between fw-bold fs-5">
                                <p>Shipping</p>
                                <p>{formatPrice(shipping)}</p>
                            </div>
                            <hr className="text-success" />
                            <div className="d-flex justify-content-between mb-4">
                                <h3>Total:</h3>
                                <h3>{formatPrice(total)}</h3>
                            </div>
                            <Stack gap={2} className="col-md-5 mx-auto d-flex align-items-center">
                                <Button
                                    variant="success"
                                    onClick={handleBuyNow}
                                    aria-label="Buy now"
                                    style={{ width: '120px', height: '40px' }}
                                >
                                    BUY NOW
                                </Button>
                                <Button
                                    variant="outline-success"
                                    onClick={clearCart}
                                    aria-label="Clear cart"
                                    style={{ width: '120px', height: '40px' }}
                                >
                                    CLEAR CART
                                </Button>
                            </Stack>
                        </Container>
                    </Col>
                </Row>
            </Container>

            {/* Modal confirmación compra */}
            <Modal show={showBuyModal} onHide={() => setShowBuyModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Purchase Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your order has been placed. Thank you!</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => setShowBuyModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>You must be logged in to complete your purchase.</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => setShowLoginModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={goToLogin}>
                        Go to Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Cart;

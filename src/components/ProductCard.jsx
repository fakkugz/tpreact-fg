import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { useContext } from 'react';

const ProductCard = ({ id, img, title, subtitle, description, price }) => {

    const { isAuthenticated, addToCart, loading } = useContext(ShopContext)

    const handleAddToCart = (e) => {
        e.stopPropagation();
        const newProduct = { id, img, title, price };
        addToCart(newProduct);
    };

    return (
        <Card border='success' style={{ width: '18rem', boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.2)' }}>
            {loading ? (
                <Spinner animation="border" variant="success" />
            ) : (
                <>
                    <Card.Img variant="top" src={img} />

                    {isAuthenticated &&
                        <div className="d-flex justify-content-center gap-4 fs-4">
                            <Link to="/" title="Agregar">
                                <i className="bi bi-plus-circle text-success"></i>
                            </Link>
                            <Link to="/" title="Editar">
                                <i className="bi bi-pencil-square text-primary"></i>
                            </Link>
                            <Link to="/" title="Eliminar">
                                <i className="bi bi-trash3 text-danger"></i>
                            </Link>
                        </div>
                    }
                    <Card.Body className='d-flex flex-column justify-content-between'>
                        <Card.Title>{title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Category: {subtitle[0].toUpperCase() + subtitle.slice(1)} </Card.Subtitle>
                        <Card.Text style={{
                                display: '-webkit-box',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2
                            }}>
                            {description}
                        </Card.Text>
                        <Card.Text className='fw-bold fs-3 text-center'>$ {price}</Card.Text>
                        <Button onClick={handleAddToCart} variant="success">Add to Cart</Button>
                    </Card.Body>
                </>
            )}
        </Card>
    );
}

export default ProductCard;
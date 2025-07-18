import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const ProductCard = ({ id, img, title, subtitle, description, price }) => {
    const { isAuthenticated, addToCart, isLoading } = useContext(ShopContext);

    const [imageLoaded, setImageLoaded] = useState(false);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        const newProduct = { id, img, title, price };
        addToCart(newProduct);
        toast.success(`${title} added to cart successfully!`);
    };

    return (
        <Card
            border='success'
            style={{ width: '18rem', boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.2)' }}
            role="region"
            aria-label={`Product card for ${title}`}
            tabIndex={0}
            onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAddToCart(e);
                }
            }}
        >
            {isLoading ? (
                <div
                    style={{ width: 286, height: 286, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    role="status"
                    aria-live="polite"
                >
                    <Spinner animation="border" variant="success" aria-hidden="true" />
                </div>
            ) : (
                <>
                    <div
                        style={{
                            width: '100%',           
                            maxWidth: '286px',         
                            aspectRatio: '1 / 1',  
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {!imageLoaded && (
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#f0f0f0',
                                }}
                            >
                                <Spinner animation="border" variant="success" />
                            </div>
                        )}
                        <img
                            src={img}
                            onLoad={() => setImageLoaded(true)}
                            alt={title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: imageLoaded ? 'block' : 'none',
                            }}
                        />
                    </div>

                    {isAuthenticated && (
                        <div className="d-flex justify-content-center gap-4 fs-4" role="group" aria-label={`Admin actions for ${title}`}>
                            <Link to="/" title="Agregar" aria-label={`Add new product`}>
                                <i className="bi bi-plus-circle text-success" tabIndex={-1}></i>
                            </Link>
                            <Link to="/" title="Editar" aria-label={`Edit product ${title}`}>
                                <i className="bi bi-pencil-square text-primary" tabIndex={-1}></i>
                            </Link>
                            <Link to="/" title="Eliminar" aria-label={`Delete product ${title}`}>
                                <i className="bi bi-trash3 text-danger" tabIndex={-1}></i>
                            </Link>
                        </div>
                    )}
                    <Card.Body className='d-flex flex-column justify-content-between'>
                        <Card.Title id={`product-title-${id}`}>{title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted" aria-label={`Category: ${subtitle[0].toUpperCase() + subtitle.slice(1)}`}>
                            Category: {subtitle[0].toUpperCase() + subtitle.slice(1)}
                        </Card.Subtitle>
                        <Card.Text
                            style={{
                                display: '-webkit-box',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2
                            }}
                            aria-label={`Description: ${description}`}
                        >
                            {description}
                        </Card.Text>
                        <Card.Text
                            className='fw-bold fs-3 text-center'
                            aria-label={`Price: $${price.toFixed(2)}`}
                        >
                            $ {price.toFixed(2)}
                        </Card.Text>
                        <Button
                            onClick={handleAddToCart}
                            variant="success"
                            aria-label={`Add ${title} to cart`}
                        >
                            Add to Cart
                        </Button>
                    </Card.Body>
                </>
            )}
        </Card>
    );
}

export default ProductCard;

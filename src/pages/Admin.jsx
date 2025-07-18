import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const Admin = () => {
    const { allProducts, setAllProducts, isLoading } = useContext(ShopContext);

    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);


    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setFormData({
            title: product.title,
            description: product.description,
            price: product.price,
            stock: product.stock,
            image: product.images[0],
        });
        setErrors({});
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedProduct(null);
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" || name === "stock" ? Number(value) : value,
        }));
    };

    const validate = () => {
        const newErrors = {};
        const { title, description, price, stock, image } = formData;

        if (!title || title.length < 3 || title.length > 100) {
            newErrors.title = "Title is required (3-100 characters)";
        }
        if (!description || description.length < 10 || description.length > 300) {
            newErrors.description = "Description must be 10–300 characters";
        }
        if (!image) {
            newErrors.image = "Image URL is required";
        }
        if (isNaN(price) || price < 0) {
            newErrors.price = "Price must be a number >= 0";
        }
        if (isNaN(stock) || stock < 0) {
            newErrors.stock = "Stock must be a number >= 0";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddProductClick = () => {
        setSelectedProduct(null);
        setFormData({
            title: '',
            description: '',
            price: '',
            stock: '',
            image: '',
        });
        setErrors({});
        setShowModal(true);
    };

    const handleConfirm = () => {
        if (!validate()) return;

        const isEditing = !!selectedProduct;
        const isFake = isEditing && selectedProduct.id > 100;

        const enrichedProduct = {
            ...(selectedProduct || {}),
            ...formData,
            id: selectedProduct?.id || Date.now(),
            images: [formData.image],
        };

        // producto nuevo o simulado => actualizo solo local
        if (!isEditing || isFake) {
            try {
                if (!isEditing) {
                    setAllProducts(prev => [enrichedProduct, ...prev]);
                    toast.success("Product added successfully");
                } else {
                    setAllProducts(prev =>
                        prev.map(p => (p.id === enrichedProduct.id ? enrichedProduct : p))
                    );
                    toast.success("Product updated successfully");
                }
                handleClose();
            } catch {
                toast.error("Failed to save product");
            }
            return;
        }

        // producto real => PUT a la API
        const url = `https://dummyjson.com/products/${selectedProduct.id}`;

        fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then((product) => {
                console.log("Producto actualizado (API)", product);

                const enriched = {
                    ...product,
                    images: [formData.image],
                };

                setAllProducts(prev =>
                    prev.map(p => (p.id === product.id ? enriched : p))
                );
                toast.success("Product updated successfully");
                handleClose();
            })
            .catch(err => console.error("Error al guardar:", err));
        toast.error("Failed to update product");
    };


    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        const isFake = productToDelete.id > 100;

        if (isFake) {
            // elimina localmente
            setAllProducts(prev => prev.filter(p => p.id !== productToDelete.id));
            toast.success("Product deleted successfully");
            setShowDeleteModal(false);
            setProductToDelete(null);
            return;
        }

        // Producto real: llamar a la API para eliminar
        fetch(`https://dummyjson.com/products/${productToDelete.id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (!res.ok) throw new Error('Delete failed');
                return res.json();
            })
            .then(deleted => {
                console.log("Producto eliminado:", deleted);
                setAllProducts(prev => prev.filter(p => p.id !== productToDelete.id));
                toast.success("Product deleted successfully");
                setShowDeleteModal(false);
                setProductToDelete(null);
            })
            .catch(err => {
                console.error("Delete error:", err);
                toast.error("Failed to delete product");
            });
    };

    return (
        <>
            <Helmet>
                <title>Admin Panel | Talento Tech Shop</title>
                <meta
                    name="description"
                    content="Manage products on Talento Tech Shop. Add, edit, or delete products easily."
                />
            </Helmet>
            <Container className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Button
                        variant="success"
                        className="text-white d-flex align-items-center gap-1 py-0 px-2"
                        onClick={handleAddProductClick}
                    >
                        <i className="bi bi-plus-lg fs-4"></i> Add Product
                    </Button>
                    <h2 className="text-center flex-grow-1">Product Administration</h2>
                    <div style={{ width: '96px' }} />
                </div>
                <Table striped bordered hover responsive className="align-middle">
                    <thead className="table-success">
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th className='text-center'>Price ($)</th>
                            <th className='text-center'>Stock</th>
                            <th className='text-center'>Image</th>
                            <th className='text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="6" className="text-center" style={{ height: '60px' }}>
                                    Loading products...
                                </td>
                            </tr>
                        ) : allProducts.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center" style={{ height: '60px' }}>
                                    No products found.
                                </td>
                            </tr>
                        ) : (
                            allProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.title}</td>
                                    <td className="text-truncate description-cell">{product.description}</td>
                                    <td className='text-center'>{product.price}</td>
                                    <td className='text-center'>{product.stock}</td>
                                    <td className='text-center' style={{ height: '60px', width: '60px' }}>
                                        <img
                                            src={product.images[0]}
                                            alt={product.title}
                                            thumbnail
                                            style={{ maxWidth: '60px', maxHeight: '60px', objectFit: 'cover' }}
                                        />
                                    </td>
                                    <td className='text-center'>
                                        <Button
                                            variant="outline-primary"
                                            size="sm" className="me-2"
                                            onClick={() => handleEditClick(product)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDeleteClick(product)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>

                {/* Modal */}
                <Modal show={showModal} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formTitle">
                                <Form.Label className="fw-bold">Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={formData.title || ''}
                                    onChange={handleChange}
                                    isInvalid={!!errors.title}
                                    className="border-success focus-success"
                                />
                                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label className="fw-bold">Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={formData.description || ''}
                                    onChange={handleChange}
                                    isInvalid={!!errors.description}
                                    style={{ resize: 'none', overflow: 'hidden', minHeight: '80px' }}
                                    rows={1}
                                    className="border-success focus-success"
                                    onInput={(e) => {
                                        e.target.style.height = 'auto';
                                        e.target.style.height = e.target.scrollHeight + 'px';
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                            </Form.Group>

                            <div className="d-flex gap-3 mb-3">
                                <Form.Group className="w-50" controlId="formPrice">
                                    <Form.Label className="fw-bold">Price ($)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="price"
                                        value={formData.price || ''}
                                        onChange={handleChange}
                                        isInvalid={!!errors.price}
                                        inputMode="decimal"
                                        pattern="[0-9]*"
                                        className="border-success focus-success"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="w-50" controlId="formStock">
                                    <Form.Label className="fw-bold">Stock</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="stock"
                                        value={formData.stock || ''}
                                        onChange={handleChange}
                                        isInvalid={!!errors.stock}
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        className="border-success focus-success"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
                                </Form.Group>
                            </div>

                            <Form.Group className="mb-3" controlId="formImage">
                                <Form.Label className="fw-bold">Image (URL)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="image"
                                    value={formData.image || ''}
                                    onChange={handleChange}
                                    isInvalid={!!errors.image}
                                    className="border-success focus-success"
                                />
                                <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="success" onClick={handleConfirm}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete <strong>{productToDelete?.title}</strong>?
                        This action cannot be undone.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDeleteConfirm}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </>
    );
};

export default Admin;

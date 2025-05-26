import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Login = () => {

    const { setIsAuthenticated } = useContext(ShopContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsAuthenticated(true)
        navigate('/')
    }

    return (
        <Container fluid className='p-3 d-flex justify-content-center align-items-center w-100'>
            <Container className='bg-success w-25 p-3 rounded-2 text-white'>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value='talentotech@gmail.com' />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value='123456'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="light" type="submit">
                    Submit
                </Button>
                </Form>
            </Container>
        </Container>
    );
}

export default Login;
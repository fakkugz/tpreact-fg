import { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';


const Login = () => {
    const [usuario, setUsuario] = useState('talentotech@gmail.com');
    const [password, setPassword] = useState('123456');
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (usuario === 'talentotech@gmail.com' && password === '123456') {
            login(usuario);
            navigate('/');
        } else {
            alert('Credenciales incorrectas');
        }
    };

    return (
        <>
            <Helmet>
                <title>Login | Talento Tech Shop</title>
                <meta
                    name="description"
                    content="Log in to your Talento Tech Shop account to access exclusive deals and manage your preferences."
                />
            </Helmet>

            <Container
                fluid
                className='p-3 d-flex justify-content-center align-items-center w-100'
                role="main"
                aria-labelledby="login-title"
            >
                <Container
                    className='bg-success w-25 p-3 rounded-2 text-white'
                    role="form"
                    aria-describedby="login-description"
                    style={{
                        minWidth: '320px',
                        maxWidth: '400px',
                        width: '100%'
                    }}
                >
                    <h1 id="login-title" className="visually-hidden">Login</h1>
                    <p id="login-description" className="visually-hidden">
                        Please enter your email and password to log in.
                    </p>
                    <Form onSubmit={handleSubmit} aria-label="Login form">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                required
                                aria-required="true"
                                aria-label="Email address"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                aria-required="true"
                                aria-label="Password"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                label="Remember me"
                                aria-label="Remember me"
                            />
                        </Form.Group>

                        <Button variant="light" type="submit" aria-label="Submit login">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </Container>
        </>
    );
};

export default Login;

import { Container, Col, Row } from "react-bootstrap";

const Footer = () => {
    return (
        <Container fluid className="mt-3 p-3 bg-success text-white">
            <Row className="justify-content-between align-items-center">
                <Col md={6} className="d-flex align-items-center flex-column">
                    <p className="mb-1">TP React JS - Talento Tech</p>
                    <p className="mb-2">Desarrollado por Facundo González</p>
                </Col>
                <Col md={6} className="d-flex justify-content-center gap-3">
                    <i className="bi bi-facebook fs-4"></i>
                    <i className="bi bi-twitter-x fs-4"></i>
                    <i className="bi bi-instagram fs-4"></i>
                    <i className="bi bi-whatsapp fs-4"></i>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer;
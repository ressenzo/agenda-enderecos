import { Container, Nav, Navbar } from 'react-bootstrap';
import './Menu.css';

function Menu() {
    return (
        <Navbar className="menu" expand="md" bg="light">
            <Container fluid>
                <Navbar.Brand href="/">Endereços</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Início</Nav.Link>
                        <Nav.Link href="/salvos">Endereços salvos</Nav.Link>
                        <Nav.Link href="/favoritos">Favoritos</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;

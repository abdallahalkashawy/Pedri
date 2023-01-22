import React from 'react'
import { Navbar, Container, Row, Nav} from 'react-bootstrap'
const NavBar = () => {

    return (
        <Row>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>                
                    <Navbar.Toggle aria-controls="navbarScroll" />
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                        </Nav>
                        
                </Container>
            </Navbar>
        </Row>
    )
}
export default NavBar
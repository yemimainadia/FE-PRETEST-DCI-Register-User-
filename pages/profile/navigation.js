import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import Router from "next/router";

const Navigation = () => {
    const handleSelect = (selectedKey) => {
        if(selectedKey === "999") {
            localStorage.removeItem('access_token');
            Router.replace("/private", "/", { shallow: true });
        }
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>FE PRETEST DCI (Register User)</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">                
                <Nav onSelect={handleSelect}>
                    <Nav.Link href="/profile">Account</Nav.Link>
                    <Nav.Link eventKey="999">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;

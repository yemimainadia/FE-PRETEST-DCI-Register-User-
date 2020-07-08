import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./components/login";
import Register from "./components/register";

export default function Home() {
    const pageConfig = {
        title: "Home",
    };
    return (
        <div className="container">
            <Header pageConfig={pageConfig} />
            <main>
                <Container>
                    <Row>
                        <Col bsPrefix="col registration-container">
                            <Register />
                        </Col>
                        <Col bsPrefix="col login-container">
                            <Login />                            
                        </Col>
                    </Row>
                </Container>
            </main>
            <Footer />
        </div>
    );
}

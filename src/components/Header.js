import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="#features">Cargo Owner</Nav.Link>
                <Nav.Link href="#features">Ship Owner</Nav.Link>
                <Nav.Link href="#features">FAQ</Nav.Link>
                <Nav.Link href="#features">Contact Us</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="#features">
                    <Button variant="success">Sign Up</Button>
                </Nav.Link>
                <Nav.Link href="#features">
                    <Button variant="outline-success">Sign In</Button>
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
    );
  }
  return null;
};

const LoggedInView = props => {
    const username = "Toshiki Jahja";
    // const image = "transporter.png";
    const image = "customer.png";
  if (props.currentUser) {
    return (
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="#features">Ship</Nav.Link>
                <Nav.Link href="#features">Shipment</Nav.Link>
                <Nav.Link href="#features">Cargo</Nav.Link>
            </Nav>
            <Nav>
                <Link
                    to={`/@${username}`}
                    className="nav-link">
                    <img src={image} className="user-pic" alt={username} />
                    {username}
                </Link>
            </Nav>
        </Navbar.Collapse>
    );
  }

  return null;
};

class Header extends React.Component {
  render() {
    return (
        <Navbar collapseOnSelect expand="lg" sticky="top" style={{paddingLeft: "10%", paddingRight: "10%", backgroundColor: "white", borderBottom: "thin solid grey"}}>
            <Navbar.Brand href="#home" className="pull-left">{this.props.appName}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <LoggedOutView currentUser={this.props.currentUser} />
                <LoggedInView currentUser={this.props.currentUser} />
            </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default Header;

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './nav.css'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
function NavScrollExample() {
  return (
    <Navbar expand="lg" style={{background:"rgb(230, 170, 20)"}}>
      <Container fluid>
        <Navbar.Brand href="#"  style={{color:'black',marginLeft:"7%",cursor:'pointer'}}><h2>
        PITIKLINI</h2></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '120px' }}
            navbarScroll
          >
            <Nav.Link href="#about" style={{color:'black',cursor:'pointer'}} >About Us</Nav.Link>
            <Nav.Link href="#contact" style={{color:'black',cursor:'pointer'}} >Contact Us</Nav.Link>
            
          </Nav>
            <Button  style={{background:"black" , color:"white" , width:"10%" , margin:"1%" , borderRadius: "25px" , cursor:"pointer"}}><Link  to="/login" style={{color:"white" , textDecoration:"none"}}>Login</Link></Button>
            <Button style={{background:"white" , color:"black" , width:"10%" , margin:"1%" , borderRadius: "25px" , cursor:"pointer"}}><Link  to="/signup" style={{color:"black" , textDecoration:"none"}}>SignUp</Link></Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import './C.css'
import { useNavigate } from 'react-router-dom';
function NavScrollExample() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('profileImage');
    navigate('/login');
  };
  return (
    <Navbar expand="lg" className="bg-white v">
      <Container fluid>
        <Navbar.Brand style={{color:"rgb(230, 170, 20)" , fontSize:"xx-large"}}>Pitiklini</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            
            
          </Nav>
          <FaUserCircle style={{width:"3%"}}/>
          <NavDropdown title="Profile" id="navbarScrollingDropdown" style={{marginRight:"12%"}}>
              <NavDropdown.Item href="#action4">
                <Link to="/collaborator/settingC" style={{textDecoration:'none',color:'black'}}>
                Settings
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;

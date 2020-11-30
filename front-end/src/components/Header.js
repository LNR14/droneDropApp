import React ,{useState,useEffect} from 'react'
import {Navbar,Container, Button} from 'react-bootstrap'
function Header({history}) {
    const [isLoggedIn,setIsLoggedIn] =useState(false)
    const user = localStorage.getItem('user')


    const logoutHandler = () => {
        localStorage.removeItem('user')

    }
    useEffect(() => {
        setIsLoggedIn(!!user)
      }, []);
    
    return (
        <div>
            <Navbar className="navbar" bg="light" expand="lg">
            <Container>
            <Navbar.Brand href="/">Drone Drop project</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Navbar.Collapse className="justify-content-end">
                    {isLoggedIn?(
                        <Navbar.Text>
                            <Button variant="outline-dark" onClick={logoutHandler} href="/login">Logout</Button>
                        </Navbar.Text>
                    ):(
                        <Navbar.Text>
                            <Button variant="outline-dark" href="/login">Login</Button>
                        </Navbar.Text>
                    )}
                </Navbar.Collapse>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    )
}

export default Header

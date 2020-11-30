import React,{useEffect, useState} from 'react'
import {Container,Col,Form,Button,Row,Alert} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import api from '../services/api'
import './form.css'

function LoginForm({history}) {

    
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(false)
    const [errorMessage,setErrorMessage] = useState(false)
    

    useEffect(()=>{
        const user = localStorage.getItem('user')
        if(user){
            history.push('/')
        }
    },[])
    
    const handleSubmit = async (evt)=> {
        evt.preventDefault()
        const response = await api.post('/login',{email,password})
        const user_id = response.data._id || false

        if(user_id){
            localStorage.setItem('user',user_id)
            history.push('/')
        }
        else{
            const {message} = response.data
            setError(true)
            setErrorMessage(message)
            setTimeout(()=>{
                setError(false)
                setErrorMessage('')
            },2000)
        }

    }
        
    return (
        <div>
            <Container>
            <Col lg={4} md={6} sm={12}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email"  onChange={evt =>setEmail(evt.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Password" onChange={evt => setPassword(evt.target.value)}/>
                    </Form.Group>
                    <Row>
                        <Col>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    
                        </Col>
                        <Col>
                            <Form.Text className="text-muted"> Register instead </Form.Text>

                            <Link to="/register"><Button>Register </Button></Link>  
                        </Col>

                    </Row>

                </Form>
                {error ?(
                        <Alert variant="danger">{errorMessage}</Alert>

                ):("")
                }
            </Col>
            </Container>
        </div>
    )
}

export default LoginForm
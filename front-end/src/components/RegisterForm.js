import React ,{useState,useEffect} from 'react'
import {Form,Button,Container,Col,Row,Alert} from 'react-bootstrap'
import {states1} from '../data/states'
import {Redirect} from 'react-router-dom'
import api from '../services/api'
import './form.css'

function RegisterForm({history,props}) {

    const [firstName,setFirstName] = useState("")
    const [lastName,setlastName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [street1,setStreet1] = useState("")
    const [street2,setStreet2] = useState("")
    const [city,setCity]=useState("")
    const [zipcode,setZipCode] = useState("")
    const [statecode,setstatecode] = useState("AL")
    const [register,setRegister] = useState(false)
    const [disabled,setDisabled] = useState(false)    
    const [confirmed,setConfirmed] = useState(false)


    const [error,setError] = useState(false)
    const [isAddressValid,setIsAddressValid] = useState(false)
    const [errorMessage,setErrorMessage] = useState(false)
    const [lat,setLat] = useState(0)
    const [long,setLong] = useState(0)
    const [address,setAddress]=useState('')

    useEffect(()=>{
        const user = localStorage.getItem('user')
        if(user){
            history.push('/')
        }
    },[])


    const registerHandler = async(e) =>{
        e.preventDefault()
        setDisabled(true)
        setRegister(true)
        e.preventDefault()
        setAddress(street1.concat(" ",street2," ",city))
        var url_street1 = "street="+street1+"&"
        url_street1 = url_street1.replaceAll(" ", "+")
        var url_street2 = "street2="+street2+"&"
        url_street2 = url_street2.replaceAll(" ", "+")
        var url_city = "city="+city+"&"
        url_city = url_city.replaceAll(" ", "+")
        var url_state = "state="+statecode+"&"
        var url_zipcode = "zipcode="+zipcode+"&"
        url_zipcode = url_zipcode.replaceAll(" ", "+")
        const key=`key=${process.env.REACT_APP_KEY}`
        const url = "https://us-street.api.smartystreets.com/street-address?" 
        const res = url.concat(url_street1,url_street2,url_city,url_state,url_zipcode,key) 
        let results = await fetch(res)
        let data = await results.json()
        if(data &&
            data.length >0 &&
            data[0].components.city_name.toLowerCase() ===city &&
            data[0].components?.state_abbreviation ===statecode &&
            data[0].components?.zipcode ===zipcode){
                setLat(data[0].metadata.latitude)
                setLong(data[0].metadata.longitude)
                setIsAddressValid(true)
        }
    } 
    
    const editHandler = async(e) =>{

        e.preventDefault()
        setDisabled(false)
        setRegister(false)
    }
    const confirmHandler = async (e) =>{
        if(isAddressValid){
            addAddressToDB()
        }
        else{
            const message = "address is invalid and re-enter your details"
            setError(true)
                setErrorMessage(message)
                setDisabled(false)
                setRegister(false)
                setTimeout(()=>{
                    setError(false)
                    setErrorMessage('')
                },2000)
            }
    
    }


    const addAddressToDB  = async() => {
            const response = await api.post('/register',{email,password,firstName,lastName,address,zipcode,statecode,lat,long})
            const userId = response.data._id || false;
            if (userId) {
                localStorage.setItem('user',userId)
                setConfirmed(true)
            } else {
                const { message }= response.data
                setError(true)
                setDisabled(false)
                setRegister(false)
                setErrorMessage(message)
                setTimeout(()=>{
                    setError(false)
                    setErrorMessage('')
                    
                },2000)
            }

    }


    if(confirmed){
        return(
            <Redirect to ="/" />
        )
    }
    else
    {

    return (
        <div>
            
            <Container>
            <Col lg={4} md={6} sm={12}>
            <Form  onSubmit={registerHandler}>
                <Form.Label>Login Information ** All fields Required</Form.Label>
                <Form.Group controlId="validationCustom01" >
                    <Form.Control required disabled={disabled}  type="text" placeholder="First Name:John" 
                    onChange ={(e) => setFirstName(e.target.value)}/>
                </Form.Group>
                <Form.Group >
                    <Form.Control required disabled={disabled} type="text" placeholder="Last Name:Doe" onChange ={(e) => setlastName(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control required disabled={disabled}  type="email" placeholder="Enter email" onChange ={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control required disabled={disabled}  type="password" placeholder="Password" onChange ={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Label>Address ** All fields Required</Form.Label>
                <Form.Group>
                    <Form.Control required disabled={disabled} type="text"  placeholder="Street address or P.O box" onChange ={(e) => setStreet1(e.target.value)}/>
                </Form.Group>
                <Form.Group >
                    <Form.Control  type="text" disabled={disabled} placeholder="App, suite, unit, building, floor ,etc" onChange ={(e) => setStreet2(e.target.value)}/>
                </Form.Group>
                <Form.Group >
                    <Form.Control required disabled={disabled} type="text" placeholder="city" onChange ={(e) => setCity(e.target.value)}/>
                </Form.Group>
                <Form.Group  controlId="formGridState">
                    <Form.Control as="select" disabled={disabled} required placeholder="state" defaultValue="Alabama" onChange={(e) => setstatecode(e.target.value)}>
                        {states1.map((state)=>(
                            <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
                        ))}
                </Form.Control>
                </Form.Group>
                <Form.Group controlId="formGridZip">
                        <Form.Control disabled={disabled} required placeholder="zipcode" onChange={(e) => setZipCode(e.target.value)}/>
                </Form.Group>
                {register?(
                <Row>
                    <Col>
                        <Button variant="primary" type="submit" className="confirm-button" onClick={confirmHandler} >Confirm</Button>
                    </Col>
                    <Col>
                        <Button variant="primary"onClick = {editHandler}>Edit</Button>
                    </Col>
                </Row>
                ):(
                <Button variant="primary" type="submit">Register</Button>
                )}

            </Form>
            </Col>
            {error ?(
                        <Alert variant="danger">{errorMessage}</Alert>

                ):("")
                }
            </Container>
        </div>
    )
}
}
export default RegisterForm

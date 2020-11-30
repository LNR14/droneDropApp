import React ,{useState,useEffect} from 'react'
import {Table,Container,Col, Button} from 'react-bootstrap'
import api from '../services/api'
import Map1 from './Map1'
import './dashboard.css'

function Dashboard({history}) {
    const [users,setUsers] = useState([])
    const [lat,setLat] = useState('')
    const [long,setLong] = useState('')
    
    var count = 0

    useEffect(()=>{
        const userLoggedIn = localStorage.getItem('user')
        if(userLoggedIn){
            getUsers(userLoggedIn)
        }
        else{
            history.push('/login')
        }

    },[])

    const getUsers = async (userLoggedIn)=>{
        try{
        const response = await api.get('/')
        setUsers(response.data.users)
        response.data.users.map(user => {
            if(userLoggedIn === user._id){
                setLat(user.lat)
                setLong(user.long)
            }
        })
        }catch(err){
            console.log(err)
        }

    }

    return (
        <div>
            <Container >
            <Map1 coordinates={[lat,long]}/>
                <div className='table'>
                <Col lg={5} md={6} sm={12} >
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user =>(
                            <tr key={user._id}>
                                <td>{count=count+1}</td>
                                <td>{`${user.firstName} ${user.lastName}`}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </Table>
                </Col>

                </div>

            </Container>
        </div>
    )
}

export default Dashboard

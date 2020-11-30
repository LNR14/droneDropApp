import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Register from './components/RegisterForm'
import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm'

export default function Routes(){
    return(

        <Router>
            <Switch>
                <Route path = "/" exact component ={Dashboard} />
                <Route path ="/login" exact component={LoginForm} />
                <Route path = "/register" exact component ={Register} />
                
            </Switch>
        </Router>

    )
}
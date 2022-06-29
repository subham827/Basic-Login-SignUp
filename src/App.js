import React from 'react'
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => {
  return(
    <>
    <BrowserRouter>
    
    <Route path="/login" component={Login}/>
    
    <Route exact path="/" component={Register}/>
    <Route path='/dashboard' component={Dashboard}></Route>
    
    </BrowserRouter>
    </>
  )
}
export default App;
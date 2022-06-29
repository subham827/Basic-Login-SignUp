import {useState} from 'react';
import {useHistory} from 'react-router-dom';



function Register() {
  const history = useHistory();
  const[name,setName] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  async function registerUser(e){
    e.preventDefault();
  const response = await  fetch('http://localhost:5000/api/register',{
    method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({

        name,
        email,
        password
      }),
    })
    const data = await response.json();
    if(data.status === 'ok'){
      alert('User registered successfully');
       history.push('/login'); 
    }
    else{
      alert(data.error);
    }
   
  }
  
  return (
    
    <div className="App">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        <br></br>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <br></br>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <br></br>
        <input type= "submit" value="Register"></input>
      </form>

    </div>
  );
}

export default Register;

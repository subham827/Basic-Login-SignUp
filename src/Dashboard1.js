import React, { useEffect,useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useJwt } from 'react-jwt';





const Dashboard = ()=>{

    const history = useHistory();
    const [quote,setQuote] = useState('');
    const[tempquote,setTempQuote] = useState('');
    async function populateQuote(){
        const data = await fetch('http://localhost:5000/api/quote',{
            headers:{
                'x-access-token':localStorage.getItem('token')
            }
        });
        const datas = await data.json();
        if (datas.status === 'ok') {
            setQuote(datas.quote);
            
        } else {
            alert(datas.error)
        }

    }
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(atob(token.split('.')[1]));
            if(!user){
                localStorage.removeItem('token');
                history.replace('/login');
            }
            else{
                populateQuote()
            }
        }
    },[])
    async function updateQuote(e){
        e.preventDefault();
        const data = await fetch('http://localhost:5000/api/quote',{
            method:'POST',
            headers:{
                'x-access-token':localStorage.getItem('token'),
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                quote:tempquote,
            }),
        });
        const datas = await data.json();
        if (datas.status === 'ok') {
            setQuote(tempquote);
            setTempQuote('');
            
        }
        else{
            alert(datas.error)
        }


    }

 
    return(
        <div>
            <h1>Your quote : {quote || 'no quote found'}</h1>
       <form onSubmit={updateQuote}>
              <label>Quote:</label>
                <input type="text" value={tempquote} onChange={(e)=>setTempQuote(e.target.value)}/>
                <br></br>
                <input type= "submit" value="Update quote"></input>
       </form>
        </div>
    )
}

export default Dashboard
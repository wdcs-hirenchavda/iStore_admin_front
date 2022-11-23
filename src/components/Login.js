import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
function Login() {
    const navigate = useNavigate()
    const [email,setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [error, setError]= useState(false);

    useEffect(()=>{
      if(localStorage.user){
        navigate('/product')
      }
    },[])
    const login = async()=>{
      if(!password || !{email}){
          setError(true);
         return false;
      } else{
        try{
          
          let adminData = await axios.post(`http://localhost:5000/login`,{
            username:email,
            email: email, 
            password: password
          })
          let data = await adminData.data;
        // console.log(data.Login_token);
        
        if(data.role ==='admin'){
          
          if(data.message===undefined){
            localStorage.setItem('user',JSON.stringify(data));
            Swal.fire({
              position: "top",
              icon: "success",
              title: "Your has successfully logged in Enjoy your site!",
              showConfirmButton: false,
              timer: 2000,
            });
            navigate('/product')
          }
          else{
            alert(adminData.data.message);
            // console.log(log.data.message);
            
          }
          
        }else{
          alert('please checked email and password')
        }
        }catch(error){
          if(error){
            if(error.response.data.errors.email!==''){

              alert(error.response.data.errors.email);
            }
            alert(error.response.data.errors.password);
            console.log(error);
            
          }
        
        }
      
      // 
      }
  }
  
  return (
    <div className='login ' >
       <h1>Login here</h1>

       <div className='my-2 '>
      <form>

      <input type="email" placeholder='Enter email or username ' className='inputBox' onChange={(e)=>setEmail(e.target.value)} />
     {error && !email && <span className='invalid-input' >Enter email or username</span>}
{/* 
      <span className='invalid-input' >Or</span>
      
      <input type="email" placeholder='Enter username ' className='inputBox' onChange={(e)=>setUsername(e.target.value)} />
    {error && !username && <span className='invalid-input' >Enter username</span>} */}

      <input type="password" placeholder='Enter password' className='inputBox' onChange={(e)=>setPassword(e.target.value)} />
      {error && !password && <span className='invalid-input' >Enter password</span>}



      <button type="submit" className='appButton' onClick={login} >Login</button>
    </form>
       </div>
    </div>
  )
}

export default Login

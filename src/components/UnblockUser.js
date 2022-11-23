import React,{useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router'
import queryString from 'query-string';
import axios from 'axios';
import Swal from 'sweetalert2';
function UnblockUser() {
    const {search} = useLocation();
    const{id} = queryString.parse(search);
    const navigate = useNavigate()

    useEffect(() => {
        let block = axios.put(`http://localhost:5000/user/${id}`,{
            isActive: true
        })
        if(block){
            Swal.fire({
                position: "top",
                icon: "success",
                title: "User unblock successfully",
                showConfirmButton: false,
                timer: 2000,
              });
              navigate('/usersIstore')
        }
    },[id])
  return (
    <div>
      
    </div>
  )
}

export default UnblockUser

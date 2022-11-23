import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

function AddCategory() {
    const[categoryName,setCategoryName] = useState()
    const[error,setError] =useState(false)
    const navigate = useNavigate()
    const addCategory = async ()=>{
        if(!categoryName){
            setError(true)
        }else{
            let addCategory = await axios.post(`http://localhost:5000/addCategory`,{
                name: categoryName
            })
            if(addCategory.data.success){
                alert(addCategory.data.success)
                navigate('/category')
            }else{
                alert(addCategory.data.error)
            }
        }
    }
  return (
    <div>
       <div className="product ">
        <h1>Add Your category here</h1>

        <div className="my-2 ">
          <input
            type="text"
            placeholder="Enter category name "
            className="inputBox"
            onChange={(e) => setCategoryName(e.target.value)}
          />
          {error && !categoryName && (
            <span className="invalid-input">Enter category name</span>
          )}
          <Button className='btn btn-info my-2' onClick={()=>addCategory()}>Add Category</Button>
          </div>
            </div>
    </div>
  )
}

export default AddCategory

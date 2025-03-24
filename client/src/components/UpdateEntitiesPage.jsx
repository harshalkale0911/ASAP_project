import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

function UpdateEntitiesPage() {
    const {id}=useParams()
    const navigate=useNavigate()
    const [formData,setFormdata]=useState({
        name:'',
        age:0,
        description:''
    })
    

    useEffect(() => {
        axios.get(`http://localhost:3000/CRUD-operation/user/${id}`)
            .then((response) => setFormdata(response.data))
            .catch((error) => console.error("Error fetching user:", error));
    }, [id])
    
    const handleChange=(e)=>{
        setFormdata({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()

        try{
            await axios.put(`http://localhost:3000/CRUD-operation/update/${id}`,formData)
            navigate('/entities')
        }catch(err){
            console.log('Error while updating',err)
        }
    }

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
              <h2 className="text-2xl font-bold text-indigo-500 dark:text-indigo-400 text-center mb-4">
                  Update User
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className="w-full p-2 border rounded"
                      required
                  />
                  <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Age"
                      className="w-full p-2 border rounded"
                      required
                  />
                  <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Description"
                      className="w-full p-2 border rounded"
                      required
                  />
                  <button
                      type="submit"
                      className="w-full p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                  >
                      Update
                  </button>
              </form>
          </div>
      </div>
  )
}

export default UpdateEntitiesPage
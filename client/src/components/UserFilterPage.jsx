import React, { useState,useEffect } from 'react'
import axios from 'axios'

function UserFilterPage({onSelectUser}) {
    const [users,setUsers]=useState([])

    const fetchData = async () => {
        const response = await axios.get('http://localhost:3000/CRUD-operation/user')
        setUsers(response.data)
        console.log(response)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleChange=(e)=>{
        const SelectedUserId=e.target.value 
        if(SelectedUserId===''){
            onSelectUser(null)
        }else{
            const selectedUser=users.find(user=>user._id===SelectedUserId)
            onSelectUser(selectedUser||null)
        }
    }
  return (
      <div className="mb-6">
          <label className="block text-lg font-semibold text-indigo-500 dark:text-indigo-400">
              Select a User:
          </label>
          <select
              className="border p-2 rounded w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              onChange={handleChange}
          >
              <option value="">All Users</option>
              {users.map((user) => (
                  <option key={user._id} value={user._id}>
                      {user.name}
                  </option>
              ))}
          </select>
      </div>
  )
}

export default UserFilterPage
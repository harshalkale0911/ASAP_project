import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function AddEntityPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        age: 0,
        description: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)

        const { name, age, description } = formData



        try {
            const response = await axios.post('http://localhost:3000/CRUD-operation/create-user', formData)
            console.log(response.data)
            navigate('/entities')
        } catch (err) {
            console.log(err)
        }


    }
    return (
        <div className="p-6 font-sans bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Add New Entity</h1>
            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700"
            >
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-900 dark:text-gray-100 font-medium mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="age" className="block text-gray-900 dark:text-gray-100 font-medium mb-2">
                        Age
                    </label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-900 dark:text-gray-100 font-medium mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
                    />
                </div>
                <div className="flex justify-between">
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="px-6 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-all"
                    >
                        Submit
                    </button>
                    {/* Reset Button */}
                    <button
                        type="button"
                        onClick={() => setFormData({ name: '', age: '', description: '' })}
                        className="px-6 py-2 bg-gray-400 dark:bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75 transition-all"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>

    )
}

export default AddEntityPage
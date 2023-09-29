'use client'
import React from 'react'

import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'


const page = () => {
  const { user } = useAuthContext()

  const router = useRouter()

  const handleForm = async (e) => {
    const data = {
      title: e.target.title.value,
      content: e.target.content.value
    }
    const { result, error } = await addData('users', 'user-id', data)

    if (error) {
      return console.log(error)
    }
  }

  React.useEffect(() => {
      if (user == null) router.push("/signin")
  }, [user])

  return (
    <div className='container'>
      <form>
        <h1>Crear Mandala</h1>
        <p>Logged in as {user?.email}</p>
        <label htmlFor="title">Title</label>
        <input className="form-control" type="text" id="title" name="title" />
        <label htmlFor="content">Description</label>
        <textarea  
          id="content"
          name="content" 
          type="text" 
          className="form-control"
          placeholder="write your content here" 
          rows="5" 
          cols="70" 
          required>
        </textarea>
        <button className="btn btn-primary" type="submit">Create</button>
      </form>
    </div>
  )
}

export default page
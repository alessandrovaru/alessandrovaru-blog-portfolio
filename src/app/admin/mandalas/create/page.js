'use client'
import React from 'react'

import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'

import  addData  from '@/firebase/firestore/addData'

import Select from 'react-select';

import  listData  from '@/firebase/storage/listData'
import  listFolders  from '@/firebase/storage/listFolders'


const page = () => {
  const [result, setResult] = React.useState([]);

  const { user } = useAuthContext()

  const router = useRouter();
  

  const handleForm = async (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      content: e.target.content.value.replace(/\n/g, '<br />'),
      slug: e.target.slug.value,
    };
    const { docRef, error } = await addData('mandalas', data)

    if (error) {
      return alert(error)
    }
    alert('Mandala created' + docRef.id)
  }

  React.useEffect(() => {
      if (user == null) router.push("/signin");
  }, [user]);

  // React.useEffect(() => {
  //   async function fetchItems() {
  //     const items = await listData();
  //     setResult(items);
  //   }

  //   fetchItems();
  // }, []);



  return (
    <div className='container'>
      <form onSubmit={handleForm}>
        <h1>Crear Mandala</h1>
        <p>Logged in as {user?.email}</p>
        <label htmlFor="title">Title</label>
        <input className="form-control" type="text" id="title" name="title" />
        <label htmlFor="content">Description</label>
        <textarea  
          id="content"
          name="content" 
          className="form-control"
          placeholder="write your content here" 
          rows="5" 
          cols="70" 
          required
        >
        </textarea>
        <label htmlFor="title">Slug</label>
        <input className="form-control" type="text" id="slug" name="slug" />
        <button className="btn btn-primary" type="submit">Create</button>
      </form>
    </div>
  )
}

export default page
'use client'
import {useEffect, useState} from 'react'

import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'

import  addData  from '@/firebase/firestore/addData'



const page = () => {
  const [result, setResult] = useState([]);

  const { user } = useAuthContext()

  const router = useRouter();
  

  const handleForm = async (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      content: e.target.content.value.replace(/\n/g, '<br />'),
      slug: e.target.slug.value,
      storage_slug: e.target['storage-slug'].value,
    };
    const { docRef, error } = await addData('mandalas', data)

    if (error) {
      return alert(error)
    }
    alert('Mandala created')
    e.target.title.value = '';
    e.target.content.value = '';
    e.target.slug.value = '';
    e.target['storage-slug'].value = '';
  }

  useEffect(() => {
      if (user == null) router.push("/signin");
  }, [user]);

  // useEffect(() => {
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
        <label htmlFor="slug">Slug for url</label>
        <input className="form-control" type="text" id="slug" name="slug" />
        <label htmlFor="storage-slug">Slug for Storage link</label>
        <input className="form-control" type="text" id="storage-slug" name="storage-slug" />
        <button className="btn btn-primary" type="submit">Create</button>
      </form>
    </div>
  )
}

export default page
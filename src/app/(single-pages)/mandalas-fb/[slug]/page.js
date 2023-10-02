'use client'
import React from 'react'

import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'

import  listData  from '@/firebase/firestore/listData'
import  listStorageData  from '@/firebase/storage/listStorageData'


const page = ({ params : { slug } }) => {
  const [result, setResult] = React.useState([]);
  const [storageResult, setStorageResult] = React.useState([]);
  const { user } = useAuthContext()
  const router = useRouter();
  

  React.useEffect(() => {
    async function fetchItems() {
      const items = await listData('mandalas');
      const filteredItems = items.filter(item => item.slug === slug)
      setResult(filteredItems);
    }

    fetchItems();
  }, []);

  React.useEffect(() => {
    if (result.length > 0) {
      async function fetchStorageItems() {
        alert(result[0].storage_slug)
        const items = await listStorageData(`mandalas/${result[0].storage_slug}`);
        setStorageResult(items);
      }
      fetchStorageItems();
    }
  }, [result]);

  React.useEffect(() => {
      if (user == null) router.push("/signin");
  }
  , []);



  return (
    <div className='container'>
      {result.map((item) => (
        <div key={item.slug}>
          <h1>{item.title}</h1>
          <p>{item.content}</p>
          <p>{item.slug}</p>
        </div>
      ))      
      }
      {JSON.stringify(storageResult)}
      {storageResult.map((item) => (
        <div key={item.value}>
          <h1>{item.label}</h1>
          <p>{item.value}</p>
          <img src={`https://firebasestorage.googleapis.com/v0/b/alessandrovaru-nextjs.appspot.com/o/mandalas%2F${result[0].storage_slug}%2F${item.value}?alt=media&token=d93542a5-875c-47cd-94d4-2998417d8300&_gl=1*101z3oy*_ga*MzYyNDUzOTU4LjE2OTU5OTIxNDI.*_ga_CW55HF8NVT*MTY5NjI4OTY3MS4xNC4xLjE2OTYyODk3MDEuMzAuMC4w`} className='img-fluid' />
        </div>
      ))
      }
    </div>
  )
}

export default page
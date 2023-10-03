'use client'
import React from 'react'

import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'

import  listData  from '@/firebase/firestore/listData'
import  listStorageData  from '@/firebase/storage/listStorageData'
import PostImagesSlider from '@/components/PostImagesSlider'


const page = ({ params : { slug } }) => {
  const [result, setResult] = React.useState([]);
  const [storageResult, setStorageResult] = React.useState([]);
  const { user } = useAuthContext()
  const router = useRouter();
  
  //fetchItems
  React.useEffect(() => {
    async function fetchItems() {
      const items = await listData('mandalas');
      const filteredItems = items.filter(item => item.slug === slug)
      setResult(filteredItems);
    }

    fetchItems();
  }, []);

  //fetchStorageItems
  React.useEffect(() => {
    if (result.length > 0) {
      async function fetchStorageItems() {
        const items = await listStorageData(`mandalas/${result[0].storage_slug}`);
        setStorageResult(items);
      }
      fetchStorageItems();
    }
  }, [result]);

  //Redirect if not logged in
  React.useEffect(() => {
      if (user == null) router.push("/signin");
  }
  , []);


  return (
    <div className='container'>
      <PostImagesSlider storageResult={storageResult} result={result} />
      {result.map((item) => (
        <div key={item.slug}>
          <h1>{item.title}</h1>
          <p>{item.content}</p>
        </div>
      ))      
      }
    </div>
  )
}

export default page
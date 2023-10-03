'use client'
import React from 'react'

import DOMPurify from 'dompurify';


import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'

import  listData  from '@/firebase/firestore/listData'
import  listStorageData  from '@/firebase/storage/listStorageData'
import PostImagesSlider from '@/components/PostImagesSlider'

import './styles.css'


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
        <div className='mandala-container' key={item.slug}>
          <h1 className='mandala-title mt-3'>{item.title}</h1>
          <p className='mandala-content mt-3' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }} />
        </div>
      ))      
      }
    </div>
  )
}

export default page
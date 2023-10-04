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
      const items = await listData('mixtapes-de-caracas');
      const filteredItems = items.filter(item => item.slug === slug)
      setResult(filteredItems);
    }

    fetchItems();
  }, []);

  //fetchStorageItems
  React.useEffect(() => {
    if (result.length > 0) {
      async function fetchStorageItems() {
        const items = await listStorageData(`mixtapes-de-caracas/${result[0].storage_slug}`);
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
    <div className='mixtapes-container container'>
      <PostImagesSlider storageResult={storageResult} result={result} storage={'mixtapes-de-caracas'} />
      {result.map((item) => (
        <div className='mixtapes-wrapper' key={item.slug}>
          <h1 className='mixtapes-title mt-3'>{item.title}</h1>
          <p className='mixtapes-content mt-3' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }} />
        </div>
      ))      
      }
    </div>
  )
}

export default page
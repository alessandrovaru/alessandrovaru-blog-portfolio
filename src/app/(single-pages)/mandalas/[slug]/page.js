'use client'
import React from 'react'

import DOMPurify from 'dompurify';


import  listData  from '@/firebase/firestore/listData'
import  listStorageData  from '@/firebase/storage/listStorageData'
import PostImagesSlider from '@/components/PostImagesSlider'

import './styles.css'
import Loading from '@/components/LoadingMandala';


const page = ({ params : { slug } }) => {
  const [result, setResult] = React.useState([]);
  const [storageResult, setStorageResult] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  
  //fetchItems
  React.useEffect(() => {
    async function fetchItems() {
      const items = await listData('mandalas');
      const filteredItems = items.filter(item => item.slug === slug)
      setResult(filteredItems);
      setLoading(false);
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

  if (loading) {
    return <Loading />;
  }



  return (
    <div className='mandala-container container'>
      <PostImagesSlider storageResult={storageResult} result={result} storage={'mandalas'}/>
      {result.map((item) => (
        <div className='mandala-wrapper' key={item.slug}>
          <h1 className='mandala-title mt-3'>{item.title}</h1>
          <p className='mandala-content mt-3' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }} />
        </div>
      ))      
      }
    </div>
  )
}

export default page
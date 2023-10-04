'use client'
import {useEffect, useState} from 'react'

import DOMPurify from 'dompurify';



import LoadingMandala from '@/components/LoadingMandala';

import  listData  from '@/firebase/firestore/listData'
import  listStorageData  from '@/firebase/storage/listStorageData'
import PostImagesSlider from '@/components/PostImagesSlider'

import { useRouter } from 'next/navigation'

import './styles.css'


const page = ({ params : { slug } }) => {
  const [result, setResult] = useState([]);
  const [resultUnfiltered, setResultUnfiltered] = useState([]);
  const [storageResult, setStorageResult] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter()
  
  //fetchItems
  useEffect(() => {
    async function fetchItems() {
      const items = await listData('mixtapes-de-caracas');
      const filteredItems = items.filter(item => item.slug === slug)
      setResultUnfiltered(items);
      setResult(filteredItems);
    }

    fetchItems();
  }, []);

  //fetchStorageItems
  useEffect(() => {
    if (result.length > 0) {
      async function fetchStorageItems() {
        const items = await listStorageData(`mixtapes-de-caracas/${result[0].storage_slug}`);
        setStorageResult(items);
      }
      fetchStorageItems();
      setLoading(false);
    }
  }, [result]);

  const otherRandomPost = () => {
    //use resultUnfiltered
    const filteredItems = resultUnfiltered.filter(item => item.slug !== slug)
    const randomItem = filteredItems[Math.floor(Math.random() * filteredItems.length)];
    router.push(`/mixtapes-de-caracas/${randomItem.slug}`)
  }

  if (loading) {
    return <LoadingMandala />;
  }

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
      <button onClick={() => window.history.back()} className='btn btn-light mt-3 me-3'>Volver</button>
      <button onClick={otherRandomPost} className='btn btn-light mt-3 me-3'>Otro Mixtape</button>
    </div>
  )
}

export default page
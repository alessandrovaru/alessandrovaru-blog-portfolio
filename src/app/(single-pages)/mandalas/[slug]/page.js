'use client'
import {useEffect, useState} from 'react'

import DOMPurify from 'dompurify';


import  listData  from '@/firebase/firestore/listData'
import  listStorageData  from '@/firebase/storage/listStorageData'
import PostImagesSlider from '@/components/PostImagesSlider'

import './styles.css'
import Loading from '@/components/LoadingMandala';
import { useRouter } from 'next/navigation'



const Page = ({ params : { slug } }) => {
  const [result, setResult] = useState([]);
  const [resultUnfiltered, setResultUnfiltered] = useState([]);
  const [storageResult, setStorageResult] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter()
  //fetchItems
  useEffect(() => {
    async function fetchItems() {
      const items = await listData('mandalas');
      const filteredItems = items.filter(item => item.slug === slug)
      setResultUnfiltered(items);
      setResult(filteredItems);
      setLoading(false);
    }

    fetchItems();
  }, []);

  //fetchStorageItems
  useEffect(() => {
    if (result.length > 0) {
      async function fetchStorageItems() {
        const items = await listStorageData(`mandalas/${result[0].storage_slug}`);
        setStorageResult(items);
      }
      fetchStorageItems();
    }
  }, [result]);

  const otherRandomMandala = () => {
    //use resultUnfiltered
    const filteredItems = resultUnfiltered.filter(item => item.slug !== slug)
    const randomItem = filteredItems[Math.floor(Math.random() * filteredItems.length)];
    router.push(`/mandalas/${randomItem.slug}`)
  }

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
      <button onClick={() => window.history.back()} className='btn btn-light mt-3 me-3'>Volver</button>
      <button onClick={otherRandomMandala} className='btn btn-light mt-3 me-3'>Otro mandala</button>
    </div>
  )
}

export default Page
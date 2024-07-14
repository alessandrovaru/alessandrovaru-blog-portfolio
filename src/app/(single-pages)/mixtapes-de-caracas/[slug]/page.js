'use client'
import {useEffect, useState} from 'react'

import DOMPurify from 'dompurify';

import styles from './styles.module.css'

import LoadingMandala from '@/components/LoadingMandala';

import  listData  from '@/firebase/firestore/listData'
import  listStorageData  from '@/firebase/storage/listStorageData'
import PostImagesSlider from '@/components/PostImagesSlider'

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
    <div className={styles.container}>
      <div className={styles.postImageSlider}>
        <PostImagesSlider storageResult={storageResult} result={result} storage={'mixtapes-de-caracas'}/>
      </div>

      <div className={styles.postContent}>
        {result.map((item) => (
          <div className={styles.textContainer} key={item.slug}>
            <h1 className={styles.h1 +  ' ' + 'mt-3'}>{item.title}</h1>
            <p className={styles.p +  ' ' + 'mt-3'} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }} />
          
            <button onClick={() => window.history.back()} className='btn btn-light mt-3 me-3'>Volver</button>
            <button onClick={otherRandomPost} className='btn btn-light mt-3 me-3'>Otro Mixtape</button>
            {/* make one to go to the rooth */}
            <button onClick={() => router.push('/')} className='btn btn-light mt-3 me-3'>Home</button>
          </div>
        ))      
        }
        
      </div>
    </div>
  )
}

export default Page
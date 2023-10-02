'use client'
import React from 'react'

import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'

import  listData  from '@/firebase/firestore/listData'


const page = ({ params : { slug } }) => {
  const [result, setResult] = React.useState([]);
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
    </div>
  )
}

export default page
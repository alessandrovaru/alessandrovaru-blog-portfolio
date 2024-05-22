import Image from 'next/image'
import styles from './styles.module.css'

export default function Page() {
  return (
    <div className={styles.pageContainer}>
      <h1>Page</h1>
      <Image src="/images/largePost.jpg" alt="Next.js Logo" width={1800} height={4000} />
    </div>
  )
}

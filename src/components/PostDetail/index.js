import Link from 'next/link'
import PostImagesSlider from '@/components/PostImagesSlider'
import RandomPostButton from './RandomPostButton'
import { sanitizeContent } from '@/lib/sanitize'
import styles from './styles.module.css'

// Vista de detalle compartida por Mandalas y Mixtapes de Caracas.
// Se renderiza en el servidor: el título y el texto llegan en el HTML.
const PostDetail = ({ post, images, basePath, randomLabel, otherSlugs }) => {
  return (
    <div className={styles.container}>
      <div className={styles.postImageSlider}>
        <PostImagesSlider images={images} title={post.title} />
      </div>

      <div className={styles.postContent}>
        <article className={styles.textContainer} data-lenis-prevent>
          <h1 className={`${styles.h1} mt-3`}>{post.title}</h1>
          <p
            className={`${styles.p} mt-3`}
            dangerouslySetInnerHTML={{ __html: sanitizeContent(post.content) }}
          />

          <Link href={basePath} className="btn btn-light mt-3 me-3">Volver</Link>
          <RandomPostButton basePath={basePath} slugs={otherSlugs} label={randomLabel} />
          <Link href="/" className="btn btn-light mt-3 me-3">Home</Link>
        </article>
      </div>
    </div>
  )
}

export default PostDetail

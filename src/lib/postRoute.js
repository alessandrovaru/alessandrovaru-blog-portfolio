import { notFound } from 'next/navigation'
import listData from '@/firebase/firestore/listData'
import getBySlug from '@/firebase/firestore/getBySlug'
import listImages from '@/firebase/storage/listImages'
import PostDetail from '@/components/PostDetail'
import { toPlainText } from '@/lib/sanitize'

// Genera generateStaticParams, generateMetadata y la página de detalle
// para una colección de Firestore cuyos documentos tienen
// { title, content, slug, storage_slug }.
export function createPostRoute({ collection, basePath, sectionTitle, randomLabel }) {
  async function generateStaticParams() {
    const items = await listData(collection)
    return items.filter((item) => item.slug).map((item) => ({ slug: item.slug }))
  }

  async function generateMetadata({ params }) {
    const { slug } = await params
    const post = await getBySlug(collection, slug)
    if (!post) return { title: 'No encontrado' }

    const images = await listImages(`${collection}/${post.storage_slug}`)
    const description = toPlainText(post.content) || `${post.title} — ${sectionTitle}`
    const url = `${basePath}/${slug}`

    return {
      title: `${post.title} — ${sectionTitle}`,
      description,
      alternates: { canonical: url },
      openGraph: {
        title: post.title,
        description,
        url,
        type: 'article',
        ...(images[0] && { images: [{ url: images[0].src, alt: post.title }] }),
      },
    }
  }

  async function Page({ params }) {
    const { slug } = await params
    const post = await getBySlug(collection, slug)
    if (!post) notFound()

    const [images, all] = await Promise.all([
      listImages(`${collection}/${post.storage_slug}`),
      listData(collection),
    ])
    const otherSlugs = all.map((item) => item.slug).filter((s) => s && s !== slug)

    return (
      <PostDetail
        post={post}
        images={images}
        basePath={basePath}
        randomLabel={randomLabel}
        otherSlugs={otherSlugs}
      />
    )
  }

  return { generateStaticParams, generateMetadata, Page }
}

import { createPostRoute } from '@/lib/postRoute'

export const revalidate = 600

const route = createPostRoute({
  collection: 'mandalas',
  basePath: '/mandalas',
  sectionTitle: 'Mandalas',
  randomLabel: 'Otro mandala',
})

export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page

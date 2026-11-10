import { createPostRoute } from '@/lib/postRoute'

export const revalidate = 600

const route = createPostRoute({
  collection: 'mixtapes-de-caracas',
  basePath: '/mixtapes-de-caracas',
  sectionTitle: 'Mixtapes de Caracas',
  randomLabel: 'Otro Mixtape',
})

export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page

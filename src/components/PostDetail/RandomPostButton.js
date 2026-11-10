'use client'
import { useRouter } from 'next/navigation'

const RandomPostButton = ({ basePath, slugs, label }) => {
  const router = useRouter()

  if (!slugs?.length) return null

  const goToRandom = () => {
    const slug = slugs[Math.floor(Math.random() * slugs.length)]
    router.push(`${basePath}/${slug}`)
  }

  return (
    <button type="button" onClick={goToRandom} className="btn btn-light mt-3 me-3">
      {label}
    </button>
  )
}

export default RandomPostButton

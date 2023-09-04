import MixtapesLanding from "@/components/MixtapesLanding"

import { fetchMixtapesPages } from "@/lib/notion";

import { notFound } from "next/navigation";

import background from "/public/images/p3.jpg";

const pages = await fetchMixtapesPages();
if (!pages) notFound();

const pagesList = pages.map((page) => {
  return {
    title: page.properties.Title.title[0].text.content,
    url: `/mixtapes-de-caracas/${page.properties.slug.rich_text[0].plain_text}`
  }
})



const page = () => {
  return (
    <>
      <MixtapesLanding 
        pagesList={pagesList} 
        background={background}
      />
    </>
  )
}

export default page
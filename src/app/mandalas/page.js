import MandalaButton from "@/components/MandalaButton"

import { fetchPages } from "@/lib/notion";

import { notFound } from "next/navigation";

const pageContent = {
  title: 'Mandalas',
  subtitle: 'El Mandala es el centro este proyecto, símbolo de totalidad y orden interior. Los diseños y los poemas son producciones inconscientes en las que permito hablar a las imágenes a partir de mis fotos y los más profundo de mi ser.',
  link: {
    url: '/mandalas',
    text: 'Ver más'
  }
}

const pages = await fetchPages();

// Create a const named pageslist it should map something like pages[0].properties.Title.title[0].text.content but changing the "0" for the value in the iteration and inside create an object with the title and the url of the page
const pagesList = pages.map((page) => {
  return {
    title: page.properties.Title.title[0].text.content,
    url: `/mandalas/${page.properties.slug.rich_text[0].plain_text}`
  }
})

//create a const html that will be the html of the mandalas page it contains every page list object in a <span> tag


// {
//   "ID":"TITLE",
//   "TYPE":"TITLE",
//   "TITLE":[{
//     "TYPE":"TEXT",
//     "TEXT":{
//       "CONTENT":"NAUSEA ANSIOSA",
//       "LINK":NULL
//     },
//     "ANNOTATIONS":{
//       "BOLD":FALSE,
//       "ITALIC":FALSE,
//       "STRIKETHROUGH":FALSE,
//       "UNDERLINE":FALSE,
//       "CODE":FALSE,
//       "COLOR":"DEFAULT"},
//       "PLAIN_TEXT":"NAUSEA ANSIOSA",
//       "HREF":NULL}
//     ]
//   }



const page = () => {
  return (
    <>
      <MandalaButton content={pageContent} pagesList={pagesList} />
      {/* <HeroContainer 
        content={content} 
        backgroundImage={backgroundImage}
      /> */}
    </>
  )
}

export default page
import MixtapesLanding from "@/components/MixtapesLanding"


import background from "/public/images/p3.jpg";
import listData from "@/firebase/firestore/listData";


const pagesFb = await listData('mixtapes-de-caracas');


const pagesListFb = pagesFb.map((page) => {
  return {
    title: page.title,
    url: `/mixtapes-de-caracas/${page.slug}`
  }
})




const page = () => {
  return (
    <>
      <MixtapesLanding 
        pagesList={pagesListFb} 
        background={background}
      />
    </>
  )
}

export default page
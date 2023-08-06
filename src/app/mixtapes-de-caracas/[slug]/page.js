
import { fetchPageBlocks, fetchMixtapesPageBySlug, notion } from "@/lib/notion";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import { notFound } from "next/navigation";

import ImageSlider from '@/components/ImageSlider'

import './styles.css'

export default async function Page({ params : { slug } }) {
  const post = await fetchMixtapesPageBySlug(slug);
  if (!post) notFound();

  const blocks = await fetchPageBlocks(post.id);
  // delete the [2] of blocks
  

  const renderer = new NotionRenderer({
    client: notion,
  });

  renderer.use(hljsPlugin());
  renderer.use(bookmarkPlugin());

  const images = await renderer.render(blocks[1]);

  blocks.splice(1, 1);
  
  const html = await renderer.render(...blocks);


  return (
    <div className="notion-container">
      <ImageSlider images={images}/>
      <div className="container" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
import { fetchPageBlocks, fetchPageBySlug, notion } from "@/lib/notion";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import { notFound } from "next/navigation";

import './styles.css'

export default async function Page({ params : { slug } }) {
  const post = await fetchPageBySlug(slug);
  if (!post) notFound();

  const blocks = await fetchPageBlocks(post.id);

  const renderer = new NotionRenderer({
    client: notion,
  });

  renderer.use(hljsPlugin());
  renderer.use(bookmarkPlugin());
  

  const html = await renderer.render(...blocks);

  return (
    <div className="notion-container">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
import "server-only";

import { Client } from "@notionhq/client";
import React from "react";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const fetchPages = React.cache(() => {
  return notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "Status",
      select: {
        equals: "Published",
      },
    },
  });
});

export const fetchPageBySlug = React.cache(async (slug) => {
  return notion.databases
    .query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: "slug",
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0]);
});

export const fetchPageBlocks = React.cache(async (pageId) => {
  return notion.blocks.children
    .list({ block_id: pageId })
    .then((res) => res.results);
});

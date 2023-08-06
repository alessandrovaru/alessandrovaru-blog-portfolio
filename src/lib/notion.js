import "server-only";

import { Client } from "@notionhq/client";
import React from "react";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

//MANDALAS FETCH
export const fetchMandalasPages = React.cache(async () => {
  return notion.databases
    .query({
      database_id: process.env.MANDALAS_NOTION_DATABASE_ID,
      filter: {
        property: "status",
        status: {
          equals: "Published",
        },
      },
    })
    .then((res) => res.results);
});

//MIXTAPES FETCH
export const fetchMixtapesPages = React.cache(async () => {
  return notion.databases
    .query({
      database_id: process.env.MIXTAPES_NOTION_DATABASE_ID,
      filter: {
        property: "status",
        status: {
          equals: "Published",
        },
      },
    })
    .then((res) => res.results);
});


//MANDALAS PAGE FETCH
export const fetchMandalasPageBySlug = React.cache(async (slug) => {
  return notion.databases
    .query({
      database_id: process.env.MANDALAS_NOTION_DATABASE_ID,
      filter: {
        property: "slug",
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0]);
});

//MIXTAPES PAGE FETCH
export const fetchMixtapesPageBySlug = React.cache(async (slug) => {
  return notion.databases
    .query({
      database_id: process.env.MIXTAPES_NOTION_DATABASE_ID,
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

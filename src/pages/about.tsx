// pages/about.tsx
import Head from "next/head";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "../prismicio";
import { components } from "../slices";

export async function getStaticProps() {
  const client = createClient();
  try {
    const page = await client.getSingle("about");

    return {
      props: { page },
      revalidate: 60, // Optional: ISR support
    };
  } catch (error) {
    console.error("Error fetching 'about' page:", error);
    return {
      notFound: true,
    };
  }
}

export default function AboutPage({ page }: any) {
  return (
    <>
      <Head>
        <title>{page?.data?.meta_title || "Fallback Title"}</title>
        <meta name="description" content={page?.data?.meta_description || ""} />
        <meta property="og:image" content={asImageSrc(page?.data?.meta_image) || ""} />
      </Head>

      <SliceZone slices={page.data.slices} components={components} />
    </>
  );
}

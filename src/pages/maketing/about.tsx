import Head from "next/head";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import MainLayout from "@/layouts/MainLayout";

export async function getStaticProps({ previewData }: any) {
  const client = createClient(previewData);
  try {
    const page = await client.getSingle("about");

    return {
      props: { page },
      // revalidate: 60, // Optional: ISR support // Incremental Static Regeneration (ISR) is not supported when using output: 'export'
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

AboutPage.getLayout = function getLayout(page: any) {
  return <MainLayout>{page}</MainLayout>;
};
// pages/about.tsx
import Head from "next/head";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "../prismicio";
import { components } from "../slices";

export async function getStaticProps({ params, previewData }: any) {
    const client = createClient(previewData);
    try {
        const page = await client.getByUID("page", params.uid as string);
        return {
            props: { page },
        };
    } catch (error) {
        console.error("Error fetching 'dynamic' page:", error);
        return {
            notFound: true,
        };
    }
}

export async function getStaticPaths() {
    const client = createClient();
    const pages = await client.getAllByType("page");

    return {
        paths: pages.map((page) => ({
            params: { uid: page.uid },
        })),
        fallback: "blocking", // Use 'blocking' for better SEO and user experience
    };
}

export default function DynamicPage({ page }: any) {
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

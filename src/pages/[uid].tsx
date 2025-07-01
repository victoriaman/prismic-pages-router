import Head from "next/head";
import { asImageSrc, isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "../prismicio";
import { components } from "../slices";

export async function getStaticProps({ params, previewData }: any) {
    const client = createClient(previewData);
    try {
        const page = await client.getByUID("page", params.uid as string);

        const testimonials = await Promise.all(
            page.data.slices.map(async (slice) => {
                if (slice.slice_type === "testimonials") {
                    const testimonials = await Promise.all(
                        slice.primary.testimonial_list.map((item) => {
                            if (isFilled.contentRelationship(item.testimonial) && item.testimonial.uid) {
                                return client.getByUID("testimonial", item.testimonial.uid);
                            }
                            return null;
                        })
                    );
                    return { ...slice, fetchedTestimonials: testimonials };
                }
                return slice;
            }));

        // Enrich the page data with the fetched testimonials
        return {
            props: {
                page: {
                    ...page, // is for uid, type, id
                    data: {
                        ...page.data,
                        slices: testimonials, // <- override with enriched slices
                    },
                },
            },
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
            <p className="invisible">{page.uid}</p>
            <Head>
                <title>{page?.data?.meta_title || "Fallback Title"}</title>
                <meta name="description" content={page?.data?.meta_description || ""} />
                <meta property="og:image" content={asImageSrc(page?.data?.meta_image) || ""} />
            </Head>

            <SliceZone slices={page.data.slices} components={components} />
        </>
    );
}

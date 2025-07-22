import { Content, asImageSrc, isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "../prismicio";
import { components } from "../slices";
import dynamic from "next/dynamic";

type Slice =
  | Content.CallToActionSlice
  | Content.FeaturesSlice
  | Content.HeroSlice
  | Content.LoginSlice
  | Content.TestimonialsSlice
  | Content.TextWithImageSlice;

const MetaHead = dynamic(() => import("@/components/MetaHead"), {
    ssr: false,
});

const MainLayout = dynamic(() => import("@/layouts/MainLayout"), {
    ssr: false
});

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

export default function DynamicPage({ page }: {
    page: {
      data: {
        slices: Slice[];
        meta_title?: string;
        meta_description?: string;
        meta_image?: any;
      };
    };
  }) {
    return (
        <>
            {/* <p className="invisible">{page.uid}</p> */}
            <MetaHead
                title={page?.data?.meta_title || "Features"}
                description={page?.data?.meta_description || ""}
                ogImage={asImageSrc(page?.data?.meta_image) || ""}
            />

            <SliceZone slices={page.data.slices} components={components} />
        </>
    );
}

DynamicPage.getLayout = function getLayout(page: any) {
    return <MainLayout>{page}</MainLayout>;
};
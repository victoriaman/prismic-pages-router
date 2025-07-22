import { Content, asImageSrc } from "@prismicio/client";
import { createClient } from "@/prismicio";
import dynamic from "next/dynamic";

const MetaHead = dynamic(() => import("@/components/MetaHead"), {
  ssr: false,
});

// ✅ Dynamic import RenderSlices để tránh SSR lỗi useContext
const RenderSlices = dynamic(() => import("@/components/RenderSlices"), {
  ssr: false,
});

const MainLayout = dynamic(() => import("@/layouts/MainLayout"), {
  ssr: false
});

type Slice =
  | Content.CallToActionSlice
  | Content.FeaturesSlice
  | Content.HeroSlice
  | Content.LoginSlice
  | Content.TestimonialsSlice
  | Content.TextWithImageSlice;

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

export default function AboutPage({ page }: {
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
      <MetaHead
        title={page?.data?.meta_title || "Login"}
        description={page?.data?.meta_description || ""}
        ogImage={asImageSrc(page?.data?.meta_image) || ""}
      />

      {/* ✅ Render slices tại client-side để tránh lỗi hook */}
      <RenderSlices slices={page.data.slices} />
      {/* <SliceZone slices={page.data.slices} components={components} /> */}
    </>
  );
}

AboutPage.getLayout = function getLayout(page: any) {
  return <MainLayout>{page}</MainLayout>;
};
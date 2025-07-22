import dynamic from "next/dynamic";
import { asImageSrc, Content } from "@prismicio/client";
import { createClient } from "@/prismicio";
import AuthLayout from "@/layouts/AuthLayout";

// ✅ Dynamic import RenderSlices để tránh SSR lỗi useContext
const RenderSlices = dynamic(() => import("@/components/RenderSlices"), {
  ssr: false,
});

const RemoteHeader = dynamic(() => import('adminMFE/Header'), {
  ssr: false,
});

const MetaHead = dynamic(() => import("@/components/MetaHead"), {
  ssr: false,
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
    const page = await client.getSingle("login");

    return {
      props: { page },
    };
  } catch (error) {
    console.error("Error fetching 'login' page:", error);
    return {
      notFound: true,
    };
  }
}

export default function LoginPage({
  page,
}: {
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

      <RemoteHeader />

      {/* ✅ Render slices tại client-side để tránh lỗi hook */}
      <RenderSlices slices={page.data.slices} />
    </>
  );
}

LoginPage.getLayout = function getLayout(page: React.ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};

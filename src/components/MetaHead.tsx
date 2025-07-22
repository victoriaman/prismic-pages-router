import Head from "next/head";

export default function MetaHead({
  title,
  description,
  ogImage,
}: {
  title: string;
  description: string;
  ogImage: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:image" content={ogImage} />
    </Head>
  );
}

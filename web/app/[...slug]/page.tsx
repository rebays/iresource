import { cmsFetch } from "@/lib/cms";
import { GET_PAGE } from "@/lib/queries";
import { notFound } from "next/navigation";
import { pageRegistry, type CmsPage } from "@/components/pages/registry";


async function catchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const urlPath = `/${slug.join("/")}/`;

  const data = await cmsFetch<{ page: CmsPage | null }>(GET_PAGE, { urlPath });

  if (!data.page) notFound();

  const Component = pageRegistry[data.page.__typename];
  if (!Component) notFound();

  return <Component page={data.page} />;
}

export default catchAllPage;

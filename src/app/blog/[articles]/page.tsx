import { getEntriesByContentType, getFields } from "@/lib/helpers";
import { GetStaticPaths, GetStaticProps } from "next";

const page = () => {
  return <div>Enter</div>;
};

export async function generateStaticParams() {
  const blogEntries = await getEntriesByContentType("blogEntry");
  if (!Array.isArray(blogEntries)) {
    return [];
  }
  return blogEntries?.map((entry) => {
    const { slug } = getFields(entry);

    return {
      slug: slug,
    };
  });
}

export default page;

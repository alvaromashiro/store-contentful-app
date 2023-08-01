import { getEntriesByContentType, getFields } from "@/lib/helpers";
import { Entry } from "contentful";
import Link from "next/link";

type BlogEntriesCards = {
  id: string;
  title: string;
  slug: string;
  author: string;
};

async function getData() {
  const blogEntries = await getEntriesByContentType("blogEntry");
  if (!Array.isArray(blogEntries)) {
    return [];
  }
  return blogEntries?.map((entry) => {
    const id = entry.sys.id;
    const { slug, title, author } = getFields(entry);
    const { name } = getFields(author as Entry);
    return {
      id,
      title,
      slug,
      author: name,
    } as BlogEntriesCards;
  });
}

const page = async () => {
  const entries = await getData();

  return (
    <div>
      <h1>Blog</h1>
      <section>
        {entries.map((entry) => (
          <Link key={entry.id} href={`/blog/${entry.slug}`}>
            {entry.title}
          </Link>
        ))}
      </section>
    </div>
  );
};

export default page;

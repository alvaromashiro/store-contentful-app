import { getEntriesByContentType, getFields } from "@/lib/helpers";

const getData = async () => {
  const entries = await getEntriesByContentType("landingPage");
  console.log(entries);

  return entries;
};

const LocalesPage = async () => {
  const data = await getData();
  const fields = getFields(data);
  const moreFields = getFields(fields);
  // console.log(data);

  return (
    <div>
      <h1>{moreFields.title}</h1>
      <p>{moreFields.subtitle}</p>
      <pre>{JSON.stringify(moreFields, null, 2)}</pre>
    </div>
  );
};

export default LocalesPage;

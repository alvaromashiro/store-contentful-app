import { getEntriesByContentType, getFields } from "@/lib/helpers";

const getData = async () => {
  const entries = await getEntriesByContentType("landingPage");
  return entries;
};

const LocalesPage = async () => {
  const data = await getData();
  if (!data) {
    return null;
  }
  const fields = getFields(data[0]);
  const moreFields = getFields(fields.sections);

  return (
    <div>
      <h1>{moreFields.title}</h1>
      <p>{moreFields.subtitle}</p>
    </div>
  );
};

export default LocalesPage;

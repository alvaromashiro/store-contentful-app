import * as contentful from "contentful";

const space_id = process.env.NEXT_PUBLIC_SPACE_ID;
const access_token = process.env.NEXT_PUBLIC_DELIVERY_TOKEN as string;
const preview_token = process.env.NEXT_PUBLIC_PREVIEW_TOKEN as string;
const enviroment = process.env.NEXT_PUBLIC_ENVIROMENT;

type Options = {
  space: string;
  host?: string;
  accessToken: string;
  enviroment: string;
};

const getOptions = (is_preview: boolean) => {
  let options = {} as Options;
  options.space = space_id as string;
  options.host = is_preview ? "preview.contentful.com" : undefined;
  options.accessToken = is_preview ? preview_token : access_token;
  options.enviroment = enviroment ?? "master";
  return options;
};

export const getAllLocales = async () => {
  const options = getOptions(false);
  const contentfulClient = contentful.createClient(options);

  try {
    let allLocales = await contentfulClient.getLocales();
    let dataType = {};
  } catch (error) {}
};

export const getEntriesByContentType = async (
  content_type: string,
  slug = null
) => {
  const options = getOptions(false);
  try {
    const contentfulClient = contentful.createClient(options);
    if (!contentfulClient) {
      return false;
    }

    let params = {
      content_type: content_type,
      include: 3,
    };

    if (slug) {
      // @ts-ignore
      params["fields.slug"] = slug;
    }

    let entries = await contentfulClient.getEntries(params);

    return entries.items;
  } catch (error) {
    console.log(error);
  }
};

export const getFields = (obj: contentful.Entry) => {
  if (Array.isArray(obj) && obj.length === 1) {
    return obj[0].fields;
  }
  return obj.fields;
};

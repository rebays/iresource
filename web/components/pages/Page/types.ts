export type Page = {
  __typename: string;
  id: string;
  urlPath: string;
  url: string | null;
  title: string;
  slug: string;
  seoTitle: string;
  pageType: string;
  contentType: string;
  searchDescription: string;
};

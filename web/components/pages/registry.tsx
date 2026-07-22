import type { ComponentType } from 'react';
import AboutPage from '@/components/pages/AboutPage/AboutPage';
import type { AboutPage as AboutPageType } from '@/components/pages/AboutPage/types';

export type CmsPage = AboutPageType;

type PageRegistry = {
  [K in CmsPage['__typename']]: ComponentType<{
    page: Extract<CmsPage, { __typename: K }>;
  }>;
};

export const pageRegistry: PageRegistry = {
  AboutPage,
};

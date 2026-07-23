import type { Page } from '../Page/types';

type Image = {
  id: string;
  title: string;
  url: string;
  width: number;
  height: number;
};

export type PillarBlock = {
  id: string;
  blockType: 'PillarBlock';
  title: string;
  text: string;
  icon: string;
};

export type AboutPage = Page & {
  __typename: 'AboutPage';
  lead: string;
  purposeHeading: string;
  purposeBody: string;
  purposeImage: Image | null;
  pillars: PillarBlock[];
  supportHeading: string;
  supportBody: string;
  supportEmail: string;
};

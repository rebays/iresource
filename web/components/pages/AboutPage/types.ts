import type { Page } from '../Page/types';

type Image = {
  id: string;
  title: string;
  url: string;
  width: number;
  height: number;
};

type PillarBlock = {
  id: string;
  blockType: 'pillar';
  title: string;
  text: string;
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

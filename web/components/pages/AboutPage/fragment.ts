export const ABOUT_PAGE_FRAGMENT = /* GraphQL */ `
  fragment AboutPage on AboutPage {
    lead
    purposeHeading
    purposeBody
    purposeImage {
      id
      title
      url
      width
      height
    }
    pillars {
      id
      blockType
      ... on PillarBlock {
        title
        text
        icon
      }
    }
    supportHeading
    supportBody
    supportEmail
  }
`;

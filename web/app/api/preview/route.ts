import { NextResponse } from 'next/server';
import { draftMode } from 'next/headers';

const CMS_GRAPHQL_URL = process.env.CMS_GRAPHQL_URL;
if (!CMS_GRAPHQL_URL) throw new Error('CMS_GRAPHQL_URL is not set');

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const previewToken = searchParams.get('token');

    if(!previewToken){
        return new Response('Missing preview token', {status: 400});
    }

    const graphqlQuery = {
      query: `
        query GetPagePreview($token: String!) {
          page(token: $token) {
            id
            slug
            url
            urlPath
          }
        }
      `,
      variables: { token: previewToken }
    };

    const response = await fetch(CMS_GRAPHQL_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(graphqlQuery),
    });

    const { data, errors } = await response.json();

    if (errors || !data?.page) {
      console.error("GraphQL errors:", errors);
      return new Response('Invalid preview token or GraphQL error', { status: 401 });
    }

    (await draftMode()).enable();

    const targetUrl = data.page.url || `/${data.page.slug}`;
    const redirectUrl = new URL(targetUrl, request.url);

    redirectUrl.searchParams.set('token', previewToken);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Preview Route Failure:", error);
    return new Response('Internal Server Error inside Preview Route Handler', { status: 500 });
  }
  
}
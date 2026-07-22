import { NextResponse } from 'next/server';
import { draftMode } from 'next/headers';
import { cmsFetch } from '@/lib/cms';
import { GET_PAGE_META_BY_TOKEN } from '@/lib/queries';
import type { Page } from '@/components/pages/Page/types';

type PageMeta = Pick<Page, '__typename' | 'url' | 'contentType'>;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const previewToken = searchParams.get('token');

    if (!previewToken) {
      return new Response('Missing preview token', { status: 400 });
    }

    const data = await cmsFetch<{ page: PageMeta | null }>(GET_PAGE_META_BY_TOKEN, {
      token: previewToken,
    });

    if (!data.page) {
      return new Response('Invalid preview token', { status: 401 });
    }

    (await draftMode()).enable();

    if (!data.page.url) {
      return new Response('Preview page has no public URL', { status: 404 });
    }

    const redirectUrl = new URL(data.page.url, request.url);
    redirectUrl.searchParams.set('token', previewToken);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Preview Route Failure:', error);
    return new Response('Internal Server Error inside Preview Route Handler', { status: 500 });
  }
}
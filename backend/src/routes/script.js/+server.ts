import type { RequestHandler } from './$types';

export const GET = (async ({ url }) => {
	const code = url.searchParams.get('code');
	return new Response(decodeURIComponent(code ?? ''), {
		headers: {
			'content-type': 'application/javascript'
		}
	});
}) satisfies RequestHandler;

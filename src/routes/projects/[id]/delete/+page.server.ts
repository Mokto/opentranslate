import { prisma } from '$lib/server/prisma.js';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load = (async ({ params }) => {
	await prisma.project.delete({
		where: { id: params.id }
	});
	throw redirect(302, '/projects');
}) satisfies PageServerLoad;

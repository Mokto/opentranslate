import { prisma } from '$lib/server/prisma.js';
import type { PageServerLoad } from './$types.js';

export const load = (async ({ params }) => {
	const response = await prisma.project.findFirst({
		select: { id: true, name: true },
		where: { id: params.id }
	});

	return { project: response };
}) satisfies PageServerLoad;

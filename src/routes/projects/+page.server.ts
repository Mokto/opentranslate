import { prisma } from '$lib/server/prisma.js';
import type { PageServerLoad } from './$types.js';

export const load = (async () => {
	const response = await prisma.project.findMany({ select: { id: true, name: true } });

	return { projects: response };
}) satisfies PageServerLoad;

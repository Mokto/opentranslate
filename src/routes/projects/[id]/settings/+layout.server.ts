import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from '../$types';

export const load = (async ({ params }) => {
	const projectId = params.id;
	const response = await prisma.project.findFirst({
		where: { id: projectId },
		include: { storyblokProject: true }
	});
	return { project: response };
}) satisfies PageServerLoad;

import { prisma } from '$lib/server/prisma.js';
// import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

/** @type {import('./$types').Actions} */
export const actions = {
	// delete: async ({ params }) => {
	// 	const a = await prisma.project.delete({
	// 		where: { id: +params.id }
	// 	});
	// 	console.log(a);
	// 	throw redirect(301, '/projects');
	// }
};

export const load = (async ({ params }) => {
	const response = await prisma.project.findFirst({
		select: { id: true, name: true },
		where: { id: +params.id }
	});

	return { project: response };
}) satisfies PageServerLoad;

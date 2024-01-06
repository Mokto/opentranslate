import { prisma } from '$lib/server/prisma.js';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, params }) => {
		const projectId = params.id;
		const data = await request.formData();
		const language = data.get('language')?.toString();

		if (!language) {
			return error(400, 'Language is required');
		}

		const fromTos: { from: string; to: string }[] = [];
		while (data.has(`from${fromTos.length}`)) {
			const from: string | undefined = data.get(`from${fromTos.length}`)?.toString();
			const to: string | undefined = data.get(`to${fromTos.length}`)?.toString();
			if (from && to) {
				fromTos.push({ from, to });
			}
		}

		await prisma.$transaction([
			prisma.translationPair.deleteMany({
				where: { projectId: projectId, language: language }
			}),
			prisma.translationPair.createMany({
				data: fromTos.map((fromTo, index) => ({
					order: index,
					from: fromTo.from,
					to: fromTo.to,
					language: language,
					projectId: projectId
				}))
			})
		]);

		// await redirect(302, '/projects');
	}
};

export const load = (async ({ params }) => {
	const projectId = params.id;

	const translationPairs = await prisma.translationPair.findMany({
		select: {
			from: true,
			to: true
		},
		orderBy: { order: 'asc' },
		where: { projectId: projectId, language: params.language }
	});
	console.log('load', translationPairs);
	return { translationPairs };
}) satisfies PageServerLoad;

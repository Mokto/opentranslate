import { prisma } from '$lib/server/prisma.js';
// import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

// /** @type {import('./$types').Actions} */
// export const actions = {
// 	default: async ({ request, params }) => {
// 		const projectId = params.id;
// 		const data = await request.formData();
// 		const name = data.get('name');
// 		const storyblokToken = data.get('storyblokToken');
// 		const spaceId = data.get('spaceId');

// 		if (!projectId) {
// 			return error(400, { message: 'Missing projectId' });
// 		}

// 		if (!name?.toString() || !storyblokToken?.toString() || !spaceId?.toString()) {
// 			return error(400, { message: 'Missing name or storyblok token or spaceid' });
// 		}

// 		await prisma.project.update({
// 			where: { id: projectId },
// 			data: {
// 				name: name.toString(),
// 				description: data.get('description')?.toString(),
// 				openAIApiKey: data.get('openAIApiKey')?.toString(),
// 				defaultLanguage: data.get('defaultLanguage')?.toString(),
// 				translatedLanguages: data.get('translatedLanguages')?.toString().split(','),
// 				storyblokProject: {
// 					update: {
// 						storyblokToken: storyblokToken.toString(),
// 						spaceId: spaceId.toString()
// 					}
// 				}
// 			}
// 		});

// 		await redirect(302, '/projects');
// 	}
// };

export const load = (async ({ params }) => {
	const projectId = params.id;
	const response = await prisma.project.findFirst({
		where: { id: projectId },
		include: { storyblokProject: true }
	});
	return { project: response };
}) satisfies PageServerLoad;

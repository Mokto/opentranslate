import { prisma } from '$lib/server/prisma.js';
import { error, redirect } from '@sveltejs/kit';
// import type { PageServerLoad } from './$types.js';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const storyblokToken = data.get('storyblokToken');
		const spaceId = data.get('spaceId');

		if (!name?.toString() || !storyblokToken?.toString() || !spaceId?.toString()) {
			return error(400, { message: 'Missing name or storyblok token or spaceid' });
		}

		await prisma.project.create({
			data: {
				name: name.toString(),
				description: data.get('description')?.toString(),
				openAIApiKey: data.get('openAIApiKey')?.toString(),
				defaultLanguage: data.get('defaultLanguage')?.toString(),
				translatedLanguages: data.get('translatedLanguages')?.toString().split(','),
				storyblokProject: {
					create: {
						storyblokToken: storyblokToken.toString(),
						spaceId: spaceId.toString()
					}
				}
			}
		});

		await redirect(302, '/projects');
	}
};

import { prisma } from '$lib/server/prisma.js';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request }) => {
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
				storyblokProject: {
					create: {
						storyblokToken: storyblokToken.toString(),
						spaceId: spaceId.toString()
					}
				}
			}
		});

		await redirect(302, '/projects');
	},

	edit: async ({ url, request }) => {
		const projectId = url.searchParams.get('projectId');
		const data = await request.formData();
		const name = data.get('name');
		const storyblokToken = data.get('storyblokToken');
		const spaceId = data.get('spaceId');

		if (!projectId) {
			return error(400, { message: 'Missing projectId' });
		}

		if (!name?.toString() || !storyblokToken?.toString() || !spaceId?.toString()) {
			return error(400, { message: 'Missing name or storyblok token or spaceid' });
		}

		await prisma.project.update({
			where: { id: projectId },
			data: {
				name: name.toString(),
				description: data.get('description')?.toString(),
				openAIApiKey: data.get('openAIApiKey')?.toString(),
				storyblokProject: {
					update: {
						storyblokToken: storyblokToken.toString(),
						spaceId: spaceId.toString()
					}
				}
			}
		});

		await redirect(302, '/projects');
	}
};

export const load = (async ({ url }) => {
	const projectId = url.searchParams.get('projectId');
	const response = projectId
		? await prisma.project.findFirst({
				where: { id: projectId },
				include: { storyblokProject: true }
			})
		: null;
	return { project: response };
}) satisfies PageServerLoad;

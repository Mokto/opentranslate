import { prisma } from '$lib/server/prisma.js';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const storyblokToken = data.get('storyblokToken');
		console.log(name, storyblokToken);

		if (!name?.toString() || !storyblokToken?.toString()) {
			return error(400, { message: 'Missing name or storyblok token' });
		}

		await prisma.project.create({
			data: {
				name: name.toString(),
				storyblokToken: storyblokToken.toString()
			}
		});
	}
};

export const load = (async () => {
	const response = await prisma.project.findMany({ select: { id: true, name: true } });

	console.log(response);

	return { projects: response };
}) satisfies PageServerLoad;

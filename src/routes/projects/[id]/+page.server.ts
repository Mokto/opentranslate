import { prisma } from '$lib/server/prisma.js';
import {
	getStoryblokComponents,
	getStoryblokSpace,
	getStoryblokStories,
	getStoryblokStory,
	getStoryblokTranslatableFieldValues,
	type StoryblokAPIConfig
} from '$lib/server/storyblok.js';
import type { PageServerLoad } from './$types.js';

export const load = (async ({ params }) => {
	const project = await prisma.project.findFirst({
		where: { id: params.id },
		include: { storyblokProject: true }
	});

	if (!project?.storyblokProject?.storyblokToken) {
		return new Response('No storyblok token found', { status: 400 });
	}
	if (!project?.storyblokProject?.spaceId) {
		return new Response('No space ID found', { status: 400 });
	}

	const config: StoryblokAPIConfig = {
		token: project.storyblokProject.storyblokToken,
		spaceId: project.storyblokProject.spaceId
	};

	const space = await getStoryblokSpace(config);

	const resolve = async () => {
		const [components, stories] = await Promise.all([
			getStoryblokComponents(config),
			getStoryblokStories(config)
		]);

		const searchedStory = stories.find((s) => s.full_slug == 'home');
		const searchedStoryType = searchedStory?.content_type;
		if (!searchedStory?.id) {
			return new Response('No story found', { status: 400 });
		}
		if (!searchedStoryType) {
			return new Response('No story type found', { status: 400 });
		}

		const story = await getStoryblokStory(config, searchedStory.id);

		const translatableValues = getStoryblokTranslatableFieldValues(
			story,
			searchedStoryType,
			components,
			space
		);
		return translatableValues;
	};

	return {
		project,
		space,
		translatableValues: resolve()
	};
}) satisfies PageServerLoad;

import { prisma } from '$lib/server/prisma';
import {
	getStoryblokComponents,
	getStoryblokSpace,
	getStoryblokStories,
	getStoryblokStory,
	getStoryblokTranslatableFieldValues,
	type StoryblokAPIConfig
} from '$lib/server/storyblok.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const body = await request.json();
	const project = await prisma.project.findFirst({
		include: { storyblokProject: true },
		where: { id: body.projectId }
	});

	if (!project?.storyblokProject?.storyblokToken) {
		return new Response('No storyblok token found', { status: 400 });
	}
	if (!project?.storyblokProject?.spaceId) {
		return new Response('No space ID found', { status: 400 });
	}

	const config: StoryblokAPIConfig = {
		token: project?.storyblokProject?.storyblokToken,
		spaceId: project?.storyblokProject?.spaceId
	};

	const [space, components, stories] = await Promise.all([
		getStoryblokSpace(config),
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

	return new Response(JSON.stringify(translatableValues), {
		headers: { 'Content-Type': 'application/json' }
	});
}

import { isRichTextEmpty } from '@storyblok/js';

export type StoryblokAPIConfig = {
	token: string;
	spaceId: string;
};

type Story = {
	id: number;
	name: string;
	content_type?: string;
	full_slug: string;
	content: { [key: string]: any };
};

type Component = {
	id: number;
	name: string;
	schema: {
		[key: string]: Field;
	};
	real_name: string;
};

type Field = {
	type: 'text' | 'bloks' | string;
	translatable: boolean;
	key: string;
};

type Space = {
	languages: {
		code: string;
		name: string;
	}[];
};

export const getStoryblokStories = async (config: StoryblokAPIConfig): Promise<Story[]> => {
	let results: Story[] = [];
	let page = 1;
	for (;;) {
		const result = await fetch(
			`https://mapi.storyblok.com/v1/spaces/${config.spaceId}/stories?page=${page}`,
			{
				headers: {
					Authorization: config.token,
					'Content-Type': 'application/json'
				}
			}
		);

		const resultJson = await result.json();

		results = [...results, ...resultJson.stories];
		page++;
		if (resultJson.stories.length < 25) {
			break;
		}
	}

	return results;
};

export const getStoryblokComponents = async (
	config: StoryblokAPIConfig
): Promise<{ [real_name: string]: Component }> => {
	const result = await fetch(`https://mapi.storyblok.com/v1/spaces/${config.spaceId}/components`, {
		headers: {
			Authorization: config.token,
			'Content-Type': 'application/json'
		}
	});

	const resultJson = await result.json();
	const components: Component[] = resultJson.components;
	return Object.fromEntries(components.map((c) => [c.real_name, c]));
};

export const getStoryblokStory = async (
	config: StoryblokAPIConfig,
	storyId: number
): Promise<Story> => {
	const result = await fetch(
		`https://mapi.storyblok.com/v1/spaces/${config.spaceId}/stories/${storyId}`,
		{
			headers: {
				Authorization: config.token,
				'Content-Type': 'application/json'
			}
		}
	);

	const resultJson = await result.json();
	return resultJson.story;
};

export const getStoryblokSpace = async (config: StoryblokAPIConfig): Promise<Space> => {
	const result = await fetch(`https://mapi.storyblok.com/v1/spaces/${config.spaceId}`, {
		headers: {
			Authorization: config.token,
			'Content-Type': 'application/json'
		}
	});

	const resultJson = await result.json();
	return resultJson.space;
};

export const getStoryblokTranslatableFieldValues = (
	story: Story,
	storyType: string,
	components: { [real_name: string]: Component },
	space: Space,
	currentValue: any = {},
	prefix: string = ''
) => {
	Object.keys(components[storyType].schema).forEach((key) => {
		const field = components[storyType].schema[key];
		if (field.translatable) {
			if (story.content[key]) {
				if (field.type === 'richtext' && isRichTextEmpty(story.content[key])) {
					return;
				}
				currentValue[prefix + key] = {
					value: story.content[key],
					i18n: space.languages.reduce(
						(obj, item) => ({ ...obj, [item.code]: story.content[`${key}__i18n__${item.code}`] }),
						{}
					)
				};
			}
		} else if (field.type === 'bloks') {
			story.content[field.key || key].forEach((blok, index) => {
				getStoryblokTranslatableFieldValues(
					{ content: blok, id: 0, name: '', full_slug: '' },
					blok.component,
					components,
					space,
					currentValue,
					`${prefix}${field.key || key}.${index}.`
				);
			});
		}
	});
	return currentValue;
};

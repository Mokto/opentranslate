<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/button/button.svelte';
	import Input from '$components/input/input.svelte';
	import Textarea from '$components/input/textarea.svelte';
	import MultiSelect from '$components/select/multi-select.svelte';
	import Select from '$components/select/select.svelte';
	import Tabs from '$components/tabs/tabs.svelte';
	import { languagesOptions } from '$utils/languages';
	import type { Project, StoryblokProject } from '@prisma/client';

	export let project: (Project & { storyblokProject: StoryblokProject | null }) | null = null;
</script>

<form method="POST" use:enhance>
	<Input
		class="mb-4"
		label="Project name"
		placeholder="Project name"
		name="name"
		initialValue={project?.name || ''}
	/>
	<Textarea
		class="mb-4"
		label="Description"
		placeholder="Choose a description to help translating your project"
		name="description"
		initialValue={project?.description || ''}
	/>
	<Select
		class="mb-4"
		label="Default language"
		placeholder="Language"
		name="defaultLanguage"
		options={languagesOptions}
		initialValue={project?.defaultLanguage || ''}
		withSearch={true}
	/>
	<MultiSelect
		class="mb-4"
		label="Alternative languages"
		placeholder="Languages"
		name="translatedLanguages"
		options={languagesOptions}
		initialValue={project?.translatedLanguages || []}
		withSearch={true}
	/>
	<Input
		class="mb-4"
		label="Space ID"
		placeholder="Space ID"
		name="spaceId"
		initialValue={project?.storyblokProject?.spaceId}
	/>
	<Input
		class="mb-4"
		label="Storyblok token"
		placeholder="Storyblok token"
		name="storyblokToken"
		type="password"
		initialValue={project?.storyblokProject?.storyblokToken}
	/>
	<Input
		class="mb-4"
		label="OpenAI API key"
		placeholder="OpenAI API key"
		name="openAIApiKey"
		type="password"
		initialValue={project?.openAIApiKey || ''}
	/>
	<div class="mt-2">
		<Button theme="primary" size="lg" type="submit"
			>{project ? 'Edit the project' : 'Create a new project'}</Button
		>
		{#if project}
			<Button href={`/projects/${project?.id}/delete`} theme="secondary" size="lg">Delete</Button>
		{/if}
	</div>
</form>

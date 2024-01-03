<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import Input from '$components/input/input.svelte';
	import Button from '$components/button/button.svelte';
	import Textarea from '$components/input/textarea.svelte';
	import Select from '$components/select/select.svelte';
	import { languages } from '../../../utils/languages';
	import MultiSelect from '$components/select/multi-select.svelte';

	export let data: PageData;
</script>

<div class="container pt-12">
	<form method="POST" use:enhance>
		<div class="space-y-12">
			<div
				class="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3"
			>
				<div>
					<h2 class="text-base font-semibold leading-7 text-gray-900">
						{data.project ? `${data.project.name}` : 'Create a project'}
					</h2>
					<p class="mt-1 text-sm leading-6 text-gray-600">Edit your project</p>
				</div>

				<div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
					<div class="col-span-full">
						<Input
							class="mb-4"
							label="Project name"
							placeholder="Project name"
							name="name"
							initialValue={data.project?.name || ''}
						/>
						<Textarea
							class="mb-4"
							label="Description"
							placeholder="Choose a description to help translating your project"
							name="description"
							initialValue={data.project?.description || ''}
						/>
						<Select
							class="mb-4"
							label="Default language"
							placeholder="Language"
							name="defaultLanguage"
							options={languages}
							initialValue={data.project?.defaultLanguage || ''}
							withSearch={true}
						/>
						<MultiSelect
							class="mb-4"
							label="Alternative languages"
							placeholder="Languages"
							name="translatedLanguages"
							options={languages}
							initialValue={data.project?.translatedLanguages || []}
							withSearch={true}
						/>
						<Input
							class="mb-4"
							label="Space ID"
							placeholder="Space ID"
							name="spaceId"
							initialValue={data.project?.storyblokProject?.spaceId}
						/>
						<Input
							class="mb-4"
							label="Storyblok token"
							placeholder="Storyblok token"
							name="storyblokToken"
							type="password"
							initialValue={data.project?.storyblokProject?.storyblokToken}
						/>
						<Input
							class="mb-4"
							label="OpenAI API key"
							placeholder="OpenAI API key"
							name="openAIApiKey"
							type="password"
							initialValue={data.project?.openAIApiKey || ''}
						/>
						<div class="mt-2">
							<Button
								formaction={data.project ? `?/edit&projectId=${data.project?.id}` : '?/create'}
								theme="primary"
								size="lg"
								type="submit">{data.project ? 'Edit the project' : 'Create a new project'}</Button
							>
							{#if data.project}
								<Button href={`/projects/${data.project?.id}/delete`} theme="secondary" size="lg"
									>Delete</Button
								>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
</div>

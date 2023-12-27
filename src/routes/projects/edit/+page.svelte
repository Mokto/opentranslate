<script lang="ts">
	import { enhance } from '$app/forms';
	// import Input from '../../components/input/input.svelte';
	import type { PageData } from './$types';
	import Input from '$components/input/input.svelte';
	import Button from '$components/button/button.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	console.log(data.project?.storyblokProject?.spaceId);
</script>

<!-- <div class="bg-slate-400 p-4 rounded m-4"> -->
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
						<div class="mt-2">
							<Button
								formaction={data.project ? `?/edit&projectId=${data.project?.id}` : '?/create'}
								theme="primary"
								size="lg"
								type="submit">{data.project ? 'Edit the project' : 'Create a new project'}</Button
							>
							{#if data.project}
								<Button
									onClick={() => {
										fetch(`/projects/${data.project?.id}`, { method: 'DELETE' });
										goto(`/projects`);
									}}
									type="button"
									theme="secondary"
									size="lg">Delete</Button
								>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
</div>

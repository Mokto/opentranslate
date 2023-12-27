<script lang="ts">
	import { enhance } from '$app/forms';
	// import Input from '../../components/input/input.svelte';
	import type { PageData } from './$types';
	import Input from '$components/input/input.svelte';
	import Button from '$components/button/button.svelte';

	export let data: PageData;
</script>

<div class="container pt-6">
	<Button theme="secondary" size="xl" href="/projects/edit">Add a new project</Button>

	{#if data.projects?.length > 0}
		<ul role="list" class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.projects as project}
				<li class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
					<div class="flex w-full items-center justify-between space-x-6 p-6">
						<div class="flex-1 truncate">
							<div class="flex items-center space-x-3">
								<h3 class="truncate text-sm font-medium text-gray-900">{project.name}</h3>
								<span
									class="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
									>Storyblok</span
								>
							</div>
							<!-- <p class="mt-1 truncate text-sm text-gray-500">Subtitle</p> -->
						</div>
					</div>
					<div>
						<div class="-mt-px flex divide-x divide-gray-200">
							<div class="flex w-0 flex-1">
								<a
									href="/projects/{project.id}"
									class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
								>
									Access
								</a>
							</div>
							<div class="flex w-0 flex-1 -ml-px">
								<a
									href={`/projects/edit?projectId=${project.id}`}
									class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
								>
									Edit
								</a>
							</div>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>

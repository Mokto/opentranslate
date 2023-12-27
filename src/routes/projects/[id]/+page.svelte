<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$components/button/button.svelte';
	import StoryblokRichText from '$components/storyblok-rich-text/storyblok-rich-text.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let allData: any;
</script>

<div class="p-4 rounded m-4">
	{#if data.project}
		<h1 class="text-2xl mb-8">{data.project?.name}</h1>
		<Button
			theme="primary"
			size="md"
			onClick={async () => {
				const response = await fetch(`/integrations/storyblok/run`, {
					method: 'POST',
					body: JSON.stringify({ projectId: data.project?.id }),
					headers: {
						'Content-Type': 'application/json'
					}
				});
				allData = await response.json();
			}}>Run</Button
		>
	{:else}
		Not found
	{/if}

	{#if allData}
		<table>
			<thead>
				<tr>
					<td></td>
					<td>Default</td>
					<td>German</td>
				</tr>
			</thead>
			{#each Object.entries(allData) as [key, value]}
				<tr class="even:bg-gray-200 odd:bg-white">
					<td>{key}</td>
					<td><StoryblokRichText value={value.value} /></td>
					<td><StoryblokRichText value={value.i18n.de} /></td>
				</tr>
			{/each}
		</table>
	{/if}
</div>

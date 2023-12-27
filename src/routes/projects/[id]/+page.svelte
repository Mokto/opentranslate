<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$components/button/button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="bg-slate-400 p-4 rounded m-4">
	{#if data.project}
		<h1 class="text-2xl mb-8">{data.project?.name}</h1>
		<Button
			onClick={() => {
				fetch(`/projects/${data.project?.id}`, { method: 'DELETE' });
				goto(`/projects`);
			}}>Delete</Button
		>
	{:else}
		Not found
	{/if}
</div>

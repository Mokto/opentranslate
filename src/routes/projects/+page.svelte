<script lang="ts">
	import { enhance } from '$app/forms';
	// import Input from '../../components/input/input.svelte';
	import type { PageData } from './$types';
	import Input from '$components/input/input.svelte';
	import Button from '$components/button/button.svelte';

	export let data: PageData;
</script>

{#if data.projects?.length > 0}
	<div class="bg-slate-400 p-4 rounded m-4">
		<h1 class="text-2xl">Projects</h1>
		<ul>
			{#each data.projects as project}
				<li><a href="/projects/{project.id}">{project.name}</a></li>
			{/each}
		</ul>
	</div>
{/if}

<hr />

<div class="bg-slate-400 p-4 rounded m-4">
	<form method="POST" use:enhance>
		<Input label="Project name" placeholder="Project name" name="name" />
		<Input label="Storyblok token" placeholder="Storyblok token" name="storyblokToken" />
		<Button type="submit">Create a new project</Button>
	</form>
</div>

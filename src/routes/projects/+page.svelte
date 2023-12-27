<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Projects</h1>
{#if data.projects?.length > 0}
	<ul>
		{#each data.projects as project}
			<li><a href="/projects/{project.id}">{project.name}</a></li>
		{/each}
	</ul>
{/if}

<hr />

<form method="POST">
	<label>
		Project name
		<input name="name" value="Test project" />
	</label>
	<label>
		Storyblok token
		<input name="storyblokToken" type="password" />
	</label>
	<button type="submit">Create a new project</button>
</form>

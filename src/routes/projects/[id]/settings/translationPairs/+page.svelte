<script lang="ts">
	import Select from '$components/select/select.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let language = '';
	if (data.project?.translatedLanguages?.length) {
		language = data.project.translatedLanguages[0];
	}
</script>

{#if data.project?.translatedLanguages}
	<Select
		name="language"
		label="Language"
		placeholder="Choose the language to edit"
		initialValue={language}
		options={data.project?.translatedLanguages.map((l) => ({
			label: l,
			value: l
		}))}
	/>
{:else}
	<p class="text-center">No languages available</p>
{/if}

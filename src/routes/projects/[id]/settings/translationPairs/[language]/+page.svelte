<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$components/button/button.svelte';
	import Input from '$components/input/input.svelte';
	import Select from '$components/select/select.svelte';
	import { getLanguageLabel } from '$utils/languages';
	import type { PageData } from './$types';

	export let data: PageData;
	// console.log(data);
	// $: data = data;

	$: translationPairs = data.translationPairs;
	// console.log('coucou', translationPairs);
	// let { translationPairs } = data;

	const addEmptyPair = () => {
		translationPairs.push({ from: '', to: '' });
		translationPairs = translationPairs;
	};
	// if (translationPairs?.length === 0) {
	// 	addEmptyPair();
	// }

	// $: language = $page.params.language;
	// console.log('render', translationPairs);
</script>

<form method="POST">
	{#if data.project?.translatedLanguages}
		<Select
			name="language"
			label="Language"
			placeholder="Choose the language to edit"
			initialValue={$page.params.language}
			onChange={(value) => {
				goto(`/projects/${data.project?.id}/settings/translationPairs/${value}`);
			}}
			options={data.project?.translatedLanguages.map((l) => ({
				label: getLanguageLabel(l) || l,
				value: l
			}))}
		/>
	{:else}
		<p class="text-center">No languages available</p>
	{/if}

	<hr class="my-4" />

	{#if translationPairs?.length}
		<table class="w-full">
			<thead>
				<tr>
					<td>From</td>
					<td>To</td>
				</tr>
			</thead>
			<tbody>
				{#each translationPairs as { from, to }, i}
					<tr>
						<td class="w-1/2">
							<Input
								name={`from${i}`}
								initialValue={from}
								placeholder="Word or sentence in the original language"
							/>
						</td>
						<td class="w-1/2">
							<Input
								name={`to${i}`}
								initialValue={to}
								placeholder="Word or sentence in the target language"
							/>
						</td>
					</tr>

					<!-- <div class="grid grid-cols-2 gap-4">
		<Input label="From" />
	</div> -->
				{/each}
			</tbody>
		</table>
	{/if}
	<div class="mt-4">
		<Button onClick={addEmptyPair} size="md" theme="secondary">Add more</Button>

		<Button type="submit" size="md" theme="primary">Save</Button>
	</div>
</form>

<script lang="ts">
	import Button from '$components/button/button.svelte';
	import StoryblokRichText from '$components/storyblok-rich-text/storyblok-rich-text.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="p-4 rounded m-4">
	{#await data?.translatableValues}
		Loading...
	{:then translatableValues}
		{#if translatableValues}
			<div class="mt-8 flow-root">
				<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table class="min-w-full divide-y divide-gray-300">
							<thead>
								<tr>
									<td></td>
									<td>Default</td>
									{#if data.space?.languages}
										{#each data.space?.languages as language}
											<td>{language.name}</td>
										{/each}
									{/if}
									<td></td>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200">
								{#each Object.entries(translatableValues) as [key, value]}
									<tr>
										<td class=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{key}</td>
										<td class=" px-3 py-4 text-sm text-gray-500"
											><StoryblokRichText value={value.value} /></td
										>
										{#if data.space?.languages}
											{#each data.space?.languages as language}
												<td class=" px-3 py-4 text-sm text-gray-500"
													><StoryblokRichText value={value.i18n?.[language.code]} /></td
												>
											{/each}
										{/if}
										<td
											class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
										>
											<Button
												onClick={() => {
													fetch('/api/translate', {
														method: 'POST',
														headers: {
															'Content-Type': 'application/json'
														},
														body: JSON.stringify({
															projectId: data.project?.id,
															languageCodes: data.space?.languages?.map(
																(language) => language.code
															),
															key,
															value: value.value
														})
													});
												}}
												size="xs"
												theme="secondary">Trigger</Button
											>
										</td>
									</tr>
								{/each}d
							</tbody>
						</table>
					</div>
				</div>
			</div>
		{/if}
	{:catch error}
		<p>error loading: {error.message}</p>
	{/await}
</div>

<script lang="ts">
	export let name: string;
	export let label: string | undefined = undefined;
	export let placeholder: string;
	export let type: string | undefined = 'text';
	export let initialValue: string | undefined = '';
	export let onInput: ((e: Event) => void) | undefined = undefined;
	export let onFocus: (() => void) | undefined = undefined;
	export let onBlur: (() => void) | undefined = undefined;
</script>

<div>
	{#if label}
		<label class="mb-2 block text-sm font-medium text-grey500" for={name}>
			{label}
		</label>
	{/if}
	<input
		class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
		{name}
		{type}
		{placeholder}
		value={initialValue}
		on:input={onInput}
		on:blur={onBlur}
		on:focus={onFocus}
	/>
</div>

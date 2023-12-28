<script lang="ts">
	export let name: string;
	export let label: string | undefined = undefined;
	export let placeholder: string;
	export let initialValue: string | undefined = '';
	export let onInput: ((e: Event) => void) | undefined = undefined;
	export let onFocus: (() => void) | undefined = undefined;
	export let onBlur: (() => void) | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };
</script>

<div>
	{#if label}
		<label class="block text-sm font-medium leading-6 text-gray-900" for={name}>
			{label}
		</label>
	{/if}
	<div class="mt-2">
		<textarea
			class={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
				className || ''
			}`}
			rows="4"
			{name}
			id={name}
			{placeholder}
			value={initialValue}
			on:input={onInput}
			on:blur={onBlur}
			on:focus={onFocus}
		/>
	</div>
</div>

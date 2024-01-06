<script lang="ts">
	export let href: string | undefined = undefined;
	export let onClick: (() => void) | undefined = undefined;
	export let type: 'submit' | 'button' = 'button';
	export let id: string | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };
	export let disabled: boolean = false;
	export let theme: 'primary' | 'secondary';
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	export let formaction: string | undefined = undefined;

	const themeClassName =
		theme == 'primary'
			? `bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600`
			: 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50';

	let sizeClassName = '';
	if (size === 'xs') {
		sizeClassName = 'rounded px-2 py-1 text-xs font-semibold';
	} else if (size === 'sm') {
		sizeClassName = 'rounded px-2 py-1 text-sm font-semibold';
	} else if (size === 'md') {
		sizeClassName = 'rounded-md px-2.5 py-1.5 text-sm font-semibold';
	} else if (size === 'lg') {
		sizeClassName = 'rounded-md px-3 py-2 text-sm font-semibold';
	} else if (size === 'xl') {
		sizeClassName = 'rounded-md px-3.5 py-2.5 text-sm font-semibold';
	}

	const elementClassName = `shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${themeClassName} ${sizeClassName} ${className}`;
</script>

{#if type || onClick}
	<button {formaction} class={elementClassName} {id} {type} on:click={onClick} {disabled}>
		<slot />
	</button>
{:else}
	<a class={elementClassName} {href} {id}>
		<slot />
	</a>
{/if}

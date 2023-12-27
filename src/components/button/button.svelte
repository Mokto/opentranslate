<script lang="ts">
	export let href: string | undefined = undefined;
	export let onClick: (() => void) | undefined = undefined;
	export let type: 'submit' | 'button' | undefined = undefined;
	export let id: string | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };
	export let disabled: boolean = false;

	const elementClassName = `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`;
</script>

{#if type || onClick}
	<button class={elementClassName} {id} {type} on:click={onClick} {disabled}>
		<slot />
	</button>
{:else}
	<a class={elementClassName} {href} {id}>
		<slot />
	</a>
{/if}

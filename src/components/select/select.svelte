<script lang="ts">
	import { clickOutside } from '../../utils/clickOutside';

	export let name: string;
	export let label: string | undefined = undefined;
	export let placeholder: string;
	export let options: { label: string; value: string }[];
	export let initialValue: string | undefined = '';
	export let withSearch: boolean = false;
	export let onChange: ((value: string) => void) | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };

	let value = initialValue;
	let isOpen = false;

	let searchInput: HTMLElement;

	$: isOpen, isOpen && searchInput?.focus();
	let showedOptions = [...options];

	const onInputSearch = (event: Event) => {
		const target = event.target as HTMLInputElement;
		showedOptions = options.filter(
			(o) =>
				o.label.toLowerCase().includes(target?.value.toLowerCase()) ||
				o.value.toLowerCase().includes(target?.value.toLowerCase())
		);
	};
</script>

<div class={className} use:clickOutside on:clickOutside={() => (isOpen = false)}>
	<input type="hidden" {name} id={name} {value} />
	<label for={name} id={`label-${name}`} class="block text-sm font-medium leading-6 text-gray-900"
		>{label}</label
	>
	<div class="relative mt-2">
		<button
			type="button"
			class="relative w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
			aria-haspopup="listbox"
			aria-expanded="true"
			aria-labelledby="listbox-label"
			on:click={() => {
				isOpen = !isOpen;
			}}
		>
			<span class={`block truncate ${!value ? 'text-gray-400' : ''}`}
				>{options.find((o) => o.value === value)?.label || placeholder}</span
			>
			<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
				<svg
					class="h-5 w-5 text-gray-400"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		</button>

		<!--
        Select popover, show/hide based on select state.
  
        Entering: ""
          From: ""
          To: ""
        Leaving: "transition ease-in duration-100"
          From: "opacity-100"
          To: "opacity-0"
      -->
		{#if isOpen}
			<ul
				class={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
				tabindex="-1"
				role="listbox"
				aria-labelledby="listbox-label"
				aria-activedescendant="listbox-option-3"
			>
				{#if withSearch}
					<li class="px-2 pb-2">
						<input
							bind:this={searchInput}
							on:input={onInputSearch}
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</li>
				{/if}
				{#each showedOptions as option}
					<li
						class="group text-gray-900 relative cursor-pointer select-none py-2 pl-8 pr-4 hover:bg-indigo-600 hover:text-white"
						role="option"
						aria-selected={value === option.value}
						on:keypress={() => {
							value = option.value;
							isOpen = false;
							if (onChange) {
								onChange(value);
							}
						}}
						on:click={() => {
							value = option.value;
							isOpen = false;
							if (onChange) {
								onChange(value);
							}
						}}
					>
						<span
							class={`${value === option.value ? 'font-semibold' : 'font-normal'} block truncate`}
							>{option.label}</span
						>

						{#if value === option.value}
							<span
								class="text-indigo-600 absolute inset-y-0 left-0 flex items-center pl-1.5 group-hover:text-white"
							>
								<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
									<path
										fill-rule="evenodd"
										d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
										clip-rule="evenodd"
									/>
								</svg>
							</span>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

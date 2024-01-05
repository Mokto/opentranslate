<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let tabs: { name: string; href: string }[];

	const navigate = (e: Event) => {
		const target = e.target as HTMLSelectElement;
		// $page.url.searchParams.set('tab', target.value);
		goto(target.value);
	};

	console.log($page.url);
	// $: currentTab = $page.url.pathname.get('tab') || '';
</script>

<div class="mb-4">
	<div class="sm:hidden">
		<label for="tabs" class="sr-only">Select a tab</label>
		<select
			id="tabs"
			name="tabs"
			class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
			on:change={navigate}
		>
			{#each tabs as tab}
				<option selected={$page.url.pathname === tab.href} value={tab.href}>{tab.name}</option>
			{/each}
		</select>
	</div>
	<div class="hidden sm:block">
		<div class="border-b border-gray-200">
			<nav class="-mb-px flex" aria-label="Tabs">
				{#each tabs as tab}
					<a
						href={tab.href}
						class={`${
							$page.url.pathname === tab.href
								? 'border-indigo-500 text-indigo-600'
								: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
						} border-b-2 py-4 px-1 text-center text-sm font-medium`}
						style={`width: calc(100% / ${tabs.length})`}
						aria-current={$page.url.pathname === tab.href ? 'page' : undefined}>{tab.name}</a
					>
				{/each}
			</nav>
		</div>
	</div>
</div>

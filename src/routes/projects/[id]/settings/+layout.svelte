<script lang="ts">
	import { enhance } from '$app/forms';
	import Tabs from '$components/tabs/tabs.svelte';
	import TwoColumnsFormLayout from '$components/two-columns-form-layout/two-columns-form-layout.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<TwoColumnsFormLayout title={data.project?.name || ''} description="Edit your project">
	<Tabs
		tabs={[
			{ name: 'Settings', href: `/projects/${data.project?.id}/settings` },
			{
				name: 'Translation pairs',
				href: `/projects/${data.project?.id}/settings/translationPairs/${data.project?.translatedLanguages?.[0]}`,
				activeStartsWith: `/projects/${data.project?.id}/settings/translationPairs`
			}
		]}
	/>
	<slot />
</TwoColumnsFormLayout>

<script lang="ts">
	import Settings from '../../components/settings-form.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Settings project={data.project} />

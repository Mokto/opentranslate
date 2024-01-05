<script lang="ts">
	import TwoColumnsFormLayout from '$components/two-columns-form-layout/two-columns-form-layout.svelte';
	import Settings from '../components/settings-form.svelte';
</script>

<TwoColumnsFormLayout
	title="Create a new project"
	description="Create a new project to start translations"
>
	<Settings />
</TwoColumnsFormLayout>

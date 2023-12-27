<script lang="ts">
	import { storyblokInit, type ISbRichtext, renderRichText } from '@storyblok/js';
	storyblokInit({});
	export let value: string | ISbRichtext;
	$: HTML = typeof value == 'string' ? value : renderRichText(value);
</script>

{@html HTML}

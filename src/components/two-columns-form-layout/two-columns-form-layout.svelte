<script lang="ts">
	import { enhance } from '$app/forms';

	export let title: string;
	export let description: string;
</script>

<div class="container pt-12">
	<div class="space-y-12">
		<div class="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
			<div>
				<h2 class="text-base font-semibold leading-7 text-gray-900">
					{title}
				</h2>
				<p class="mt-1 text-sm leading-6 text-gray-600">{description}</p>
			</div>

			<div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
				<div class="col-span-full">
					<slot />
				</div>
			</div>
		</div>
	</div>
</div>

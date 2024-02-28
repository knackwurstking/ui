<script>
	import Primary from './Primary.svelte';
	import Secondary from './Secondary.svelte';

	export let primary = '';
	export let secondary = '';
	export let useLabel = false;
	export let row = false;
</script>

{#if useLabel}
	<label {...$$restProps} class={'ui-text-label ' + ($$restProps.class || '')} class:row>
		<span class="no-user-select">
			{#if !!primary}
				<Primary>
					<span>{primary}</span>
					<slot name="primary" />
				</Primary>
			{/if}

			{#if !!secondary || !!$$slots.secondary}
				<Secondary>
					<span>{secondary}</span>
					<slot name="secondary" />
				</Secondary>
			{/if}
		</span>

		<span><slot /></span>
	</label>
{:else}
	<span {...$$restProps} class={'ui-text-label ' + ($$restProps.class || '')} class:row>
		<span class="no-user-select">
			{#if !!primary}
				<Primary>
					<span>{primary}</span>
					<slot name="primary" />
				</Primary>
			{/if}

			{#if !!secondary || !!$$slots.secondary}
				<Secondary>
					<span>{secondary}</span>
					<slot name="secondary" />
				</Secondary>
			{/if}
		</span>

		<span><slot /></span>
	</span>
{/if}

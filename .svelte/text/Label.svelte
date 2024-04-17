<script>
	import { Ripple } from "../../js";
	import Primary from "./Primary.svelte";
	import Secondary from "./Secondary.svelte";

	export let primary = "";
	export let secondary = "";
	export let useLabel = false;

	export let useRipple = false;
	$: (!!useRipple && (ripple = Ripple.Root)) || (ripple = () => null);

	let ripple;
</script>

{#if useLabel}
	<label
		{...$$restProps}
		class={"ui-text-label " + ($$restProps.class || "")}
		use:ripple
	>
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
	<span
		{...$$restProps}
		class={"ui-text-label " + ($$restProps.class || "")}
		use:ripple
	>
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

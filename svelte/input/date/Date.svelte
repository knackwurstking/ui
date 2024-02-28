<script>
	// TODO: move styles to css

	/******************************
	 * Variable Export Definitions
	 ******************************/

	export let title = '';
	export let value = '';

	/** @type {string} */
	export let min = undefined;
	/** @type {string} */
	export let max = undefined;

	export let invalid = false;

	/***********************
	 * Variable Definitions
	 ***********************/

	let focus = false;
</script>

<div
	{...$$restProps}
	class={'ui-input-date ' + ($$restProps.class || '')}
	class:focus
	class:invalid
>
	{#if !!title}
		<span class="title">{title}</span>
	{/if}
	<input
		type="date"
		{min}
		{max}
		bind:value
		on:change
		on:input
		on:focus={() => (focus = true)}
		on:blur={() => (focus = false)}
	/>
</div>

<style>
	.ui-input-date {
		width: 100%;

		border-bottom: var(--border-width) var(--border-style) hsl(var(--border));

		transition: border-color 0.25s linear;
	}

	.ui-input-date.focus {
		border-color: hsl(var(--primary));
	}

	.ui-input-date.invalid {
		border-color: hsl(var(--destructive));
	}

	.ui-input-date .title {
		font-size: 0.85em;
		font-weight: 300;
		font-style: italic;
		padding-left: var(--spacing);
		padding-right: var(--spacing);
	}

	input {
		width: 100%;

		margin: 0;
		padding-top: calc(var(--spacing) / 1.5);

		border: none;
		outline-offset: 0 !important;
		outline: none !important;
	}
</style>

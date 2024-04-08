<script>
	// TODO: move styles to css

	/******************************
	 * Variable Export Definitions
	 ******************************/

	export let title = "";
	export let value = "";

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
	class={"ui-input ui-input-month " + ($$restProps.class || "")}
	class:focus
	class:invalid
>
	{#if !!title}
		<span class="ui-input-title">{title}</span>
	{/if}
	<input
		type="month"
		{min}
		{max}
		bind:value
		on:change
		on:input
		on:focus={() => (focus = true)}
		on:blur={() => (focus = false)}
	/>
</div>

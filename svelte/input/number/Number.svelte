<script>
	/******************************
	 * Variable Export Definitions
	 ******************************/

	export let title = "";
	export let placeholder = "";

	/** @type {number} */
	export let min = undefined;
	/** @type {number} */
	export let max = undefined;

	/** @type {number} */
	export let value = undefined;

	export let invalid = false;
</script>

<div
	{...$$restProps}
	class={"ui-input ui-input-number " + ($$restProps.class || "")}
	class:invalid
>
	{#if !!title}
		<span class="ui-input-title">{title}</span>
	{/if}
	<input
		type="number"
		{placeholder}
		{min}
		{max}
		bind:value
		on:change
		on:input
	/>
</div>

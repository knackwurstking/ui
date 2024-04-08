<script>
	/******************************
	 * Variable Export Definitions
	 ******************************/

	export let title = '';
	export let placeholder = '';
	export let value = '';
	export let invalid = false;
</script>

<div {...$$restProps} class={'ui-input ui-input-text ' + ($$restProps.class || '')} class:invalid>
	{#if !!title}
		<span class="ui-input-title">{title}</span>
	{/if}
	<input bind:value {placeholder} on:change on:input />
</div>

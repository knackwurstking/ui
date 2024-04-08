<script>
	import { createEventDispatcher } from "svelte";

	import TextSearch from "svelte-material-icons/TextSearch.svelte";

	import { Button } from "../..";

	/**
	 * @type {HTMLInputElement}
	 */
	let input;
	/**
	 * @type {Button.Icon}
	 */
	let submit;

	/******************************
	 * Variable Export Definitions
	 ******************************/

	export let title = "";
	export let placeholder = "";
	export let value = "";
	export let invalid = false;
	export let disableSubmit = false;

	/***********************
	 * Variable Definitions
	 ***********************/

	const dispatch = createEventDispatcher();

	let focus = false;
</script>

<div
	{...$$restProps}
	class={"ui-input ui-input-search " + ($$restProps.class || "")}
	class:focus
	class:invalid
	class:ui-input-search-no-submit={disableSubmit}
>
	{#if !!title}
		<span class="ui-input-title">{title}</span>
	{/if}

	<input
		bind:this={input}
		bind:value
		type="search"
		{placeholder}
		on:change={() => dispatch("change", value)}
		on:input={() => dispatch("input", value)}
		on:keyup={(ev) => {
			if (ev.key === "Enter") {
				if (submit) submit.click();
			}
		}}
		on:focus={() => (focus = true)}
		on:blur={() => (focus = false)}
	/>

	{#if !disableSubmit}
		<Button.Icon
			bind:this={submit}
			class="ui-input-search-submit"
			ghost
			on:click={() => {
				dispatch("submit", value);
				input.blur();
			}}
		>
			<TextSearch />
		</Button.Icon>
	{/if}
</div>

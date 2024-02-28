<script>
	// TODO: move styles to css

	import { createEventDispatcher } from 'svelte';

	import TextSearch from 'svelte-material-icons/TextSearch.svelte';

	import { Button } from '../..';

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

	export let title = '';
	export let placeholder = '';
	export let value = '';
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
	class={'ui-input-search ' + ($$restProps.class || '')}
	class:focus
	class:invalid
	class:no-submit={disableSubmit}
>
	{#if !!title}
		<span class="title ui-text-secondary">{title}</span>
	{/if}

	<input
		bind:this={input}
		bind:value
		type="search"
		{placeholder}
		on:change={() => dispatch('change', value)}
		on:input={() => dispatch('input', value)}
		on:keyup={(ev) => {
			if (ev.key === 'Enter') {
				if (submit) submit.click();
			}
		}}
		on:focus={() => (focus = true)}
		on:blur={() => (focus = false)}
	/>

	{#if !disableSubmit}
		<Button.Icon
			bind:this={submit}
			style={'position: absolute;' +
				'height: 100%;' +
				'bottom: 0;' +
				'right: 0;' +
				'padding: .25em;' +
				'border-top-left-radius: 0;' +
				'border-bottom-left-radius: 0;'}
			ghost
			on:click={() => {
				dispatch('submit', value);
				input.blur();
			}}
		>
			<TextSearch />
		</Button.Icon>
	{/if}
</div>

<style>
	.ui-input-search {
		position: relative;
		width: 100%;

		border: var(--border-width) var(--border-style) hsl(var(--border));
		border-radius: var(--radius);

		transition: border-color 0.25s linear;
	}

	.ui-input-search.focus {
		border-color: hsl(var(--primary));
	}

	.ui-input-search.invalid {
		border-color: hsl(var(--destructive));
	}

	.ui-input-search .title {
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

	.ui-input-search:not(.no-submit) input {
		padding-right: calc(2.5em + var(--spacing));
	}
</style>

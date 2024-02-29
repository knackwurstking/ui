<script>
	// TODO: move styles to css

	import { createEventDispatcher } from "svelte";

	/**
	 * @typedef SelectItem
	 * @type {import(".").SelectItem}
	 */

	/******************************
	 * Variable Export Definitions
	 ******************************/

	/** @type {SelectItem[]} */
	export let items = [];

	/** @type {SelectItem | null} */
	export let selected = null;

	/***********************
	 * Variable Definitions
	 ***********************/

	const dispatch = createEventDispatcher();
</script>

<select
	{...$$restProps}
	class={"ui-input-html-select " + ($$restProps.class || "")}
	value={selected?.value || undefined}
	on:change={(ev) => {
		selected =
			items.find((i) => i.value === ev.currentTarget.value) || null;
		dispatch("change", selected);
	}}
>
	{#each items as item}
		<option value={item.value}>{item.label}</option>
	{/each}
</select>

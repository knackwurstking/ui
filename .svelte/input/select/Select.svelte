<script>
	import { createEventDispatcher } from "svelte";

	import ChevronDown from "svelte-material-icons/ChevronDown.svelte";

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

	export let alwaysOpen = false;

	/***********************
	 * Variable Definitions
	 ***********************/

	const dispatch = createEventDispatcher();

	let open = alwaysOpen;

	/******************************
	 * Function Export Definitions
	 ******************************/

	export async function expand() {
		open = true;
	}

	export async function collapse() {
		open = false;
	}

	/***********************
	 * Function Definitions
	 ***********************/

	async function clickSelect() {
		open = !open;
	}

	/**
	 * @param {SelectItem} item
	 */
	async function clickOption(item) {
		selected = item;
		dispatch("change", item);
	}
</script>

<div
	{...$$restProps}
	class={"ui-input ui-input-select " + ($$restProps.class || "")}
	class:open
	style:height={open
		? `calc((1em * var(--line-height) + (var(--spacing) * 2)) * ${items.length})`
		: "calc(1em * var(--line-height) + (var(--spacing) * 2))"}
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="ui-input-select-options"
		on:click={!alwaysOpen ? () => clickSelect() : undefined}
	>
		<div class="ui-input-select-icon">
			<ChevronDown height="100%" width="100%" />
		</div>

		{#each items as item}
			<div
				class="ui-input-select-option no-user-select"
				class:selected={item.value === selected?.value}
				on:click={() => clickOption(item)}
			>
				<span>
					{item.label}
				</span>
			</div>
		{/each}
	</div>
</div>

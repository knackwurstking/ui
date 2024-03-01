<script>
	/**
	 * @type {string|undefined|null}
	 */
	export let gap = undefined;

	export let flex = "1";
</script>

<div
	{...$$restProps}
	class={"ui-grid-col " + ($$restProps.class || "")}
	style:flex
	style={(!!gap ? `--gap: ${gap};` : "") + ($$restProps.style || "")}
>
	<slot />
</div>

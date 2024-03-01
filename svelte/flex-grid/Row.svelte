<script>
	/**
	 * @type {string|undefined|null}
	 */
	export let gap = undefined;
</script>

<div
	{...$$restProps}
	class={"ui-grid-row " + ($$restProps.class || "")}
	style={(!!gap ? `--gap: ${gap};` : "") + ($$restProps.style || "")}
>
	<slot />
</div>

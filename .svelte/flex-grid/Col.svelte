<script>
	export let flex = "1";
</script>

<div
	{...$$restProps}
	class={"ui-grid-col " + ($$restProps.class || "")}
	style:flex
>
	<slot />
</div>

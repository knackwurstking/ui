<script>
	export let backgroundColor = "hsl(var(--card))";
	export let color = "hsl(var(--card-fg))";
	export let noBorder = false;
</script>

<article
	{...$$restProps}
	class={"ui-card " + ($$restProps.class || "")}
	style:background-color={backgroundColor}
	style:color
	style:border={noBorder
		? "none"
		: "var(--border-width) var(--border-style) hsl(var(--border))"}
>
	<slot />
</article>

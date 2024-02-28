<script>
	export let gap = '0';
</script>

<div
	{...$$restProps}
	class={'ui-grid ' + ($$restProps.class || '')}
	style={`--gap: ${gap};` + ($$restProps.style || '')}
>
	<slot />
</div>

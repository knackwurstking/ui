<script>
	export let open = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	{...$$restProps}
	class={'ui-drawer ' + ($$restProps.class || '')}
	class:open
	on:click={(ev) => {
		ev.stopPropagation();
		open = false;
	}}
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<aside on:click={(ev) => ev.stopPropagation()}>
		<slot />
	</aside>
</div>

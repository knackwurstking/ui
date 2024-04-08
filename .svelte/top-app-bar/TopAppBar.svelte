<script>
	export let height = '3em';
	export let uiContainer = false;
</script>

<header
	{...$$restProps}
	class={'ui-app-bar ui-app-bar-top ' + ($$restProps.class || '')}
	style:height
>
	<div class={'ui-app-bar-main ' + (uiContainer ? 'ui-container' : '')}>
		<div class="ui-app-bar-left">
			<slot name="left" />
		</div>

		<div class="ui-app-bar-center">
			<slot name="center" />
		</div>

		<div class="ui-app-bar-right">
			<slot name="right" />
		</div>
	</div>
</header>

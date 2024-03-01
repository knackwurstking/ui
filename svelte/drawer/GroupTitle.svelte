<script>
	import { GroupItem } from ".";
</script>

<GroupItem>
	<h3
		{...$$restProps}
		class={"ui-drawer-group-title " + ($$restProps.class || "")}
	>
		<slot />
	</h3>
</GroupItem>

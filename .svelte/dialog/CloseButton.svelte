<script>
	import { createEventDispatcher } from 'svelte';

	import Close from 'svelte-material-icons/Close.svelte';

	import { Button } from '..';

	const dispatch = createEventDispatcher();
</script>

<Button.Icon
	{...$$restProps}
	class={'ui-dialog-close-button ' + ($$restProps.class || '')}
	ghost
	on:click={() => dispatch('close')}
>
	<Close />
</Button.Icon>

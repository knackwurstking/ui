<script>
	import { Root as Ripple } from '../../js/ripple';

	/**
	 * @type {HTMLButtonElement}
	 */
	let button;

	/** @type {"foreground" | "primary" | "secondary" | "destructive"} */
	export let color = 'primary';

	export let ghost = false;

	/** @type {import("../ripple").RippleOptions} */
	export let rippleOptions = {};

	export let noRipple = false;

	export function click() {
		button.click();
	}
</script>

<button
	bind:this={button}
	{...$$restProps}
	class={`ui-icon-button ${color || ''} ` + ($$restProps.class || '')}
	class:ghost
	use:Ripple={noRipple || $$restProps?.disabled === true
		? null
		: { centered: true, ...rippleOptions }}
	on:click
>
	<slot />
</button>

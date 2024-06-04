<script>
    import { Root as Ripple } from "../../js/ripple";

    /**
     * @type {HTMLButtonElement}
     */
    let button;

    /** @type {"primary" | "secondary" | "destructive"} */
    export let color = "primary";

    /** @type {"full" | "outline" | "ghost"} */
    export let variant = "full";

    /** @type {import("../../js/ripple").RippleOptions} */
    export let rippleOptions = {};

    export let noRipple = false;

    export let active = false;

    export function click() {
        button.click();
    }
</script>

<button
    bind:this={button}
    {...$$restProps}
    class={`ui-button ${color || ""} ${variant || ""} ` +
        ($$restProps.class || "")}
    class:active
    use:Ripple={noRipple || $$restProps?.disabled === true
        ? null
        : rippleOptions}
    on:click
>
    <div class="background"></div>
    <slot />
</button>

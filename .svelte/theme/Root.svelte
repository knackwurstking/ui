<script>
	import "../../css/normalize.css";
	import "../../css/svelte-main.css";

	import { onDestroy } from "svelte";

	import { Zinc } from "./themes";

	/** @type {"light" | "dark" | undefined | null} */
	export let mode = undefined;
	$: setDataTheme(mode);

	/** @type {"zinc"} */
	export let variant = "zinc"; // NOTE: "zinc" is the default theme (always loaded)

	/** @type {boolean} */
	export let auto = false;
	$: typeof auto === "boolean" && setAutoMode(auto);

	/** @type {MediaQueryList} */
	let media;

	/**
	 * @param {MediaQueryListEvent | MediaQueryList} ev
	 */
	function onDarkChange(ev) {
		if (ev.matches) {
			setDataTheme("dark");
		} else {
			setDataTheme("light");
		}
	}

	/**
	 * @param {"dark" | "light"} mode
	 */
	async function setDataTheme(mode) {
		if (mode === "dark" || mode === "light") {
			document.body.setAttribute("data-theme", mode);
		}
	}

	/**
	 * @param {boolean} enable
	 */
	async function setAutoMode(enable) {
		if (!enable) {
			if (window.matchMedia && media) {
				media.removeEventListener("change", onDarkChange);
			}

			return;
		}

		if (window.matchMedia) {
			media = window.matchMedia("(prefers-color-scheme: dark)");
			onDarkChange(media);
			media.addEventListener("change", onDarkChange);
		}
	}

	onDestroy(() => {
		if (media) media.removeEventListener("change", onDarkChange);
	});
</script>

<svelte:head>
	{#if variant === "zinc"}
		<Zinc />
	{/if}
</svelte:head>

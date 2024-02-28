<script>
	// TODO: write a theme function ("/src/lib/js/theme/"), handle modes dark/light/system, handle variants
	import './normalize.css';

	import './main.css';

	import { onDestroy } from 'svelte';

	import { Zinc } from './themes';

	/** @type {"light" | "dark" | undefined | null} */
	export let mode = undefined;
	$: (mode === 'light' || mode === 'dark') && setDataTheme(mode);

	/** @type {"zinc"} */
	export let variant = 'zinc'; // NOTE: "zinc" is the default theme (always loaded)

	/** @param {MediaQueryListEvent} ev */
	const onDarkChange = async (ev) => {
		/** @type {"dark" | "light"} */
		const setDataTheme = async (mode) => document.body.setAttribute('data-theme', mode);

		if (ev.matches) {
			setDataTheme('dark');
		} else {
			setDataTheme('light');
		}
	};

	/** @type {boolean} */
	export let auto = false;
	$: typeof auto === 'boolean' &&
		(() => {
			if (auto) {
				if (window.matchMedia) {
					media = window.matchMedia('(prefers-color-scheme: dark)');
					onDarkChange(media);
					media.addEventListener('change', onDarkChange);
				}
			} else {
				if (window.matchMedia && media) {
					media.removeEventListener('change', onDarkChange);
				}
			}
		})();

	/** @type {MediaQueryList} */
	let media;

	onDestroy(() => {
		if (media) media.removeEventListener('change', onDarkChange);
	});
</script>

<svelte:head>
	{#if variant === 'zinc'}
		<Zinc />
	{/if}
</svelte:head>

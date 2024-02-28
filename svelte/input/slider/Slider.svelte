<script>
	// TODO: move styles to css

	import { onDestroy, createEventDispatcher } from 'svelte';

	/***********
	 * Bindings
	 ***********/

	/** @type {HTMLElement} */
	let slider;

	/** @type {HTMLElement} */
	let range;

	/** @type {HTMLElement} */
	let thumb;

	$: !initialized && !!slider && !!thumb && initializeSlider();

	/******************************
	 * Variable Export Definitions
	 ******************************/

	/** @type {number} */
	export let min = 0;
	/** @type {number} */
	export let max = 100;

	/** @type {number} */
	export let value;
	$: typeof value === 'number' && !!thumb && valueChange();

	/** @type {string} */
	export let width = '100%';
	/** @type {string} */
	export let height = '1.25em';

	/***********************
	 * Variable Definitions
	 ***********************/

	const dispatch = createEventDispatcher();

	let cleanUp = [];
	let initialized = false;
	let rangeWidth;
	let thumbLeft;

	/***********************
	 * Function Definitions
	 ***********************/

	async function initializeSlider() {
		/**
		 * @param {number} width
		 * @param {number} range
		 */
		function moveThumb(width, range) {
			value = Math.round(100 / (width / range)) + min;
			if (initialized) dispatch('input', value);
		}

		/** @param {PointerEvent} ev */
		const move = async (ev) => {
			const parentRangeRect = range.parentElement.getBoundingClientRect();

			const left = parentRangeRect.left;
			const right = parentRangeRect.right;
			const currentY = ev.clientX;

			let _rangeWidth = currentY - left;
			if (currentY > right) {
				_rangeWidth = parentRangeRect.width;
			} else if (currentY < left) {
				_rangeWidth = 0;
			}

			moveThumb(parentRangeRect.width, _rangeWidth);
		};

		const end = async () => {
			thumb.style.transform = 'scale(1)';

			window.removeEventListener('pointermove', move);
			window.removeEventListener('pointerup', end);
			window.removeEventListener('pointercancel', end);
		};

		/** @param {PointerEvent} ev */
		const start = async (ev) => {
			thumb.style.transform = 'scale(1.25)';

			window.addEventListener('pointermove', move);
			window.addEventListener('pointerup', end);
			window.addEventListener('pointercancel', end);

			move(ev);
		};

		slider.addEventListener('pointerdown', start);

		cleanUp.push(() => {
			slider.removeEventListener('pointerdown', start);
			end();
		});

		initialized = true;
	}

	function valueChange() {
		if (!thumb) return;
		const thumbWidth = getComputedStyle(thumb).fontSize;

		/**
		 * @param {number} width
		 * @param {number} range
		 */
		function moveThumb(width, range) {
			rangeWidth = `${100 / (width / range)}%`;
			thumbLeft = `calc(${100 / (width / range)}% - (${thumbWidth} / 2))`;
			if (initialized) dispatch('change', value);
		}

		moveThumb(max - min, value - min);
	}

	/********************
	 * Mount and Destroy
	 ********************/

	onDestroy(() => cleanUp.forEach((fn) => fn()));
</script>

<div
	{...$$restProps}
	bind:this={slider}
	class={'ui-input-slider ' + ($$restProps.class || '')}
	style={`--slider-color: hsl(var(--primary));` + ($$restProps.style || '')}
	style:position="relative"
	style:width
	style:height
	style:cursor="pointer"
	style:padding-left="1em"
	style:padding-right="1em"
>
	<span style:width="100%" style:display="flex" style:align-items="center">
		<div
			class="range-container"
			style:width="100%"
			style:height=".35em"
			style:background-color="hsl(var(--secondary))"
			style:border-radius="var(--radius)"
		>
			<div
				bind:this={range}
				class="range"
				style:width={rangeWidth || '0'}
				style:height="100%"
				style:background-color="var(--slider-color)"
				style:border-radius="var(--radius)"
			/>
		</div>

		<div
			bind:this={thumb}
			class="thumb"
			style:position="absolute"
			style:left={thumbLeft || '-.625em'}
			style:width="1.25em"
			style:height="1.25em"
			style:border-radius="50%"
			style:background-color="var(--slider-color)"
			style:transition="transform .25s ease"
		/>
	</span>
</div>

<style>
	* {
		touch-action: none;
	}
</style>

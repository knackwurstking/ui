<script>
	import { onDestroy, createEventDispatcher } from "svelte";

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
	$: typeof value === "number" && !!thumb && valueChange();

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
			if (initialized) dispatch("input", value);
		}

		/** @param {PointerEvent} ev */
		const move = async (ev) => {
			const parentRangeRect = range.parentElement.getBoundingClientRect();

			const left = parentRangeRect.left;
			const right = parentRangeRect.right;
			const currently = ev.clientX;

			let _rangeWidth = currently - left;
			if (currently > right) {
				_rangeWidth = parentRangeRect.width;
			} else if (currently < left) {
				_rangeWidth = 0;
			}

			moveThumb(parentRangeRect.width, _rangeWidth);
		};

		const end = async () => {
			thumb.style.transform = "scale(1)";

			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", end);
			window.removeEventListener("pointercancel", end);
		};

		/** @param {PointerEvent} ev */
		const start = async (ev) => {
			thumb.style.transform = "scale(1.25)";

			window.addEventListener("pointermove", move);
			window.addEventListener("pointerup", end);
			window.addEventListener("pointercancel", end);

			move(ev);
		};

		slider.addEventListener("pointerdown", start);

		cleanUp.push(() => {
			slider.removeEventListener("pointerdown", start);
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
			if (initialized) dispatch("change", value);
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
	class={"ui-input-slider " + ($$restProps.class || "")}
	style={`--slider-color: hsl(var(--primary));` + ($$restProps.style || "")}
>
	<span>
		<div class="ui-slider-range-container">
			<div
				bind:this={range}
				class="ui-slider-range"
				style={`width: ${rangeWidth || "0"};`}
			/>
		</div>

		<div
			bind:this={thumb}
			class="ui-slider-thumb"
			style={`--thumb-left: ${thumbLeft || "-.625em"};`}
		/>
	</span>
</div>

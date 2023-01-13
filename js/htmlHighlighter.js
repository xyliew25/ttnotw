/** 
 * Class representing a highlighter to be used to highlight HTML elements. 
 * 
 * <p> Dependency: visible.js
 */
class HtmlHighlighter {

	/**
	 * Create a highlighter.
	 * 
	 * @param {string} [color=yellow] - The default color used for highlighting.
	 */
	constructor(color = "yellow") {
		this.color = color;
	}

	/**
	 * Retrieve the default color used for highlighting.
	 * 
	 * @return {string} The default color used for highlighting.
	 */
	getColor() {
		return this.color;
	}

	/**
	 * Change the default color used for highlighting.
	 * 
	 * @param {string} newColor - The new color to be changed to.
	 */
	setColor(newColor) {
		this.color = newColor;
	}

	/**
	 * Highlight the HTML elements of the specified ids. 
	 * 
	 * <p> If a color is specified, the HTML elements will be highlighted using the specified color, 
	 * otherwise the default color is used.
	 * 
	 * <p> If scrolling is enabled, the window will scroll to make the topmost HTML element visible 
	 * after highlighting.
	 * 
	 * @param {number[]} ids - The ids of the HTML elements to be highlighted.
	 * @param {string} [color=this.color] - The color to be used for highlighting.
	 * @param {boolean} [toScroll=true] - The flag to enable/disable scrolling to visible.
	 */
	highlightById(ids, color = this.color, toScroll = true) {
		$(ids.map(id => `#${id}`).join(", ")).css("background-color", color);
		if (toScroll) {
			ids.sort();
			this.#scrollToVisible(ids[0]);
		}
	}

	/**
	 * Highlight the HTML elements of the specified class names. 
	 * 
	 * <p> If a color is specified, the HTML elements will be highlighted using the specified color, 
	 * otherwise the default color is used.
	 * 
	 * @param {string[]} classes - The class names of the HTML elements to be highlighted.
	 * @param {string} [color=this.color] - The color to be used for highlighting.
	 */
	highlightByClass(classes, color = this.color) {
		$(classes.map(c => `.${c}`).join(", ")).css("background-color", color);
	}

	/**
	 * Clear off highlightings from the HTML elements of the specified ids. 
	 * 
	 * @param {number[]} ids - The ids of the HTML elements to be cleared off.
	 */
	clearHighlightById(ids) {
		this.highlightById(ids, "transparent", false);
	}

	/**
	 * Clear off highlightings from the HTML elements of the specified class names. 
	 * 
	 * @param {string[]} classes - The class names of the HTML elements to be cleared off.
	 */
	clearHighlightByClass(classes) {
		this.highlightByClass(classes, "transparent", false);
	}

	#scrollToVisible(id) {
		const delay = 500;
		if (!$(`#${id}`).visible()) {
			$("html, body").animate({
				scrollTop: $(`#${id}`).offset().top,
			}, delay);
		}
	}
}

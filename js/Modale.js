/**
 * Represents a modal window that displays a message for a certain duration.
 */

class Modal {
  /**
   * The top offset for the first modal window.
   * @static
   * @type {number}
   */
  static topOffset = 0;
  /**
   * An array to store all instances of the Modal class.
   * @static
   * @type {Array<Modal>}
   */
  static instances = [];

  /**
   * Create a new modal window.
   * @param {number} duration - The duration in milliseconds that the modal window will be displayed.
   * @param {string} message - The message to be displayed in the modal window.
   * @param {string} classe - Optional - Name of a CSS className.
   */
  constructor(duration, message, classe = "") {
    this.duration = duration;
    this.message = message;
    this.classStyles = {
      backgroundColor: 'rgba(255,255,255,0.3)',
      borderColor: '#0a0',
      borderRadius: '5px',
      borderStyle: 'solid',
      borderWidth: '1px',
      boxSizing: 'border-box',
      color: '#000',
      height: '80px',
      padding: '20px',
      position: 'fixed',
      right: '0',
      transitionProperty: 'top',
      transitionDuration: '0.5s',
      transitionTimingFunction: 'ease-in-out',
      transformOrigin: 'left',
      width: '50%',
    };
    if (classe) {
      // console.log("La classe:", classe);
      this.className = classe;
    } else {
      this.className = "modal";
    }
    this.top = Modal.topOffset;
    Modal.topOffset += this._HEIGHT; // incrémenter la valeur de top pour la prochaine fenêtre modale
    this.index = Modal.instances.length;
    Modal.instances.push(this);
    this._extractStyle();
    this.modal = this._createModal();
    this.progressBar = this._createProgressBar();
    this.modal.appendChild(this.progressBar);
    this.animation = this._animateProgressBar();
    this._addText();
    document.body.appendChild(this.modal);
    this.hideModal();
    this.animation.onfinish = this.moveNextModals.bind(this);
    // this.styles.push(this.className);
  }

  // Constants for styling the modal window and progress bar
  // POSITION = "fixed";
  // RIGHT = "0";
  // WIDTH = "50%";
  _HEIGHT = 80;
  // BACKGROUND_COLOR = "rgba(255,255,255,0.3)";
  // COLOR = "#000";
  // PADDING = "20px";
  // BOX_SIZING = "border-box";
  // TRANSITION = "top 0.5s ease-in-out";
  PROGRESS_BAR_COLOR = "#0a0";
  PROGRESS_BAR_WIDTH = "100%";
  PROGRESS_BAR_HEIGHT = "10px";
  BORDER_RADIUS = "5px";
  BORDER = `1px solid ${this.PROGRESS_BAR_COLOR}`;
  TRANSFORM_ORIGIN = "left";
  ANIMATION_ITERATION = 1;
  ANIMATION_FILL = "forwards";
  ANIMATION_EASING = "linear";

  _extractStyle() {
    function cssToCamelCase(cssProp) {
      return cssProp.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
    }
    const cssRules = document.styleSheets[0].cssRules;
    const cssRulesArr = Array.prototype.slice.call(cssRules);
    // if (this.styles.length > 0) {
    cssRulesArr.forEach((r) => {
      if (r["selectorText"] === `.${this.className}`) {
        const css = r["cssText"].split("{")[1].split("}")[0].split(";");
        css.forEach((c) => {
          if (c.trim().length > 0) {
            let parts = c.trim().split(": ");
            this.classStyles[cssToCamelCase(parts[0])] = parts[1];
          }
        });
      }
    });

    // console.log(this.classStyles);
    // console.log(Object.getOwnPropertyNames(this.classStyles));
    // console.log(this.classStyles.color);
    // }
  }

  /**
   * Create the modal window element.
   * @private
   * @returns {HTMLElement} The modal window element.
   */
  _createModal() {
    const modal = document.createElement("div");
    // modal.style.position = this.POSITION;
    modal.style.position = this.classStyles.position;
    modal.style.top = `${this.top}px`;
    modal.style.right = this.classStyles.right;
    modal.style.width = this.classStyles.width;
    modal.style.height = this._HEIGHT + "px";
    modal.style.backgroundColor = this.classStyles.backgroundColor;
    modal.style.color = this.classStyles.color;
    modal.style.padding = this.classStyles.padding;
    modal.style.boxSizing = this.classStyles.boxSizing;
    modal.style.borderRadius = this.classStyles.borderRadius;
    modal.style.borderStyle = this.classStyles.borderStyle;
    modal.style.borderWidth = this.classStyles.borderWidth;
    modal.style.borderColor = this.classStyles.borderColor;
    modal.style.transitionDuration = this.classStyles.transitionDuration;
    modal.style.transitionProperty = this.classStyles.transitionProperty;
    modal.style.transitionTimingFunction = this.classStyles.transitionTimingFunction;
    modal.classList.add(this.className);
    modal.classList.add('modalToRemove');
    return modal;
  }

  /**
   * Create the progress bar element.
   * @private
   * @returns {HTMLElement} The progress bar element.
   */
  _createProgressBar() {
    const progressBar = document.createElement("div");
    progressBar.style.position = "absolute";
    progressBar.style.bottom = this.classStyles.padding;
    progressBar.style.width = this.PROGRESS_BAR_WIDTH;
    progressBar.style.height = this.PROGRESS_BAR_HEIGHT;
    progressBar.style.backgroundColor = this.classStyles.borderColor;
    progressBar.style.transformOrigin = this.classStyles.transformOrigin;
    progressBar.style.transition = `transform ${this.duration / 1000}s ${
      this.ANIMATION_EASING
    }`;
    return progressBar;
  }

  /**
   * Animate the progress bar.
   * @private
   * @returns {Animation} The animation object.
   */
  _animateProgressBar() {
    const progressAnim = [{ transform: "scaleX(0)" }];
    const progressTiming = {
      duration: this.duration,
      iteration: this.ANIMATION_ITERATION,
      fill: this.ANIMATION_FILL,
      easing: this.ANIMATION_EASING,
    };
    return this.progressBar.animate(progressAnim, progressTiming);
  }

  /**
   * @private
   * Add text to the modal window.
   */
  _addText() {
    // const text = document.createTextNode(
    //   `${this.message} Elle disparaîtra dans ${this.duration / 1000} secondes.`
    // );
    const text = document.createTextNode(`${this.message} ajouté au panier.`);
    this.modal.appendChild(text);
  }

  /**
   * Hide the modal window after the specified duration.
   */
  hideModal() {
    setTimeout(() => {
      this.modal.style.top = `-${this._HEIGHT}px`;
      Modal.instances.splice(this.index, 1);
      Modal.topOffset -= this._HEIGHT;
      setTimeout(() => {
        document.body.removeChild(this.modal);
        // if (document.querySelectorAll(`.${this.className}`).length == 0) {
        if (document.querySelectorAll(`.modalToRemove`).length == 0) {
            Modal.instances = [];
        }
        Modal.instances.forEach((m) => {
          m.index--;
        });
      }, 500);
    }, this.duration);
  }

  /**
   * Move any remaining modal windows up to fill the space left by the hidden modal window.
   */
  moveNextModals() {
    if (this.index < Modal.instances.length) {
      for (let i = this.index; i < Modal.instances.length; i++) {
        const modal = Modal.instances[i];
        if (modal) {
          modal.top -= this._HEIGHT;
          modal.modal.style.top = `${modal.top}px`;
        }
      }
    }
  }
}

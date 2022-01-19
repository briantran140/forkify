import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render = true ] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render = fasle.
   * @this {Object} View instance
   * @author Brian Tran
   * @todo Finish implementation
   */
  render(data, render = true) {
    // check if the data exists
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError(); // explaining why commenting them out at 33:38 - 301

    this._data = data;
    const newMarkup = this._generateMarkup();

    //createRange() will create something called a range, createContextualFragment is where we pass in the string of Markup, like a string of HTML. This method will convert that string into real DOM Nodeobjects. newDOM here will become a big object, which is like a virtual DOM, DOM that is not really living on the page, but lives on the memory (4:49 - 301)
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*')); // selecting all elements. This will return a NodeList if we don't use Array.from to convert it to an array.
    const curElements = Array.from(this._parentElement.querySelectorAll('*')); //curElements are the elements actually on the page, this is the one that we want to update.
    // console.log(curElements);
    // console.log(newElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl)); //this will compare  the node, this method is available on all node.

      // update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // this firstChild is the text(17:27 - 301). watch nodeValue on MDN for more information
        // console.log(`💥${newEl.firstChild?.nodeValue.trim()}`); //we should use optional chain because the firstChild might not always exist.
        curEl.textContent = newEl.textContent; //changing the curEl textContent to newEl to a better algorithm. This might create a bug (replace the entire a container) (15:18 - 301)
      }

      // update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        // console.log(newEl.attributes);
        // console.log(newEl.attributes);
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `
             <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
            <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
            `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
            <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
            `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

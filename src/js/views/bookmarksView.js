import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  //This will fix the bug at (304 - not showing bookmarks and give us an error, finding solution around 9, bug is curEl array wasn't created at that time because bookmark is empty)
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  //Implementing bookmark part 2 (almost whole video)
  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();

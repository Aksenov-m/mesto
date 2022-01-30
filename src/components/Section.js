//слой
export default class Section {
  constructor({ renderer }, containerSelector) {
    // this._renderedItems = items;
    this._renderer = renderer; // renderer — это функция
    this._container = document.querySelector(containerSelector);
  }
  prependAddItem(element) {
    this._container.prepend(element); //вставляем в начало
  }
  appendAddItem(element) {
    this._container.append(element); //вставляем в конец
  }
  renderItems(items, user) {
    items.forEach(
      (item) => this._renderer(item, user) // вызываем renderer, передав item
    );
  }
}

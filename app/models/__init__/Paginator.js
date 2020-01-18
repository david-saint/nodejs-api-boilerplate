import querystring from 'querystring';

export default class Paginator extends Array {
  /**
   * Initialize the paginator by setting the items
   * and some properties.
   * @param  {[type]} items       [description]
   * @param  {[type]} total       [description]
   * @param  {[type]} perPage     [description]
   * @param  {[type]} currentPage [description]
   * @return {[type]}             [description]
   */
  constructor(items, total, perPage, currentPage = null, options = {}) {
    super();

    this.items = items;
    this.total = total;
    this.perPage = perPage;
    this.options = options;
    this.currentPage = this.setCurrentPage(currentPage);
    this.lastPage = Math.max(Math.ceil(total / perPage), 1);

    for (let i = this.items.length - 1; i >= 0; i -= 1) {
      this.push(this.items[i]);
    }
  }

  /**
   * Method to et the current page
   * @param {[type]} currentPage [description]
   */
  setCurrentPage(currentPage) {
    // if current page is null change it to 1
    const page = currentPage || 1;
    // if current page is not a valid page number return 1
    return Paginator.isValidPageNumber(page)
      ? parseInt(page, 10)
      : 1;
  }

  /**
   * Paginators are immutable so just return
   * a new paginator with the items you want to set.
   * @param {[type]} items [description]
   */
  setItems(items) {
    return new Paginator(items, this.total, this.perPage, this.currentPage, this.options);
  }

  /**
   * Get the instance in a response format
   * @return {[type]} [description]
   */
  toResponse() {
    return {
      data: this.items,
      total: this.total,
      to: this.lastItem(),
      from: this.firstItem(),
      perPage: this.perPage,
      path: this.options.path,
      lastPage: this.lastPage,
      currentPage: this.currentPage,
      firstPageUrl: this.url(1),
      lastPageUrl: this.url(this.lastPage),
      prevPageUrl: this.previousPageUrl(),
      nextPageUrl: this.nextPageUrl(),
    };
  }

  /**
   * Get the number of the first item in the slice
   * @return {[type]} [description]
   */
  firstItem() {
    return this.items.length > 0
      ? (this.currentPage - 1) * this.perPage + 1
      : null;
  }

  /**
   * Get the number of the last item in the slice
   * @return {[type]} [description]
   */
  lastItem() {
    return this.items.length > 0
      ? this.firstItem() + this.items.length - 1
      : null;
  }

  /**
   * Get URL for given page number
   * @param  {[type]} p [description]
   * @return {[type]}   [description]
   */
  url(p) {
    // reassign the parms
    let page = p;
    // if page is less than 1 make it 1
    if (page <= 0) { page = 1; }
    // make the params
    const params = { ...this.options.query, page };
    // get the path from the options
    const path = this.options.path || '';
    // return the built url
    return `${path}${path.includes('?') ? '&' : '?'}${querystring.stringify(params)}`;
  }

  /**
   * Get the URL for the next page
   * @return {[type]} [description]
   */
  nextPageUrl() {
    return (this.lastPage > this.currentPage)
      ? this.url(this.currentPage + 1)
      : null;
  }

  /**
   * Get the URL for the previous page
   * @return {[type]} [description]
   */
  previousPageUrl() {
    return (this.currentPage > 1)
      ? this.url(this.currentPage - 1)
      : null;
  }

  /**
   * Determine if the given value is a valid page number
   *
   * @param  {Number}  page [description]
   * @return {Boolean}      [description]
   */
  static isValidPageNumber(page) {
    return !isNaN(page) && page >= 1;
  }

  /**
   * Get the current page from the request.
   *
   * @param  {Request} request
   * @return {Number}         [description]
   */
  static resolveCurrentPage(request) {
    return this.isValidPageNumber(request.query.page)
      ? request.query.page
      : 1;
  }
}

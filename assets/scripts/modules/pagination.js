/**
 * If you pass in $ as a parameter for the function then 
 * the tests will break because for some reason it makes
 * jquery undefined.
 */
define( [ '../modules/templates', '../modules/helpers', '../utils/jquery' ], function( Templates, Helpers ) {

	function Pagination() {

		this.helpers = new Helpers();
		this.templates = new Templates();

		this.cache = [];
		this.current_page = 1;

		/**
		 * The element that will be a item in the list
		 */
		this.element = 'li';

		this.error = false;

		/**
		 * The ID of the list element
		 */
		this.list = 'pagination';

		/**
		 * Either normal or ajax
		 *
		 * Normal represents the technique where all items are
		 * added to the DOM then hid / shown depending on the page
		 *
		 * AJAX represents the technique where only the first page
		 * is shown then any additional pages are got with an AJAX
		 * call
		 */
		this.method_type = 'ajax';

		/**
		 * The number of results per page
		 */
		this.per_page = 2;

		/**
		 * The page we intend to move to
		 */
		this.target_page;

		this.total_items;

		/**
		 * This will be the template that the ajax method uses
		 */
		this.view;
		this.template;
	}

	Pagination.prototype.setter = function( key, value ) {
		this[ key ] = value;
	}

	/**
	 * Pagination can happen one of two ways.
	 * 
	 * We can load all the data to the DOM at once then hide / show the relevant
	 * chunks of data to simulate a pagination effect.
	 *
	 * Or
	 *
	 * We can load just the first page then use an AJAX call to load every successive
	 * page while caching pages that have already loaded.
	 *
	 * This library will accommodate for both techniques
	 *
	 * This method will call the appropriate method depending on
	 * the type
	 */
	Pagination.prototype.move = function( page ) {

		this.target_page = page;
		this[ this.method_type + '_move' ]();
	}

	Pagination.prototype.ajax_move = function() {

		var _this = this;
		
		$.ajax({ url: window.site_path + 'ajax/pagination',
				 data: { target_page: this.target_page, per_page: this.per_page },
				 dataType: 'JSON',
				 type: 'POST',
				 success: function( data ) {
				 	 if( data[ 'status' ] == 200 ) {
				 	 	_this.display_ajax( data[ 'results' ] );
				 	 	_this.current_page = _this.target_page;
				 	 }
				 }
		});
	}

	Pagination.prototype.display_ajax = function( results ) {

		if( this.helpers.check_null( this.view ) ) {
			this.templates.template = this.template;
		}

		/**
		 * We need to clear the container first then add the new stuff
		 */
		$( '#js-' + this.list ).html();
		$( '#js-' + this.list ).html( this.templates.compile( this.view, results ) );
	}

	Pagination.prototype.normal_move = function() {
		
		//Work out the correct range of items to show
		var range = this.get_range(),
			list = $( '#js-' + this.list ),
			items = list.children(),
			l = items.length;

		this.total_items = l;
		this.check_range( range );

		if( this.error === false ) {

			items.hide();

			for( var i = 0; i < l; i++ ) {
				if( i >= range.start && i < range.end ) {
					$( items[ i ] ).show();
				}
			}

			this.current_page = this.target_page;
		}
	}

	/**
	 * Get the start and end of the items to show.
	 *
	 * @return object
	 */
	Pagination.prototype.get_range = function() {
		var showing = ( this.target_page - 1 ) * this.per_page;
		return { start: showing, end: this.target_page * this.per_page };
	}

	Pagination.prototype.check_range = function( data ) {
		if( data.start < 0 || data.end > this.total_items ) {
			this.error = true;
		}
	}

	return Pagination;
});
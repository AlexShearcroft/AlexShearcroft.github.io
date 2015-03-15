define(['jquery'], function(){

	function Toggles () {

		// The area to toggle up and down
		this.toggleArea = 'data-toggle';

		// The class for the toggle icon
		this.toggleIconClass = 'toggler--open';

		// Our nav icon class in its original state
		this.navIconClass = 'nav__icon';

		// The class for showing the nav is active
		this.activeNavIconClass = 'nav__icon--active';

		this.secondNavIcon = false;
	}

	/**
	 * Toggles a div area up and down
	 * @param {object} element
	 */
	Toggles.prototype.toggle = function (element) {

        var area = element.attr(this.toggleArea);

        $('#js-' + area).toggle();
	}

	Toggles.prototype.slideToggle = function (element) {

        var area = element.attr(this.toggleArea);

        $('#js-' + area).slideToggle();

        element.toggleClass(this.activeNavIconClass);
	}

	/**
	 * Adds an active class of an element to show its active
	 * @param {object} element
	 */
	Toggles.prototype.activeNavIcon = function (elem) {

		if (!!elem.attr('data-active')) {
            
			var elem = $('.' + this.navIconClass);

			if (elem.hasClass(this.activeNavIconClass)) {
	            elem.removeClass(this.activeNavIconClass);
	        } else {
	            elem.addClass(this.activeNavIconClass);
	        }
	    }
	}

	/**
	 * Switches the class of an element to change an icon
	 * @param {object} element
	 */
	Toggles.prototype.switchIcon = function (elem) {

		if (!!elem.attr('data-type')) {
			if (elem.hasClass(this.toggleIconClass)) {
	            elem.removeClass(this.toggleIconClass);
	        } else {
	            elem.addClass(this.toggleIconClass);
	        }
	    }
	}
	
	return Toggles;

});
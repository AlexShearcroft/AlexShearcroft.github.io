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

	/**
	 * Applys a fixed nav and if a logo needs swapping out
	 * @param {object} element
	 */
	Toggles.prototype.stickyNav = function (fixedNavClass, marginTop, marginTopAmount, fixedClass) {

		$(window).bind('scroll', _.bind(function() {
		        
	        if ($(window).scrollTop() > 70) {
	            fixedNavClass.addClass(fixedClass);
	            marginTop.css('margin-top', marginTopAmount+'px');

	            if (this.secondNavIcon) {
					$('.js-nav-logo').fadeIn(200);
	            }
	        }
	        else {
	            fixedNavClass.removeClass(fixedClass);
	            marginTop.css('margin-top','0');

	            if (this.secondNavIcon) {
					$('.js-nav-logo').fadeOut(200);
	            }
	        }
	    }, this));

	},

	/**
	 * Found in the order section for viewing orders
	 * @param {object} element
	 */
	Toggles.prototype.ordersView = function (element) {
		var area = element.attr('data-order');

        var order = $('#js-' + area);
        var open = 0;

        var tr = $('.orders-listing');

        order.slideToggle(function() {
            if(order.css('display') == 'table-row') {
                order.prev().addClass('table-order-active').attr('data-active', 'true');
                tr.removeClass('table-order-unactive');

                open = $('.orders-listing[data-active="true"]').length;
                $('.orders-listing[data-active!="true"]').addClass('table-order-unactive');

            } else {
                order.prev().removeClass('table-order-active').removeAttr('data-active');
                open = $('.orders-listing[data-active="true"]').length;

                if( open > 0 ) {
                	order.prev().addClass('table-order-unactive');
                }
            }

            if(open == 0) {
                tr.removeClass('table-order-unactive');
            }

            $('html, body').animate({
                scrollTop: order.offset().top - 46
            }, 500);
        });
    }
	
	return Toggles;

});
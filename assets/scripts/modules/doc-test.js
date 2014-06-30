define( [ '../utils/jquery' ], function() {

	function Hello () {
		this.result_count = 0;
	}

	Hello.prototype.run_ajax = function() {

		var _this = this;

		$.ajax({ url: window.site_path + 'ajax/test',
				 dataType: 'JSON',
				 success: function( data ) {
				 	_this.result_count = data.results.length;
				 }
		});
	}

	return Hello;
});

/**
Hello.prototype.shout = function() {
	return 'HELLO WORLD!';
}

Hello.prototype.whisper = function() {
	return 'hello world!';
}

Hello.prototype.silent = function() {
	return false;
}

Hello.prototype.toggle = function( e ) {

	var target = e.target,
		area = $( target ).attr( 'data-area' ),
		$to_toggle = $( '.js-' + area );

	if( !area  || !$to_toggle.length ) {
		this.error = true;
	}

	if( this.error === false ) {
		$to_toggle.toggle();
	}


	e.preventDefault();
}
*/
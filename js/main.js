$( document ).ready( function () {

	function getQueryParameter(name) { // get query parameter by name
		name = name.replace( /[\[]/, "\\[" ).replace( /[\]]/, "\\]" );
		var regex = new RegExp( "[\\?&]" + name + "=([^&#]*)" ),
			results = regex.exec( location.search );
		return results === null ? "" : decodeURIComponent( results[1].replace( /\+/g, " " ) );
	}

	var offsetValue = parseInt( getQueryParameter( 'offset' ) ); // Get offset value from query strings
	if (!offsetValue || isNaN( offsetValue )) {
		var initialIncrement = 5; //Default offset value
	} else {
		initialIncrement = offsetValue;
	}
	var index = 0;
	var increment = initialIncrement;

	var get_content = function () {
		$.getJSON( 'http://www.stellarbiotechnologies.com/media/press-releases/json', function (data) {
			var limitValue = parseInt( getQueryParameter( 'limit' ) ); // Get limit value from query strings
			if (!limitValue || isNaN( limitValue )) {
				limitValue = data.news.length; //Default limit value
			}
			if (index >= limitValue) return false;
			for (var i = index; i < increment; i++) {
				var html = "<article class='panel'>" +
					"<h3>" + data.news[i].title + "</h3>" +
					"<h4 class='subheader'>" + data.news[i].published + "</h4>" +
					"</article>";

				$( html ).hide().appendTo( '#js-news-list' ).fadeIn();
			}
			index = i;
			increment = increment + initialIncrement;
		} )

	};

	get_content();

	$( '#js-news-content' ).bind( 'scroll', function () {
		if ($( this ).scrollTop() + $( this ).innerHeight() >= this.scrollHeight) {
			get_content();
		}
	} )

} );
jQuery(function($){
	function getExternalUrl(url,tab) {
		var externalUrl;
		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			if (xhr.status === 200) {
				var json = xhr.responseText;                         // Response
				json = json.replace(/^[^(]*\(([\S\s]+)\);?$/, '$1'); // Turn JSONP in JSON
				json = JSON.parse(json);                             // Parse JSON
				externalUrl = json["external_url"];
				tab.location.replace(externalUrl);
			} else
				tab.document.write("<h2>Sorry something went wrong...</h2>");
		};
		
		xhr.timeout = 15000;
		xhr.ontimeout = () => {
			tab.document.write("<h2>Server taking too long to respond!!!</h2>");
		};
		xhr.open('GET', url);
		xhr.send();
	}
	
	
	$( "div[role='gridcell']" ).on('mousedown', 'a', function(e){
		if (e.which === 2) {
			var o = this;
			if ( o.href != '%' ) {
				console.log("opening relavent link wait...");
				var uri = $.url.parse(o.href);
				var temp = uri.source.split("/");
				var birdId = temp[temp.length -1];
				var builtMainUrl = "https://api.fancybirds.io/nft/" + birdId + "/";
				var newTab = window.open("about:blank", "_blank");
				getExternalUrl(builtMainUrl,newTab);
			}
		}	
	});
	
});



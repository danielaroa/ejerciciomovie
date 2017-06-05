$(document).on('click', '#search__action', function(){
	$.ajax({
	  	url: 'https://api.themoviedb.org/3/search/movie?api_key=9e5135f25702940a7def85a4e6855df1&query=movie&include_adult=true',
	  	type: 'GET',
	  	dataType: 'json',

	  	success: function (data) {
	  		console.log(data);
	    	$.each(data.results, function(i, item) {
			    console.log(data.results[i].name);
			});
	  	},
	  	error: function(json){
	    	console.log(json);
	  	}
	});
});

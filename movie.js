//$(document).ready(function(){
	var ajax_search = false;
	var pag_search = false;
	var img_array=[];
	function ajax_movie_search(value){
		var api_url;
		if($(value).attr('id') == 'search__action'){
			if ( ajax_search  == true ) {
				$('.movies__pagination').empty();
				$('.search__results').empty();
			}
			ajax_search = false;
		}else{
			pag_search = true;
		}
		if(pag_search){
			$('.search__movie').empty();
			pag_search = false;
		}
		var query__search = $('.search-query').val();
		if ($(value).attr('id') != 'undefined') {
			api_url = 'https://api.themoviedb.org/3/search/movie?api_key=9e5135f25702940a7def85a4e6855df1&query='+query__search+'&page='+ $(value).attr('id') +'&include_adult=true';
		} else {
			api_url = 'https://api.themoviedb.org/3/search/movie?api_key=9e5135f25702940a7def85a4e6855df1&query='+query__search+'&include_adult=true';
		}
		$.ajax({
		  	url: api_url,
		  	type: 'GET',
		  	dataType: 'json',

		  	success: function (data) {
		  		var pages = data.total_pages;
		  		if (!ajax_search){
		  			ajax_search = true;
			  		if (pages > 1 ) {
			  			for(var i = 0; i < pages; i++) {
			  				var pageID = i + 1;
			  				$('.movie__header').addClass('small_movie__header').removeClass('movie__header');
			  				$('.search__movie').addClass('small_search__movie').removeClass('search__movie');
			  				$('.movies__pagination').append('<div onclick="ajax_movie_search(this);" id="'+pageID+'">' + pageID + '</div>' );
			  			}
		  			}	
		  		}
		    	$.each(data.results, function(i, item) {
		    		var movie_id =  data.results[i].id;
		    		var movie_lang =  data.results[i].original_language;
		    		$.ajax({
					  	url: 'https://api.themoviedb.org/3/movie/'+movie_id+'/images?api_key=9e5135f25702940a7def85a4e6855df1&language='+ movie_lang ,
					  	type: 'GET',
					  	dataType: 'json',
					 	success: function(data) {
					 		console.log(data);
					 		var img_url = 'https://image.tmdb.org/t/p/w' +data.posters[0].width +data.posters[0].file_path;
					 		console.log(img_url);
					 		$('.search__results').append('<div class="col-sm-3 movie_image" id="'+data.id+'"><img id="img-'+data.id+'"></div>');
					 		$('.search__results img#img-'+data.id).attr('src', img_url);
					 	},
					 	error: function(json) {
					 		console.log(json);
					 	}
					});
		    		$('.search__results').css('display','block');
		    		
				    //console.log(data.results[i].original_title);
				});
		  	},
		  	error: function(json){
		    	console.log(json);
		  	}
		});
	}
	function ajax_movie_images(movie_id,movie_lang, img_array){
		
		return img_array;
	}
//});
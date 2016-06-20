//Infinite Scroll
var page = 2;
var url_blog = window.location;
$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        $.get((url_blog +'/page/'+page),
	  	function(content) {
	        if(page <= max_pages){
	        	$('.container').append($(content).children(".post").fadeIn(1400));
		        page = page + 1;
		    }
		});
    }
});


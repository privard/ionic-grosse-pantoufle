angular.module('starter.filters',[])

.filter('starRating', function(){
	return function(rating){
		var html = '';
		var stars = 0;
		for (stars = 0; stars < Math.round(rating); stars++){
			html += '<i class="icon icon-star ion-ios7-star"></i>';
		}
		for (var i = stars; i < 5; i++){
			html += '<i class="icon icon-star-outline ion-ios7-star-outline"></i>';	
		}
		return html;
	};
});
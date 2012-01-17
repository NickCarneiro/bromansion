$(function(){
	
var captions = "";
var page = 0;
var page_size = 5;

$.get("/captions", 
	function(res){
		captions = res;
});

 
$(window).scroll(function(){
	if($(window).scrollTop() == $(document).height() - $(window).height()){
	   loadNextPage();
	}
});
 
$("#close_explanation").click(function(){
	$("#explanation").hide();
})

$("#explanation").hide();


$("#about").live("click", function(){
	console.log("explanation");
	$("#explanation").toggle();
});

function insertCaption(uuid){
	
	var caption = 
	'<div class="bromeme">'+
		'<a href="/bro/'+ uuid+'">'+
			'<img src="/images/captions/'+uuid+'.jpg" /></a> </div> <br />'+
			'<div class="fb-comments" data-href="http://bromansion.com?imageuuid='+uuid+'" data-num-posts="2" data-width="470">'+
	'</div><br /> <script>FB.XFBML.parse();</script>';
	$("#container").append(caption);
	
}

//loads more captions into the dom for infinite scroll
function loadNextPage(){
	page++;
	var page_start = page_size * page;
	var page_stop = page_start + page_size

	
	for(var i = page_start; i < page_stop && i < captions.length; i++){
		insertCaption(captions[i].image_uuid);
	} 
}

});


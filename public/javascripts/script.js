/* Author: It's Nick C, baby.

*/

var text_size = 60;
var text_x = 0;
var text_y = 0;
var text_content = "";
var enter_caption = "Enter caption here. Hit enter to make a new line.";
var text_stroke = 5;
var image_source = "images/demo.jpg"

$(function(){
	

$("textarea").keyup(function(){
	text_content = $("textarea").val();
	redraw();
});

$("textarea").focus(function(){
	if($("textarea").val() === enter_caption.trim()){
		$(this).html("");
	}
});

//font size controls
$("#bigger").click(function(){
	text_size += 6;
	text_stroke = text_size / 8;
	redraw();
})

$("#smaller").click(function(){
	text_size -= 6;
	text_stroke = text_size / 8;
	redraw();
})

$("#up").click(function() {
	text_y -= 15;
	redraw();
});

$("#down").click(function() {
	text_y += 15;
	redraw();
});

$("#left").click(function() {
	text_x -= 15;
	redraw();
});

$("#right").click(function() {
	text_x += 15;
	redraw();
});

$(".brothumb").live("click", function(){
	
	image_source = $(this).attr("src");
	$(this).removeClass("brothumb");
	var img = {};
	img.width = $(this).width();
	img.height = $(this).height();
	$(this).addClass("brothumb");
	console.log(image_source);
	initialDraw(img);
});

$("#submit").click(function(){
	
	var imageData = {image: $("canvas").getCanvasImage("jpg")};
	var settings = {
		url: "/upload",
		type: "post",
		data: imageData,
		success: uploadCallback,
		error: errorCallback
	};
	console.log("sending image");
	$.ajax(settings);

	function uploadCallback(res){
		console.log("got success response");
		console.log(res);
		//redirect to home page.
		window.location = "/";
	}

	function errorCallback(xhr, textStatus, error){
		console.log("error during upload");
		console.log(xhr);
		alert("There was a problem uploading your bro. Sorry, bro.");
	}
});

//show first image in bro list on page load


//populate bro list on page load
$.get("/bros", 
	function(urls){
		for(var i = 0; i < urls.length; i++){
			//add bro to list
			addBroThumb(urls[i]);
		}

	var first_thumb = $(".brothumb")[0];
	$(first_thumb).load(function(){
	image_source = $(first_thumb).attr("src");
	$(first_thumb).removeClass("brothumb");
	var img = {};
	img.width = $(first_thumb).width();
	img.height = $(first_thumb).height();
	$(first_thumb).addClass("brothumb");
	console.log(image_source);

	initialDraw(img);
})
	});



});




function addBroThumb(url){
	$("#brolist").append('<li><img class="brothumb" src="images/bros/'+url+'" /></li>');
}



//used
function initialDraw(img){

	
	//resize canvas for image
	$("canvas").attr("width", img.width);
	$("canvas").attr("height", img.height);

	redraw();
}
function redraw(){
	
	//redraw image to overwrite canvas
	$("#canvas").drawImage({
		source: image_source,
		fromCenter: false,
		load: applyText
	});
}

//callback that draws text after the image has been successfully drawn
function applyText(){
	
	
	var breaks = text_content.split('\n');
	for(var i = 0; i < breaks.length; i++){
		$("#canvas").drawText({
			fillStyle: "#ffffff",
			strokeStyle: "#000",
			strokeWidth: 9,
			x: text_x, 
			y: text_y + i * text_size * 1.5,
			text: breaks[i],
			align: "left",
			baseline: "top",
			font: "normal "+ text_size +"pt Arial, sans-serif"
		});
	}
	
	
}





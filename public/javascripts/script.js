/* Author: It's Nick C, baby.

*/

var text_size = 60;
var text_x = 0;
var text_y = 0;
var text_content = "";
var enter_caption = "Enter caption here...";
var text_stroke = 5;
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
	text_size += 10;
	text_stroke = text_size / 8;
	redraw();
})

$("#smaller").click(function(){
	text_size -= 10;
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
	}

	function errorCallback(xhr, textStatus, error){
		console.log("error during upload");
		console.log(xhr);
	}
});

//show image on page load
redraw();
});

function redraw(){
	//redraw image to overwrite canvas
	$("#canvas").drawImage({
		source: "images/demo.jpg",
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





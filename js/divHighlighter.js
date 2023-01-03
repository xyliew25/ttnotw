var needleHead = 0;
var currentDiv = 0;
var nextStartTime = 0;

function findTime(findThis){
for (i = 0; i < startTimes.length; i++) { 
	if (findThis < startTimes[i]){
		$(".cont,.narration").css("background-color","white");
		$("#"+(i-1)).css("background-color","lightblue");
		currentDiv = i-1;
		nextStartTime = startTimes[i];
		//image($("#"+currentDiv).data()["fig"]);
		//var timer = setInterval(displayTime,1); //Moved to video
		break;
	}
}
}

function image(imageNumber){
		console.log("fig",fig);
		console.log("imageNumber",imageNumber);
		if (fig != imageNumber){
			/*$("#"+fig).fadeOut("slow");*/
			$("#captionNumber").html(imageNumber.replace("p","."));
			$("#captionText").html(captions[imageNumber.replace("p",".")]);
			//$("#"+imageNumber).fadeIn("slow");
			$("#image img").css("display","none");
			$("#"+imageNumber).css("display","block");
			fig = imageNumber.replace("p",".");
		}
	}

$(document).ready(function(){
	//Initial setting
	findTime(needleHead);
});

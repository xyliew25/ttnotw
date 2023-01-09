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

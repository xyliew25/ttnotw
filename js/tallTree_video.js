//Last update: 17:27, 11\06\2019
var fig = "1p1"
var timerPaused = false;

$(document).ready(function(){

	$("#loadingText").css("display","none");
	$(".loader").css("display","none");
	$("#multimedia").draggable();	
	
	$("#englishBox").change(function() {
	    if(this.checked) {
			$(".english").css("display","table-cell");
	    }else{
			$(".english").css("display","none");
		}
	});
	
	$("#javaneseBox").change(function() {
	    if(this.checked) {
			$(".javanese").css("display","table-cell");
	    }else{
			$(".javanese").css("display","none");
		}
	});
	
	$("#descriptionBox").change(function() {
	    if(this.checked) {
			$(".narration").css("display","table-cell");
			$(".nonTimedNarration").css("display","table-cell");
	    }else{
			$(".narration").css("display","none");
			$(".nonTimedNarration").css("display","none");
		}
	});

	//Close
	$("#close_btn").click(function(e){
		$("#annotationText").fadeOut("fast");
		$("#blind").css("display","none");
		timerPaused = false;
		report = [];
		report["origin"] = "close button";
		report["currentTime"] = currentTime;
		report["currentDiv"] = currentDiv;
		console.log(report);
		//wavesurfer.play();
		
	});

	//wayangPlayer
	mp4_source = "video/"+fileName+".m4v";
	var wayangPlayer = videojs('wayang_video');
	videojs("wayang_video").src([{type:"video/mp4", src: mp4_source}]);

	// Tracks
	const engSub = {
		kind: "subtitles",
		id: "0",
		label: "English",
		src: "vtt/P6-4+5_en.vtt",
	};
	const javaSub = {
		kind: "subtitles",
		id: "1",
		label: "Javanese",
		src: "vtt/P6-4+5_java.vtt",
	};
	const descSub = {
		kind: "subtitles",
		id: "2",
		label: "Description",
		src: "vtt/P6-4+5_desc.vtt",
	};
	wayangPlayer.addRemoteTextTrack(engSub);
	wayangPlayer.addRemoteTextTrack(javaSub);
	wayangPlayer.addRemoteTextTrack(descSub);
	const tracks = wayangPlayer.remoteTextTracks().tracks_;
	// Not using track directly but it provides some useful methods to be utilized
	tracks.forEach(t => t.mode = "hidden");

	// Sync subtitle and text when video is playing
	wayangPlayer.on("timeupdate", () => {
		// Any track is fine as they are expected to be consistent
		const id = tracks[0].activeCues[0].id;

		// Get text ids of same start time
		const ids = [];
		for (let i = 0; i < startTimes.length; i++) {
			if (startTimes[i] == startTimes[id]) {
				ids.push(i);
			}
		}

		// Set subtitles
		const subtitles = ids.reduce((prev, id) => prev + $("#" + id).html(), "") ;
		$("#subtitles").html(subtitles);
		
		// Highlight text
		$(".cont, .narration, .cantDidascalia, .didascalia").css("background-color", "white");
		ids.forEach((id) => $("#" + id).css("background-color", "lightblue"))
		if (!$("#" + id).visible()) {
			$('html, body').animate({
				scrollTop: $("#" + id).offset().top,
			}, 500);
		}	
	})
	
	//Text
	$(".cont,.narration,.cantDidascalia,.didascalia").click(function(e){
		//Sometimes a 'double' empty object is fired... not sure why. This is a temporary hack to be corrected later.
		if (! jQuery.isEmptyObject($(this).data())){
			currentTime = wayangPlayer.currentTime();
			soughtTime = (parseInt($(this).data()["time"]))/10;		
			currentDiv = this.id;
			wayangPlayer.currentTime(soughtTime);
			nextStartTime = startTimes[parseInt(this.id)+1];
			
			$(".cont,.narration,.cantDidascalia,.didascalia").css("background-color","white");
			
			//all other identical start times
			var indexes = [], i;
			for(i = 0; i < startTimes.length; i++){
				if (startTimes[i] === parseInt($(this).data()["time"])){
					indexes.push(i);
				}
			}
			
			for(i = 0; i < indexes.length; i++){
				$("#"+indexes[i]).css("background-color","lightblue");
			}
			
			currentText = ""
			for(i = 0; i < indexes.length; i++){
				$("#"+indexes[i]).css("background-color","lightblue");
				currentText += "<p>" + $("#"+indexes[i]).html()
			}
			$("#subtitles").html(currentText);		
		}
	});
	
	//Annotation
	$(".annotation").click(function(e){
		
		//pause
		if (!wayangPlayer.paused()){
			wayangPlayer.pause()
		}
		timerPaused = true;
				
		//read the values
		$("#theText").html($(this).data()["annotation"]);
		ref = $(this).data()["ref"];
		
		//calculate the offset
		currentTime = wayangPlayer.currentTime();
		currentDiv = ref;
		soughtTime = parseInt($("#" + currentDiv).data()["time"])/10;
				
		//move the player needle
		wayangPlayer.currentTime(soughtTime);
		nextStartTime = startTimes[parseInt(this.id)+1];
				
		$(".cont,.narration,.cantDidascalia,.didascalia").css("background-color","white");
		
		//all other identical start times
		var indexes = [], i;
		for(i = 0; i < startTimes.length; i++){
			if (startTimes[i] === soughtTime * 10){
				indexes.push(i);
			}
		}
		
		for(i = 0; i < indexes.length; i++){
			$("#"+indexes[i]).css("background-color","lightblue");
		}
		
		currentText = ""
		for(i = 0; i < indexes.length; i++){
			$("#"+indexes[i]).css("background-color","lightblue");
			currentText += "<p>" + $("#"+indexes[i]).html()
		}
		
		$("#subtitles").html(currentText);				
		
		//display annotation
		$("#annotationText").css("display","block");
		tops = $(window).scrollTop();
		$("#annotationText").css("top",tops + 100);
		$("#blind").css("display","block");
		report = [];
		report["ref"] = ref;
		report["origin"] = "annotation button";
		report["sought time"] = soughtTime;
		report["currentTime"] = currentTime;
		report["currentDiv"] = currentDiv;
		report["indexes"] = indexes;
		console.log(report);

	});

});


//Last update: 17:27, 11\06\2019
var fig = "1p1"

$(document).ready(() => {
	//////////////////////// Loading ////////////////////////
	$("#loadingText").css("display", "none");
	$(".loader").css("display", "none");

	//////////////////////// Text ////////////////////////
	$("#englishBox").change((e) => {
		if (e.target.checked) {
			$(".english").css("display", "table-cell");
		} else {
			$(".english").css("display", "none");
		}
	});

	$("#javaneseBox").change((e) => {
		if (e.target.checked) {
			$(".javanese").css("display", "table-cell");
		} else {
			$(".javanese").css("display", "none");
		}
	});

	$("#descriptionBox").change((e) => {
		if (e.target.checked) {
			$(".narration").css("display", "table-cell");
			$(".nonTimedNarration").css("display", "table-cell");
		} else {
			$(".narration").css("display", "none");
			$(".nonTimedNarration").css("display", "none");
		}
	});

	//////////////////////// Video ////////////////////////
	// Setup
	$("#multimedia").draggable();	

	// Source
	const wayangPlayer = videojs('wayang_video');
	const source = "video/" + fileName + ".m4v";
	wayangPlayer.src([{ type: "video/mp4" , src: source } ]);

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
	
	// Sync video when text is clicked
	// Subtitle and text highlighting will be automatically handled via timeupdate handler 
	$(".cont, .narration, .cantDidascalia, .didascalia").click((e) => {
		// Video.js uses second while startTimes array uses 10 * second
		// +1 so that shift time pass prev interval
		const soughtTime = startTimes[e.currentTarget.id] / 10 + 1;
		wayangPlayer.currentTime(soughtTime);
	});
	
	//////////////////////// Annotation ////////////////////////
	// Open annotation
	$(".annotation").click((e) => {
		// Pause video
		wayangPlayer.pause();		

		// Seek video
		const soughtTime = startTimes[e.currentTarget.dataset.ref] / 10 + 1;
		wayangPlayer.currentTime(soughtTime);
				
		// Set annotation text
		const annotation = e.currentTarget.dataset.annotation;
		$("#theText").html(annotation);

		// Display annotation
		$("#annotationText").css("display", "block");
		tops = $(window).scrollTop();
		$("#annotationText").css("top", tops + 100);
		$("#blind").css("display", "block");
	});

	// Close annotation
	$("#close_btn").click(() => {
		$("#annotationText").fadeOut("fast");
		$("#blind").css("display", "none");
	});
});

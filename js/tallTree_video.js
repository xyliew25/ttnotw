$(document).ready(() => {
	//////////////////////// Loading ////////////////////////
	$("#loadingText").css("display", "none");
	$(".loader").css("display", "none");

	//////////////////////// Draggable ////////////////////////
	$("#multimedia").draggable();

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
	const vidId = "wayang_video";
	const vidSrcs = [
		{
			src: "video/" + fileName + ".m4v",
			type: "video/mp4",
		},
	];
	const subtitleId = "subtitles";
	const trackSrcs = [
		{
			label: "English",
			src: "vtt/P6-4+5_en.vtt",
		},
		{
			label: "Javanese",
			src: "vtt/P6-4+5_java.vtt",
		},
	]
	const textClasses = ["cont", "narration", "cantDidascalia", "didascalia"];
	const highlightColor = "lightblue";

	const wayangPlayer = new Video(vidId, vidSrcs, trackSrcs, subtitleId, textClasses, highlightColor, startTimes);

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

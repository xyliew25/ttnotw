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
	const src = "video/" + fileName + ".m4v";
	const engSub = {
		label: "English",
		src: "vtt/P6-4+5_en.vtt",
	};
	const javaSub = {
		label: "Javanese",
		src: "vtt/P6-4+5_java.vtt",
	};
	const descSub = {
		label: "Description",
		src: "vtt/P6-4+5_desc.vtt",
	};
	const subtitles = [engSub, javaSub, descSub];
	const wayangPlayer = new Video(src, subtitles, startTimes);
	wayangPlayer.makeVideoDraggable();

	//////////////////////// Annotation ////////////////////////
	// Open annotation
	$(".annotation").click((e) => {
		// Pause video
		wayangPlayer.pause();		

		// Seek video
		const soughtTime = startTimes[e.currentTarget.dataset.ref] / 10 + 1;
		wayangPlayer.seekTo(soughtTime);
				
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

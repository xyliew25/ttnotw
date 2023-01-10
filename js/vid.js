class Video {
  constructor(src, subtitles=[], startTimes=[]) {
    this.src = src;
    this.subtitles = subtitles;
    this.startTimes = startTimes;
    this.setup();
  }

  setup() {
    /////////////////// Setup video ///////////////////
    this.vid = videojs('wayang_video');

    // Source
    this.vid.src([{ type: "video/mp4", src: this.src }]);

    // Tracks
    this.subtitles.forEach((s, i) => {
      const track = {
        kind: "subtitles",
        id: i,
        label: s.label,
        src: s.src,
      };
      this.vid.addRemoteTextTrack(track);
    })
    const tracks = this.vid.remoteTextTracks().tracks_;
    // Not using track directly but it provides some useful methods to be utilized
    tracks.forEach(t => t.mode = "hidden");

    /////////////////// Setup handlers ///////////////////
    // Sync subtitle and text when video is playing
    this.vid.on("timeupdate", () => {
      // Any track is fine as they are expected to be consistent
      const id = tracks[0].activeCues[0].id;

      // Get text ids of same start time
      const ids = [];
      for (let i = 0; i < this.startTimes.length; i++) {
        if (this.startTimes[i] == this.startTimes[id]) {
          ids.push(i);
        }
      }

      // Set subtitles
      const subtitles = ids.reduce((prev, id) => prev + $("#" + id).html(), "");
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
      const soughtTime = this.startTimes[e.currentTarget.id] / 10 + 1;
      this.vid.currentTime(soughtTime);
    });
  }
  
  makeVideoDraggable() {
    $("#multimedia").draggable();
  }

  pause() {
    this.vid.pause();
  }

  seekTo(time) {
    this.vid.currentTime(time);
  }
}

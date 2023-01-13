/** 
 * Class representing a customized Video.js player of a particular use case where:
 * <ul>
 * <li> The video has one or more sources.
 * <li> The video has subtitles and texts of one or more languages.
 * <li> When a user seeks to a particular timestamp of the video, the corresponding text will be highlighted.
 * <li> When a user clicks on a text, the video will seek to the corresponding timestamp.
 * </ul>
 * 
 * <p> Dependencies: video.js, htmlHighlighter.js
 */
class Video {

  /**
   * Create a customized Video.js player.
   * 
   * @param {string} vidId - The id of the HTML5 video element.
   * @param {Object[]} vidSrcs - The sources of the video.
   * @param {string} vidSrcs[].src - The path to the source.
   * @param {string} vidSrcs[].type - The type of the source.
   * @param {Object[]} trackSrcs - The languages of the video.
   * @param {string} trackSrcs[].label - The label of the language.
   * @param {string} trackSrcs[].src - The path to the WebVTT file.
   * @param {string} subtitleId - The id of HTML element to be populated with the subtitles. 
   * @param {string[]} textClasses - The class names of all the HTML elements containing the texts 
   * to be highlighted.
   * @param {string} highlightColor - The color to be used to highlight the corresponding texts 
   * at a particular timestamp of the video.
   * @param {number[]} startTimes - The start times of each interval of the video.
   * 
   * @return {Player} The customized Video.js player.
   */
  constructor(vidId, vidSrcs, trackSrcs, subtitleId, textClasses, highlightColor, startTimes) {
    /////////////////// Setup video ///////////////////
    // Video.js player instance
    this.vid = videojs(vidId);

    // Sources
    this.vid.src(vidSrcs);

    // Tracks
    trackSrcs.forEach((t, i) => this.vid.addRemoteTextTrack({
      id: i.toString(),
      label: t.label,
      src: t.src,
    }));
    const tracks = this.vid.remoteTextTracks().tracks_;
    // Not using tracks directly but it provides some useful methods to be utilized
    tracks.forEach(t => t.mode = "hidden");

    /////////////////// Setup handlers ///////////////////
    const highlighter = new HtmlHighlighter();

    // Sync subtitle and text when video is playing/seeking is done
    this.vid.on("timeupdate", () => {
      // Any track is fine as they are expected to be consistent
      const activeTrackId = tracks[0].activeCues[0].id;
      
      // Get text ids of same start time
      const textIds = [];
      startTimes.forEach((t, i) => t == startTimes[activeTrackId] && textIds.push(i));
      
      // Set subtitles
      const subtitles = textIds.reduce((prev, id) => prev + ` <p> ${$(`#${id}`).html()}`, "");
      $(`#${subtitleId}`).html(subtitles);
      
      // Highlight text
      highlighter.clearHighlightByClass(textClasses);
      highlighter.highlightById(ids, highlightColor);
    })

    // Sync video when text is clicked
    // Subtitle and text highlighting will be automatically handled via timeupdate handler 
    $(textClasses.map(c => `.${c}`).join(", ")).click((e) => {
      // Video.js uses second while startTimes array uses 10 * second
      // +1 so that shift time pass prev interval
      const soughtTime = startTimes[e.currentTarget.id] / 10 + 1;
      this.vid.currentTime(soughtTime);
    });

    // Return Video.js player instance
    return this.vid;
  }
}

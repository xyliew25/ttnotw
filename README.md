# ttnotw

## Enhancement 1: Refine Feature
**Feature** 
- When a user seeks to a particular timestamp of the video, the corresponding text will be highlighted.

**Current implementation** 
- The `displayTime()` is called at 0.1s interval to update subtitles and highlight text when playing video. However, the update is only done if the seeked time is greater than the current time.

**Proposed implementation**
- Utilize the `remoteTextTracks` with the `hidden` mode to obtain the id of the `activeCue`. Note that WebVTT files are required.

## Enhancement 2: Refactor Code
- Restructure code into new classes
  - `HtmlHighlighter`
  - `Video`
    - This is a wrapper class of the [Video.js Player class](https://docs.videojs.com/player). Hence, any existing APIs provided by the `Player` class can also be called upon, e.g., to overwrite the pre-defined event handlers of the `Video` class.
- Add documentations following the [JSDoc](https://jsdoc.app/) syntax.
- Rearrange code blocks and add comments 
- Remove unused code

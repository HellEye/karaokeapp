import styled from "styled-components"
import { default as VideoPlayerComponent } from "./VideoPlayer"

const VideoPlayer = styled(VideoPlayerComponent)`
	height: 100%;
	width: 100%;
	video {
		max-height: 100%;
		max-width: 100%;
		z-index: 2;
		aspect-ratio: attr(width) / attr(height);
	}
`

export default VideoPlayer

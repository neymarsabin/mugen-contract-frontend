import "./styles.css";

const TwitchVideo = () => {
	return (
		<>
			<div className="video-card">
				<iframe
					src="https://player.twitch.tv/?channel=random_channel&parent=random_domain&muted=true"
					title={"twitch-video-embed"}
					height="100%"
					width="100%"
					allowFullscreen="true"
				></iframe>
			</div>
		</>
	);
};
export default TwitchVideo;

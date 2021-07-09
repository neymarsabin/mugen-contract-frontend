import BettingForm from '../../Body/BettingForm';
import "./styles.css";

const TwitchVideo = ({ contract }) => {
	return (
		<div style={{display: 'flex', flexDirection: 'column'}}>
			<div className="video-card">
				<iframe
					src="https://player.twitch.tv/?channel=random_channel&parent=random_domain&muted=true"
					title={"twitch-video-embed"}
					height="100%"
					width="100%"
					allowFullscreen="true"
				></iframe>
			</div>
      {
        contract &&
        <BettingForm
          contract={contract}
        />
      }
		</div>
	);
};
export default TwitchVideo;

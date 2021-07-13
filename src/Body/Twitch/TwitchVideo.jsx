import BettingForm from '../../Body/BettingForm';
import BetsOpenCloseNotification from '../../Body/BetsOpenCloseNotification';
import BettingAmountOptions from '../../Body/BettingAmountOptions';
import "./styles.css";

const TwitchVideo = ({ contract, gameStatus, balance }) => {
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
      <BetsOpenCloseNotification
        betStatus={gameStatus}
      />
      {
        contract &&
        <BettingForm
          contract={contract}
          balance={balance}
        />
      }
      <BettingAmountOptions
        contract={contract}
      />
		</div>
	);
};
export default TwitchVideo;

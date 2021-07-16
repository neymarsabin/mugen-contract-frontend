import { Spinner } from 'react-bootstrap';
import BettingForm from '../../Body/BettingForm';
import BetsOpenCloseNotification from '../../Body/BetsOpenCloseNotification';
import "./styles.css";

const TwitchVideo = ({
  contract,
  gameStatus,
  balance,
  bookHash,
  account
}) => {
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
      { (!gameStatus && contract) &&
        <div className="spinner-section">
          <Spinner
            animation="border"
            variant="success"
          />
          <div> Preparing for New Game </div>
        </div>
      }
      {
        gameStatus &&
        <BettingForm
          contract={contract}
          balance={balance}
          bookHash={bookHash}
          account={account}
        />
      }
		</div>
	);
};
export default TwitchVideo;

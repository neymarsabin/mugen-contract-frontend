import './styles.css';

const BetsOpenCloseNotification = ({ betStatus }) => {
  const notifyText = betStatus ? 'Bets are OPEN!' : 'Bets are Closed! till next game:';

  return(
    <>
      <div className={false ? 'bets-open' : 'bets-closed'}>
        {notifyText}
      </div>
    </>
  );
};

export default BetsOpenCloseNotification;

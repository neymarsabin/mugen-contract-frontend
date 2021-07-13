import './styles.css';

const BetsOpenCloseNotification = ({ betStatus }) => {
  const notifyText = betStatus ? 'Bets are OPEN!' : 'Bets are Closed! till next game:';

  return(
    <>
      <div className={betStatus ? 'bets-open' : 'bets-closed'}>
        {notifyText}
      </div>
    </>
  );
};

export default BetsOpenCloseNotification;

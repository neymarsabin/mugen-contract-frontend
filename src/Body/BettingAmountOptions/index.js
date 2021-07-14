import './styles.css';

const optionsArray = [
  {
    percent: 10,
    label: '10%'
  },
  {
    percent: 20,
    label: '20%'
  },
  {
    percent: 30,
    label: '30%'
  },
  {
    percent: 40,
    label: '40%'
  },
  {
    percent: 50,
    label: '50%'
  },
  {
    percent: 60,
    label: '60%'
  },
  {
    percent: 70,
    label: '70%'
  },
  {
    percent: 80,
    label: '80%'
  },
  {
    percent: 90,
    label: '90%'
  },
  {
    percent: 100,
    label: 'All'
  }
];

const BettingAmountOptions = ({ setBetAmount, balance, contract }) => {

  const calculateAmount = (value) => {
    const amount = balance * value/100;
    setBetAmount(amount.toFixed(0));
  };

  if(contract) {
    return(
      <div className="option-amount-wrapper">
        { optionsArray.map((option) => {
          return(
            <div>
              <button
                className="option-amount-button"
                onClick={() => calculateAmount(option.percent)}
              >
                {option.label}
              </button>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <></>;
  }
};

export default BettingAmountOptions;

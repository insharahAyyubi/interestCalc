import Header from "./components/Header/Header";
import ResultsTable from "./components/ResultsTable/ResultsTable";
import UserInput from "./components/UserInput/UserInput";
import {useState} from 'react';

function App() {
  const[userInput, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

  const yearlyData = []; 
  if(userInput) {
    let currentSavings = +userInput['current-savings']; 
    const yearlyContribution = +userInput['yearly-contribution']; 
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
  }
  }
 
  return (
    <div className="main">
      <Header />
      <UserInput onCalculate={calculateHandler}/>
      {!userInput && <p style={{textAlign:'center'}}>No data found</p>}
      {userInput && <ResultsTable data={yearlyData} inInvest={userInput['current-savings']}/>}
    </div>
  );
}

export default App;

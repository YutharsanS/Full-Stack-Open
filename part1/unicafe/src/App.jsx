import { useState } from "react";

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const Statistics = ({good, neutral, bad, isGathered}) => {
  const total = good - bad;
  const count = good + neutral + bad;

  if(isGathered){
  return (
      <>
        <tr>
          <td>Good</td>
          <td>{good}</td>
        </tr>

        <tr>
          <td>Neutral</td>
          <td>{neutral}</td>
        </tr>

        <tr>
          <td>Bad</td>
          <td>{bad}</td>
        </tr>

        <tr>
          <td>All</td>
          <td>{count}</td>
        </tr>

        <tr>
          <td>Average</td>
          <td>{total / count}</td>
        </tr>

        <tr>
          <td>Positive</td>
          <td>{100 * good / count}%</td>
        </tr>
      </>
    );
  } else {
    return (
      <p>No feedback given</p>
    );
  }
};

const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [isGathered, setIsGathered] = useState(false);


  const handleClick = (value, handler) => () => {
    handler(value + 1)
    setIsGathered(true);
  }

  return (
    <>
      <h1>Give Feedback</h1>

      <Button handleClick={handleClick(good, setGood)} text='Good'/>
      <Button handleClick={handleClick(neutral, setNeutral)} text='Neutral'/>
      <Button handleClick={handleClick(bad, setBad)} text='Bad'/>

      <h1>Statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} isGathered={isGathered}/>
    </>
  );
}

export default App;
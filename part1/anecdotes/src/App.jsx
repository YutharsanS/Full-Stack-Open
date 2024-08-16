import { useState } from 'react'

const Button = ({handler, text}) => {
  return (
    <button onClick={handler}>{text}</button>
  );
}

const VoteText = ({array, index}) => (
  <p>has {array[index]} votes</p>
);

const Anecdote = ({titleText, text, states, selected}) => (
  <>
    <h1>{titleText}</h1>
    <p>{text}</p>
    <VoteText array={states} index={selected}/>
  </>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [states, setStates] = useState(Array(anecdotes.length).fill(0));
  const [maxState, setMaxState] = useState(0);

  const selectNextAnecdote = () => {
    let r = Math.floor(Math.random() * (anecdotes.length) - 1);
    if(r === selected || r < 0){
      r = (r + 1) % anecdotes.length;
    }
    setSelected(r);
  }

  const handleVotes = () => {
    const state = [...states];
    state[selected]++;

    setStates(state);

    if(state[selected] >= state[maxState]){
      setMaxState(selected);
    }
  }

  return (
    <div>
      <Anecdote titleText={'Anecdote of the day'} text={anecdotes[selected]} states={states} selected={selected}/>
      <Button handler={handleVotes} text={'vote'} />
      <Button handler={selectNextAnecdote} text='next anecdote' />
      <Anecdote titleText={'Anecdote with most votes'} text={anecdotes[maxState]} states={states} selected={maxState}/>
    </div>
  )
}

export default App
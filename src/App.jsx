import { useState } from 'react';
import CharacterCreator from './components/CharacterCreator';
import DecisionGame from './components/DecisionGame';
import ResultScreen from './components/ResultScreen';
import { calculateBounty } from './utils/bountyCalculator';

const STEPS = { CREATE: 'create', PLAY: 'play', RESULT: 'result' };

export default function App() {
  const [step, setStep] = useState(STEPS.CREATE);
  const [character, setCharacter] = useState(null);
  const [decisions, setDecisions] = useState([]);

  function handleCharacterComplete(char) {
    setCharacter(char);
    setStep(STEPS.PLAY);
  }

  function handleDecisionsComplete(dec) {
    setDecisions(dec);
    setStep(STEPS.RESULT);
  }

  function handleRestart() {
    setCharacter(null);
    setDecisions([]);
    setStep(STEPS.CREATE);
  }

  if (step === STEPS.CREATE) return <CharacterCreator onComplete={handleCharacterComplete} />;
  if (step === STEPS.PLAY) return <DecisionGame character={character} onComplete={handleDecisionsComplete} />;
  if (step === STEPS.RESULT)
    return (
      <ResultScreen
        character={character}
        bounty={calculateBounty(character, decisions)}
        decisions={decisions}
        onRestart={handleRestart}
      />
    );
}

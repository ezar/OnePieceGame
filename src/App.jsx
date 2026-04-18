import { useState } from 'react';
import CharacterCreator from './components/CharacterCreator';
import DecisionGame from './components/DecisionGame';
import ResultScreen from './components/ResultScreen';
import { calculateBounty } from './utils/bountyCalculator';

const STEPS = { CREATE: 'create', PLAY: 'play', RESULT: 'result' };

function OceanBg() {
  return (
    <div className="ocean-bg">
      <div className="wave wave1" />
      <div className="wave wave2" />
      <div className="wave wave3" />
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(STEPS.CREATE);
  const [character, setCharacter] = useState(null);
  const [decisions, setDecisions] = useState([]);
  const [crew, setCrew] = useState([]);

  function handleCharacterComplete(char) {
    setCharacter(char);
    setStep(STEPS.PLAY);
  }

  function handleDecisionsComplete(dec, newCrew) {
    setDecisions(dec);
    setCrew(newCrew);
    setStep(STEPS.RESULT);
  }

  function handleRestart() {
    setCharacter(null);
    setDecisions([]);
    setCrew([]);
    setStep(STEPS.CREATE);
  }

  return (
    <>
      <OceanBg />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {step === STEPS.CREATE && <CharacterCreator onComplete={handleCharacterComplete} />}
        {step === STEPS.PLAY && (
          <DecisionGame character={character} onComplete={handleDecisionsComplete} />
        )}
        {step === STEPS.RESULT && (
          <ResultScreen
            character={character}
            bounty={calculateBounty(character, decisions)}
            decisions={decisions}
            crew={crew}
            onRestart={handleRestart}
          />
        )}
      </div>
    </>
  );
}

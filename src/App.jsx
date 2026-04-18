import { useState } from 'react';
import CharacterCreator from './components/CharacterCreator';
import DecisionGame from './components/DecisionGame';
import ResultScreen from './components/ResultScreen';
import { calculateBounty } from './utils/bountyCalculator';
import { LangProvider, useLang } from './i18n/LangContext';

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

function LangToggle() {
  const { t, toggleLang } = useLang();
  return (
    <button
      onClick={toggleLang}
      className="fixed top-3 right-3 z-50 px-3 py-1.5 rounded-xl font-black text-sm border-2 border-white/20 text-white/70 hover:border-yellow-400 hover:text-yellow-400 active:scale-95 transition-all"
      style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)' }}
    >
      {t.switchTo}
    </button>
  );
}

function AppInner() {
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
      <LangToggle />
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

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}

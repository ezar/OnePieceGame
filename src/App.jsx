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

/* global __BUILD_DATE__ */

function Footer() {
  const { t } = useLang();
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 py-1.5 px-4 text-center"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}>
      <span className="text-white/35 text-xs">{t.footer.disclaimer}</span>
      <span className="text-white/20 text-xs">·</span>
      <span className="text-white/25 text-xs font-mono">{__BUILD_DATE__}</span>
    </footer>
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
      <div style={{ position: 'relative', zIndex: 1, paddingBottom: '2rem' }}>
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
      <Footer />
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

import { useState } from 'react';
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";

type Record = {
  score: number;
  date: string;
};

function App() {
  const [records, setRecords] = useState<Record[]>(() => {
    const stored = localStorage.getItem('records');
    return stored ? JSON.parse(stored) : [];
  });

  const [screen, setScreen] = useState<'game' | 'result'>('game');
  const [score, setScore] = useState(0);

  const handleGameStart = () => {
    setScreen('game');
  };

  const handleGameEnd = (finalScore: number) => {
    const now = new Date();
    const date = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newRecord: Record = { score: finalScore, date };
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    localStorage.setItem('records', JSON.stringify(updatedRecords));

    setScore(finalScore);
    setScreen('result');
  };

  const handleBackToHome = () => {
    setScreen('game');
  };

  const handleDelete = (index: number) => {
    const updated = [...records];
    updated.splice(index, 1);
    setRecords(updated);
    localStorage.setItem('records', JSON.stringify(updated));
  };

  if (screen === 'game') {
    return <GameScreen onGameEnd={handleGameEnd} />;
  }

  if (screen === 'result') {
    return <ResultScreen records={records} setRecords={setRecords} score={score} onBack={handleBackToHome} />;
  }

  return (
    <main>
      <div className="container">
        <h1>腕立てカウンター</h1>
        <button onClick={handleGameStart} className="startBtn">スタート</button>
        <h3>過去の記録一覧</h3>
        <ul>
          {records.slice().reverse().map((r, i) => (
            <li key={i}>
              {r.date} : {r.score}回
              <button onClick={() => handleDelete(records.length - 1 - i)}>削除</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;

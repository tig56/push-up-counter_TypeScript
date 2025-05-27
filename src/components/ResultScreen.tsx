import React, { useEffect, useRef } from 'react';
import Confetti from 'react-confetti';

type Record = {
  score: number;
  date: string;
};

type ResultScreenProps = {
  records: Record[];
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>;
  score: number;
  onBack: () => void;
};

function ResultScreen({ records, setRecords, score, onBack }: ResultScreenProps) {
  const bestScore = Math.max(...records.map(r => r.score));

  const resultSound = useRef(new Audio(import.meta.env.BASE_URL + 'result.mp3'));

  useEffect(() => {
    resultSound.current.play();
  }, []);

  const handleDelete = (index: number) => {
    const updated = [...records];
    updated.splice(index, 1);
    setRecords(updated);
    localStorage.setItem('records', JSON.stringify(updated));
  };

  return (
    <div className="container">
      <h1>お疲れ様でした!</h1>
      <h2>結果</h2>
      <p>今回の記録: <span>{score}</span>回</p>
      <p>最高記録: <span>{bestScore}</span>回</p>
      <p>消費カロリー: <span>{(score * 0.42).toFixed(2)}</span>kcal</p>
      <h3>過去の記録一覧</h3>
      <ul id="recordList">
        {[...records].reverse().map((r, i) => (
          <li key={i}>
            {r.date} : {r.score}回
            <button onClick={() => handleDelete(records.length - 1 - i)}>削除</button>
          </li>
        ))}
      </ul>
      <button id="backBtn" onClick={onBack}>戻る</button>
      <Confetti />
    </div>
  );
}

export default ResultScreen;

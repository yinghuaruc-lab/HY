import { useState, useEffect } from 'react';
import { Experiment, DailyRecord } from '../types';

interface ExperimentProps {
  experiment: Experiment;
  onSaveRecord: (day: number, record: Omit<DailyRecord, 'day' | 'date'>) => void;
  onComplete: () => void;
  onBack: () => void;
}

export function ExperimentView({ experiment, onSaveRecord, onComplete, onBack }: ExperimentProps) {
  const currentDay = experiment.records.length + 1;
  const isCompleted = experiment.status === 'completed';
  const isLastDay = currentDay === 14;

  const [weight, setWeight] = useState<number | ''>('');
  const [hunger, setHunger] = useState<number>(3);
  const [completed, setCompleted] = useState(false);
  const [urge, setUrge] = useState<number | null>(null);

  // 重置表单状态
  const resetForm = () => {
    setWeight('');
    setHunger(3);
    setCompleted(false);
    setUrge(null);
  };

  // 加载现有记录或重置
  useEffect(() => {
    if (!isCompleted && currentDay <= 14) {
      const existingRecord = experiment.records.find(r => r.day === currentDay);
      if (existingRecord) {
        setWeight(existingRecord.weight ?? '');
        setHunger(existingRecord.hunger ?? 3);
        setCompleted(existingRecord.completed);
        setUrge(existingRecord.urge ?? null);
      } else {
        resetForm();
      }
    }
  }, [currentDay, isCompleted]);

  // 当 records 数量增加时，说明刚保存完，自动重置
  useEffect(() => {
    if (!isCompleted && currentDay <= 14) {
      const hasRecord = experiment.records.some(r => r.day === currentDay - 1);
      if (hasRecord && weight !== '') {
        // 刚保存完第 currentDay-1 天，自动重置表单
        resetForm();
      }
    }
  }, [experiment.records.length, isCompleted, currentDay]);

  if (isCompleted || currentDay > 14) {
    onComplete();
    return null;
  }

  const handleSave = () => {
    const record = {
      weight: weight === '' ? null : weight,
      hunger,
      completed,
      urge: urge ?? null,
    };
    onSaveRecord(currentDay, record);
    // 立即重置表单，等待 records 更新可能有时序问题
    resetForm();
  };

  return (
    <div className="container">
      <nav className="nav">
        <div className="nav-back" onClick={onBack}>← 返回</div>
      </nav>

      <header className="experiment-header">
        <h1 className="experiment-title">{experiment.protocolTitle}</h1>
        <p className="experiment-progress">
          第 {currentDay} / 14 天
        </p>
        <div className="progress-bar" style={{ marginTop: '12px' }}>
          <div
            className="progress-fill"
            style={{ width: `${(currentDay / 14) * 100}%` }}
          />
        </div>
      </header>

      <div className="card">
        <div className="day-label">Day {currentDay}</div>

        <div className="form-group">
          <label className="form-label">晨起体重（公斤）</label>
          <input
            type="number"
            className="form-input"
            placeholder="例如：65.5"
            value={weight}
            onChange={e => setWeight(e.target.value ? parseFloat(e.target.value) : '')}
            step="0.1"
            min="30"
            max="200"
          />
        </div>

        <div className="form-group">
          <label className="form-label">今日饥饿感</label>
          <div className="slider-container">
            <div className="slider-value">{hunger}</div>
            <input
              type="range"
              className="slider"
              min="1"
              max="5"
              value={hunger}
              onChange={e => setHunger(parseInt(e.target.value))}
            />
            <div className="slider-labels">
              <span>几乎没有</span>
              <span>非常强烈</span>
            </div>
          </div>
        </div>

        <div className="toggle-container" style={{ borderTop: 'none', paddingTop: 0 }}>
          <span className="toggle-label">今天是否完成了实验要求</span>
          <div
            className={`toggle ${completed ? 'active' : ''}`}
            onClick={() => setCompleted(!completed)}
          />
        </div>

        <div className="form-group" style={{ marginTop: '24px' }}>
          <label className="form-label">暴食冲动（可选）</label>
          <div className="slider-container">
            <div className="slider-value">{urge ?? '-'}</div>
            <input
              type="range"
              className="slider"
              min="1"
              max="5"
              value={urge ?? 1}
              onChange={e => setUrge(parseInt(e.target.value))}
              style={{ opacity: urge ? 1 : 0.5 }}
            />
            <div className="slider-labels">
              <span>无</span>
              <span>强烈</span>
            </div>
          </div>
        </div>

        <button
          className="btn btn-primary btn-full"
          style={{ marginTop: '16px' }}
          onClick={handleSave}
          disabled={weight === ''}
        >
          {isLastDay ? '完成实验' : '保存并继续'}
        </button>
      </div>
    </div>
  );
}

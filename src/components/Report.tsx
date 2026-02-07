import { Experiment } from '../types';

interface ReportProps {
  experiment: Experiment;
  onRestart: () => void;
  onBack: () => void;
}

export function Report({ experiment, onRestart, onBack }: ReportProps) {
  const records = experiment.records;

  const completedDays = records.filter(r => r.completed);
  const incompleteDays = records.filter(r => !r.completed);

  const getAvgWeight = (items: typeof records) => {
    const weights = items.filter(r => r.weight != null).map(r => r.weight as number);
    if (weights.length === 0) return null;
    return (weights.reduce((a, b) => a + b, 0) / weights.length).toFixed(1);
  };

  // Calculate weekly trends
  const firstWeekCompleted = completedDays.filter(r => r.day <= 7);
  const secondWeekCompleted = completedDays.filter(r => r.day > 7);
  const firstWeekIncomplete = incompleteDays.filter(r => r.day <= 7);
  const secondWeekIncomplete = incompleteDays.filter(r => r.day > 7);

  const firstWeekCompletedAvg = getAvgWeight(firstWeekCompleted);
  const secondWeekCompletedAvg = getAvgWeight(secondWeekCompleted);
  const firstWeekIncompleteAvg = getAvgWeight(firstWeekIncomplete);
  const secondWeekIncompleteAvg = getAvgWeight(secondWeekIncomplete);

  // Generate conclusion
  const generateConclusion = () => {
    const hasEnoughData = completedDays.length >= 3;
    const hasCompletedData = firstWeekCompletedAvg && secondWeekCompletedAvg;
    const hasIncompleteData = firstWeekIncompleteAvg && secondWeekIncompleteAvg;

    if (!hasEnoughData) {
      return {
        text: '数据样本较少，建议坚持完整记录以获得更有意义的反馈。',
        suggestion: '保持记录习惯，身体的变化需要时间才能显现。',
      };
    }

    let conclusion = '';
    let suggestion = '';

    if (hasCompletedData) {
      const diff = parseFloat(firstWeekCompletedAvg) - parseFloat(secondWeekCompletedAvg);
      if (Math.abs(diff) < 0.3) {
        conclusion = '在完成实验要求的日子里，你的体重保持相对稳定。';
        suggestion = '可以尝试将实验周期延长，观察长期效果。';
      } else if (diff > 0) {
        conclusion = '随着实验推进，完成日的体重呈现下降趋势。';
        suggestion = '你的身体正在适应这个改变，请继续保持。';
      } else {
        conclusion = '有趣的是，在完成实验的后期，体重有轻微上升。';
        suggestion = '这可能是身体在适应新的节奏，关注整体感受比数字更重要。';
      }
    }

    if (hasIncompleteData && firstWeekIncompleteAvg && secondWeekIncompleteAvg) {
      const incompleteDiff = parseFloat(firstWeekIncompleteAvg) - parseFloat(secondWeekIncompleteAvg);
      if (hasCompletedData) {
        conclusion += ` 完成日与未完成日的体重变化模式存在差异。`;
        suggestion = `建议关注哪些情况下更容易坚持，以及坚持时的身体感受。`;
      } else if (incompleteDiff > 0) {
        conclusion = '即使未完成的日子，体重也有下降趋势。';
        suggestion = '也许实验带来的意识改变比严格执行更有影响。';
      }
    }

    if (!hasCompletedData && !hasIncompleteData) {
      conclusion = '记录中缺乏体重数据，无法进行趋势分析。';
      suggestion = '建议在晨起时测量体重，并持续记录。';
    }

    return { text: conclusion, suggestion };
  };

  const { text: conclusion, suggestion } = generateConclusion();

  // Calculate stats
  const avgHunger = records.length > 0
    ? (records.reduce((sum, r) => sum + (r.hunger || 0), 0) / records.length).toFixed(1)
    : '-';

  const avgUrge = records.filter(r => r.urge != null);
  const avgUrgeValue = avgUrge.length > 0
    ? (avgUrge.reduce((sum, r) => sum + (r.urge as number), 0) / avgUrge.length).toFixed(1)
    : '-';

  const completionRate = ((completedDays.length / 14) * 100).toFixed(0);

  const startWeight = records.find(r => r.day === 1)?.weight;
  const endWeight = records.find(r => r.day === 14)?.weight;
  const weightChange = (startWeight && endWeight)
    ? (endWeight - startWeight).toFixed(1)
    : '-';

  return (
    <div className="container">
      <nav className="nav">
        <div className="nav-back" onClick={onBack}>← 返回首页</div>
      </nav>

      <header className="header" style={{ borderBottom: 'none', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px' }}>{experiment.protocolTitle}</h1>
        <p>14 天实验报告</p>
      </header>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-value">{completionRate}%</div>
          <div className="stat-label">完成率</div>
        </div>
        <div className="card stat-card">
          <div className="stat-value">{avgHunger}</div>
          <div className="stat-label">平均饥饿感</div>
        </div>
        <div className="card stat-card">
          <div className="stat-value">{weightChange}</div>
          <div className="stat-label">体重变化(kg)</div>
        </div>
      </div>

      <div className="card conclusion-card">
        <div className="conclusion-title">结论</div>
        <p className="conclusion-text">{conclusion}</p>
      </div>

      <div className="card conclusion-card" style={{ marginTop: '16px' }}>
        <div className="conclusion-title">建议</div>
        <p className="conclusion-text">{suggestion}</p>
      </div>

      {avgUrgeValue !== '-' && (
        <div className="card" style={{ marginTop: '16px' }}>
          <div className="form-label">暴食冲动记录</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '32px', fontWeight: 600, color: 'var(--accent)' }}>
              {avgUrgeValue}
            </span>
            <span style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>
              平均分 (1-5)
            </span>
          </div>
        </div>
      )}

      <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
        <button className="btn btn-secondary btn-full" onClick={onRestart}>
          开始新实验
        </button>
      </div>
    </div>
  );
}

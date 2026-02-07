import { protocols } from '../data/protocols';
import { Experiment } from '../types';

interface HomeProps {
  experiments: Experiment[];
  onSelect: (protocolId: string, protocolTitle: string) => void;
}

export function Home({ experiments, onSelect }: HomeProps) {
  const activeExperiments = experiments.filter(e => e.status === 'active');
  const completedExperiments = experiments.filter(e => e.status === 'completed');

  return (
    <div className="container">
      <header className="header">
        <h1>体重管理健康实验室</h1>
        <p>用科学的方法，了解身体的反馈</p>
      </header>

      {experiments.length === 0 ? (
        <div className="protocol-grid">
          {protocols.map(protocol => (
            <div
              key={protocol.id}
              className="card protocol-card"
              onClick={() => onSelect(protocol.id, protocol.title)}
            >
              <div className="icon">{protocol.icon}</div>
              <h3>{protocol.title}</h3>
              <p>{protocol.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <>
          {activeExperiments.length > 0 && (
            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--text-tertiary)' }}>
                进行中的实验
              </h2>
              <div className="card protocol-card" onClick={() => onSelect(
                activeExperiments[0].protocolId,
                activeExperiments[0].protocolTitle
              )}>
                <div className="icon">
                  {protocols.find(p => p.id === activeExperiments[0].protocolId)?.icon}
                </div>
                <h3>{activeExperiments[0].protocolTitle}</h3>
                <p>第 {activeExperiments[0].records.length} / 14 天</p>
                <div className="progress-bar" style={{ marginTop: '12px' }}>
                  <div
                    className="progress-fill"
                    style={{ width: `${(activeExperiments[0].records.length / 14) * 100}%` }}
                  />
                </div>
              </div>
            </section>
          )}

          {completedExperiments.length > 0 && (
            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--text-tertiary)' }}>
                已完成的实验
              </h2>
              <div className="card protocol-card" onClick={() => onSelect(
                completedExperiments[0].protocolId,
                completedExperiments[0].protocolTitle
              )}>
                <div className="icon">
                  {protocols.find(p => p.id === completedExperiments[0].protocolId)?.icon}
                </div>
                <h3>{completedExperiments[0].protocolTitle}</h3>
                <p>14 天实验已完成</p>
              </div>
            </section>
          )}

          <section>
            <h2 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--text-tertiary)' }}>
              开始新实验
            </h2>
            <div className="protocol-grid">
              {protocols.map(protocol => (
                <div
                  key={protocol.id}
                  className="card protocol-card"
                  onClick={() => onSelect(protocol.id, protocol.title)}
                >
                  <div className="icon">{protocol.icon}</div>
                  <h3>{protocol.title}</h3>
                  <p>{protocol.description}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

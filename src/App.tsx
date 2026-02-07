import { useState } from 'react';
import { Home } from './components/Home';
import { ExperimentView } from './components/Experiment';
import { Report } from './components/Report';
import { useExperiments } from './hooks/useStorage';
import { DailyRecord } from './types';

type View = 'home' | 'experiment' | 'report';

function App() {
  const { experiments, createExperiment, updateExperiment, addRecord, updateRecord } = useExperiments();
  const [view, setView] = useState<View>('home');
  const [currentExperimentId, setCurrentExperimentId] = useState<string | null>(null);

  const handleSelectProtocol = (protocolId: string, protocolTitle: string) => {
    const existing = experiments.find(
      e => e.protocolId === protocolId && e.status === 'active'
    );

    if (existing) {
      setCurrentExperimentId(existing.id);
      setView('experiment');
    } else {
      const newExp = createExperiment(protocolId, protocolTitle);
      setCurrentExperimentId(newExp.id);
      setView('experiment');
    }
  };

  const handleSaveRecord = (day: number, record: Omit<DailyRecord, 'day' | 'date'>) => {
    if (!currentExperimentId) return;
    const experiment = experiments.find(e => e.id === currentExperimentId);
    if (!experiment) return;

    const existingRecord = experiment.records.find(r => r.day === day);
    if (existingRecord) {
      updateRecord(currentExperimentId, day, record);
    } else {
      addRecord(currentExperimentId, {
        ...record,
        date: new Date().toISOString(),
      });
    }
  };

  const handleComplete = () => {
    if (currentExperimentId) {
      updateExperiment(currentExperimentId, { status: 'completed' });
      setView('report');
    }
  };

  const handleBack = () => {
    setView('home');
    setCurrentExperimentId(null);
  };

  const handleRestart = () => {
    setView('home');
    setCurrentExperimentId(null);
  };

  const reportExperiment = view === 'report' && currentExperimentId
    ? experiments.find(e => e.id === currentExperimentId)
    : null;

  const experimentViewExperiment = view === 'experiment' && currentExperimentId
    ? experiments.find(e => e.id === currentExperimentId)
    : null;

  switch (view) {
    case 'home':
      return <Home experiments={experiments} onSelect={handleSelectProtocol} />;
    case 'experiment':
      if (!experimentViewExperiment) {
        setView('home');
        return null;
      }
      return (
        <ExperimentView
          experiment={experimentViewExperiment}
          onSaveRecord={handleSaveRecord}
          onComplete={handleComplete}
          onBack={handleBack}
        />
      );
    case 'report':
      if (!reportExperiment) {
        setView('home');
        return null;
      }
      return (
        <Report
          experiment={reportExperiment}
          onRestart={handleRestart}
          onBack={handleBack}
        />
      );
    default:
      return null;
  }
}

export default App;

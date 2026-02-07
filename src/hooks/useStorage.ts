import { useState, useEffect, useCallback } from 'react';
import { Experiment, STORAGE_KEY } from '../types';

export function useExperiments() {
  const [experiments, setExperiments] = useState<Experiment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(experiments));
  }, [experiments]);

  const createExperiment = useCallback((protocolId: string, protocolTitle: string) => {
    const newExperiment: Experiment = {
      id: crypto.randomUUID(),
      protocolId,
      protocolTitle,
      startDate: new Date().toISOString(),
      status: 'active',
      records: [],
    };
    setExperiments(prev => [...prev, newExperiment]);
    return newExperiment;
  }, []);

  const updateExperiment = useCallback((id: string, updates: Partial<Experiment>) => {
    setExperiments(prev => prev.map(exp =>
      exp.id === id ? { ...exp, ...updates } : exp
    ));
  }, []);

  const addRecord = useCallback((experimentId: string, record: Omit<Experiment['records'][0], 'day'>) => {
    setExperiments(prev => prev.map(exp => {
      if (exp.id !== experimentId) return exp;
      const day = exp.records.length + 1;
      if (day > 14) return exp;
      return {
        ...exp,
        records: [...exp.records, { ...record, day }],
      };
    }));
  }, []);

  const updateRecord = useCallback((experimentId: string, day: number, updates: Partial<Experiment['records'][0]>) => {
    setExperiments(prev => prev.map(exp =>
      exp.id === experimentId
        ? {
            ...exp,
            records: exp.records.map(r =>
              r.day === day ? { ...r, ...updates } : r
            ),
          }
        : exp
    ));
  }, []);

  const deleteExperiment = useCallback((id: string) => {
    setExperiments(prev => prev.filter(exp => exp.id !== id));
  }, []);

  return {
    experiments,
    createExperiment,
    updateExperiment,
    addRecord,
    updateRecord,
    deleteExperiment,
  };
}

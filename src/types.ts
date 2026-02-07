export interface DailyRecord {
  day: number;
  weight: number | null;
  hunger: number | null;
  completed: boolean;
  urge: number | null; // 暴食冲动 1-5
  date: string;
}

export interface Experiment {
  id: string;
  protocolId: string;
  protocolTitle: string;
  startDate: string;
  status: 'active' | 'completed';
  records: DailyRecord[];
}

export const STORAGE_KEY = 'weight_lab_experiments';

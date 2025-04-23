import { create } from 'zustand';
import { createSelectors } from '@/helpers/createSelectors';
import { BpmnDiagram } from '@/types/bpmn';

interface DiagramState {
  diagram: BpmnDiagram | null;
  isLoading: boolean;
  error: string | null;
}

interface DiagramActions {
  setDiagram: (data: BpmnDiagram) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useDiagramStoreBase = create<DiagramState & DiagramActions>((set) => ({
  diagram: null,
  isLoading: false,
  error: null,
  setDiagram: (data) => set({ diagram: data }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set({ diagram: null, error: null }),
}));

export const useDiagramStore = createSelectors(useDiagramStoreBase);
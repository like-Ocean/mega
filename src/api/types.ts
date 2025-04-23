import { BpmnElementType } from '@/types/bpmn';

export type ApiBpmnElement = {
    id: string;
    shape: BpmnElementType | 'bpmn-edge';
    position?: { x: number; y: number };
    source?: string;
    target?: string;
    width?: number;
    height?: number;
    label?: string;
};

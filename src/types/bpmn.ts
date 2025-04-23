import { Node } from '@antv/x6';

export type BpmnElementType = 'event' | 'activity' | 'gateway';

export type BpmnNode = {
    id: string;
    type: BpmnElementType;
    position: { x: number; y: number };
    label?: string;
    width: number;
    height: number;
    attrs?: Node.Metadata['attrs']; // Для кастомизации через X6
};

export type BpmnEdge = {
    id: string;
    type: 'bpmn-edge';
    source: string;
    target: string;
    attrs?: Node.Metadata['attrs']; // Добавить и для edges
};

export type BpmnDiagram = {
    nodes: BpmnNode[];
    edges: BpmnEdge[];
};

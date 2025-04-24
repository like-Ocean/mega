import { Node } from '@antv/x6';

export type BpmnElementType = 'event' | 'activity' | 'gateway';

export type BpmnNode = {
    id: string;
    type: BpmnElementType;
    position: { x: number; y: number };
    label?: string;
    width: number;
    height: number;
    attrs?: Node.Metadata['attrs'];
};

export type BpmnEdgeLabel = {
    position?: number;
    attrs?: {
        labelText?: {
            text?: string;
            fontSize?: number;
            fill?: string;
        };
        labelBg?: {
            fill?: string;
            stroke?: string;
        };
    };
};

export type BpmnEdge = {
    id: string;
    type: 'bpmn-edge';
    source: string;
    target: string;
    labels?: (string | BpmnEdgeLabel)[];
    attrs?: Node.Metadata['attrs'];
};

export type BpmnDiagram = {
    nodes: BpmnNode[];
    edges: BpmnEdge[];
};

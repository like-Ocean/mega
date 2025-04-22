import { Node } from '@antv/x6';

export type Position = {
  x: number;
  y: number;
};

export type BpmnNode = {
  id: string;
  shape: string;
  width: number;
  height: number;
  position: Position;
  label?: string;
  attrs?: Node.Metadata['attrs']; // Use Node.Metadata['attrs']
};

export type BpmnEdge = {
  id: string;
  shape: string;
  source: string;
  target: string;
};

export type DiagramNode = {
  id: string;
  shape: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  attrs?: Node.Metadata['attrs']; // Use Node.Metadata['attrs']
};

export type DiagramEdge = {
  id: string;
  source: string;
  target: string;
  shape?: string;
};

export type DiagramData = {
  nodes?: DiagramNode[];
  edges?: DiagramEdge[];
};

export type ApiResponse = {
  bpmn: Array<BpmnNode | BpmnEdge>;
};

export type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};
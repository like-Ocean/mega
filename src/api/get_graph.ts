import { ApiResponse, DiagramData, BpmnNode, BpmnEdge } from '../types/common';

export const sendUserInput = async (inputText: string): Promise<DiagramData> => {
  const response = await fetch('http://localhost:8000/api/user_input/text', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_input: inputText,
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const mockResponse: ApiResponse = await response.json();

  const isNode = (item: BpmnNode | BpmnEdge): item is BpmnNode => {
    return (item as BpmnNode).position !== undefined;
  };

  return {
    nodes: mockResponse.bpmn
      .filter(isNode)
      .map((node) => ({
        id: node.id,
        shape: node.shape,
        x: node.position.x,
        y: node.position.y,
        width: node.width,
        height: node.height,
        label: node.label,
        attrs: node.attrs,
      })),
    edges: mockResponse.bpmn
      .filter((item): item is BpmnEdge => item.shape === 'bpmn-edge')
      .map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        shape: edge.shape,
      })),
  };
};
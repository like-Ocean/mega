import { useEffect, useRef } from 'react';
import { Graph } from '@antv/x6';
import { registerBpmnShapes } from './registerBpmnShapes';
import { BpmnDiagram as BpmnDiagramType } from '@/types/bpmn';

interface BpmnDiagramProps {
  data: BpmnDiagramType | null;
}

export const BpmnDiagram = ({ data }: BpmnDiagramProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    registerBpmnShapes();
    
    graphRef.current = new Graph({
      container: containerRef.current,
      grid: true,
      panning: true,
      background: { color: '#f5f5f5' },
    });

    return () => graphRef.current?.dispose();
  }, []);

  useEffect(() => {
    if (!graphRef.current || !data) return;

    graphRef.current.clearCells();

    data.nodes.forEach((node) => {
      graphRef.current?.addNode({
        id: node.id,
        shape: node.type,
        x: node.position.x,
        y: node.position.y,
        width: node.width,
        height: node.height,
        label: node.label,
        attrs: {
          label: {
            text: node.label,
            fontSize: 12,
          },
        },
      });
    });

    data.edges.forEach((edge) => {
      graphRef.current?.addEdge({
        id: edge.id,
        shape: 'bpmn-edge',
        source: edge.source,
        target: edge.target,
      });
    });

    graphRef.current.zoomToFit({ padding: 20 });

  }, [data]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '600px', 
        border: '1px solid #ddd' 
      }} 
    />
  );
};
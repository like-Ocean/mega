import { useState, useEffect, useRef } from 'react';
import { Graph } from '@antv/x6';
import { registerBpmnShapes } from './registerBpmnShapes';
import { DiagramData } from '../../types/common';

interface BpmnDiagramProps {
  data?: DiagramData;
}

export const BpmnDiagram = ({ data }: BpmnDiagramProps) => {
  const [graph, setGraph] = useState<Graph | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Инициализация графа
  useEffect(() => {
    if (containerRef.current && !graph) {
      registerBpmnShapes();

      const newGraph = new Graph({
        container: containerRef.current,
        grid: true,
        background: { color: '#f5f5f5' },
      });

      setGraph(newGraph);
    }

    return () => {
      graph?.dispose();
    };
  }, [graph]);

  // Обновление диаграммы при изменении данных
  useEffect(() => {
    if (graph && data) {
      try {
        graph.clearCells();

        data.nodes?.forEach((node) => {
          if (!node.id) {
            console.error('Node is missing id:', node);
            return;
          }

          graph.addNode({
            id: node.id,
            shape: node.shape,
            x: node.x,
            y: node.y,
            width: node.width,
            height: node.height,
            label: node.label,
            attrs: node.attrs || {
              body: {
                fill: '#ffffff',
                stroke: '#000000',
                strokeWidth: 2,
              },
            },
          });
        });

        data.edges?.forEach((edge) => {
          if (!edge.source || !edge.target) {
            console.error('Edge is missing source or target:', edge);
            return;
          }

          const sourceNode = graph.getCellById(edge.source);
          const targetNode = graph.getCellById(edge.target);

          if (!sourceNode || !targetNode) {
            console.error(`Node not found for edge:`, edge);
            return;
          }

          graph.addEdge({
            shape: edge.shape || 'bpmn-edge',
            source: edge.source,
            target: edge.target,
          });
        });
      } catch (error) {
        console.error('Error rendering BPMN diagram:', error);
      }
    }
  }, [graph, data]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '84vh',
        border: '1px dashed #d9d9d9',
        borderRadius: '8px',
      }}
    />
  );
};
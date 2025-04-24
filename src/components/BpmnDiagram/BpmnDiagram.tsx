import { useEffect, useRef } from 'react';
import { Graph } from '@antv/x6';
import { registerBpmnShapes } from './registerBpmnShapes';
import { BpmnDiagram as BpmnDiagramType, BpmnEdge } from '@/types/bpmn';

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
            mousewheel: {
                enabled: true,
                modifiers: 'ctrl',
            },
            background: { color: '#f5f5f5' }
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
                        textWrap: {
                            width: node.width - 20,
                            ellipsis: true,
                        },
                        title: node.label,
                    },
                },
            });
        });

        const edgesBySource = data.edges.reduce((acc, edge) => {
            acc[edge.source] = acc[edge.source] || [];
            acc[edge.source].push(edge);
            return acc;
        }, {} as Record<string, BpmnEdge[]>);

        data.edges.forEach((edge) => {
            const sourceNode = data.nodes.find(n => n.id === edge.source);
            const isGateway = sourceNode?.type === 'gateway';
            const edgesFromSource = edgesBySource[edge.source] || [];
            
            const autoLabels = [];
            if (isGateway && edgesFromSource.length > 1) {
                const index = edgesFromSource.findIndex(e => e.id === edge.id);
                autoLabels.push({
                    position: 0.6,
                    attrs: {
                        labelText: {
                            text: index === 0 ? 'Да' : 'Нет',
                            fill: '#070707',
                            fontSize: 12
                        }
                    }
                });
            }

            graphRef.current?.addEdge({
                id: edge.id,
                shape: 'bpmn-edge',
                source: edge.source,
                target: edge.target,
                labels: [...autoLabels, ...(edge.labels || [])],
                attrs: edge.attrs
            });
        });

        graphRef.current.zoomToFit({ padding: 20, maxScale: 1 });
    }, [data]);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '600px',
                border: '1px solid #ddd',
            }}
        />
    );
};
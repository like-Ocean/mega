import { Graph } from '@antv/x6';

export const registerBpmnShapes = () => {
    // Event (Круг)
    Graph.registerNode('event', {
        inherit: 'circle',
        width: 50,
        height: 50,
        attrs: {
            body: {
                fill: '#FF6B6B',
                stroke: '#CC4949',
                strokeWidth: 2,
            },
            label: {
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
            },
        },
    });

    // Activity (Прямоугольник)
    Graph.registerNode('activity', {
        inherit: 'rect',
        width: 120,
        height: 80,
        attrs: {
            body: {
                fill: '#4ECDC4',
                stroke: '#3AAFAF',
                strokeWidth: 2,
                rx: 5,
                ry: 5,
            },
            label: {
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
            },
        },
    });

    // Gateway (Ромб)
    Graph.registerNode('gateway', {
        inherit: 'polygon',
        width: 60,
        height: 60,
        attrs: {
            body: {
                fill: '#FFD93D',
                stroke: '#CCB22E',
                strokeWidth: 2,
                refPoints: '0,10 10,0 20,10 10,20',
            },
            label: {
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
            },
        },
    });

    // Связи
    Graph.registerEdge('bpmn-edge', {
        inherit: 'edge',
        defaultLabel: {
            markup: [
                {
                    tagName: 'rect',
                    selector: 'labelBg',
                },
                {
                    tagName: 'text',
                    selector: 'labelText',
                },
            ],
            attrs: {
                labelText: {
                    fontSize: 12,
                    fill: '#333',
                    textAnchor: 'middle',
                    textVerticalAnchor: 'middle',
                },
                labelBg: {
                    ref: 'labelText',
                    fill: '#fff',
                    rx: 3,
                    ry: 3,
                    padding: 5,
                    refWidth: '140%',
                    refHeight: '140%',
                    refX: '-20%',
                    refY: '-20%',
                },
            },
        },
        attrs: {
            line: {
                stroke: '#666',
                strokeWidth: 2,
                targetMarker: {
                    name: 'block',
                    width: 12,
                    height: 8,
                },
            },
        },
    });
};

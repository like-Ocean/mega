import { Graph } from '@antv/x6';

// TODO: Вот тут если что выключить ellipsis
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
                fillOpacity: 0.7,
                strokeOpacity: 0.8,
            },
            label: {
                text: 'Event',
                fill: '#4a4a4a',
                fontSize: 12,
                textWrap: {
                    width: 40,
                    height: 40,
                    ellipsis: true,
                },
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
                fillOpacity: 0.7,
                strokeOpacity: 0.8,
            },
            label: {
                text: 'Activity',
                fill: '#333333',
                fontSize: 14,
                textWrap: {
                    width: 100,
                    height: 60,
                    ellipsis: true,
                },
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
                fillOpacity: 0.7,
                strokeOpacity: 0.8,
            },
            label: {
                text: 'Gateway',
                fill: '#333333',
                fontSize: 12,
                textWrap: {
                    width: 50,
                    height: 50,
                    ellipsis: true,
                },
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
            },
        },
    });

    // Связи
    Graph.registerEdge('bpmn-edge', {
        inherit: 'edge',
        attrs: {
            line: {
                stroke: '#666666',
                strokeWidth: 2,
                strokeOpacity: 0.7,
                targetMarker: {
                    name: 'block',
                    width: 12,
                    height: 8,
                },
            },
        },
    });
};

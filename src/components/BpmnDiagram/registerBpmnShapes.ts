import { Graph } from '@antv/x6';

export const registerBpmnShapes = () => {
  // Event (Круг)
  Graph.registerNode('event', {
    inherit: 'circle',
    width: 40,
    height: 40,
    attrs: {
      body: {
        fill: '#FF6B6B',
        stroke: '#CC4949',
        strokeWidth: 2,
        fillOpacity: 0.5,
      },
      label: {
        text: 'Event',
        fill: '#4a4a4a',
        fontSize: 12,
      },
    },
  });

  // Activity (Прямоугольник)
  Graph.registerNode('activity', {
    inherit: 'rect',
    width: 100,
    height: 60,
    attrs: {
      body: {
        fill: '#4ECDC4',
        stroke: '#3AAFAF',
        strokeWidth: 2,
        fillOpacity: 0.5,
        rx: 5,
        ry: 5,
      },
      label: {
        text: 'Activity',
        fill: '#333333',
        fontSize: 12,
      },
    },
  });

  // Gateway (Ромб)
  Graph.registerNode('gateway', {
    inherit: 'polygon',
    width: 55,
    height: 55,
    attrs: {
      body: {
        fill: '#FFD93D',
        stroke: '#CCB22E',
        strokeWidth: 2,
        fillOpacity: 0.5,
        refPoints: '0,10 10,0 20,10 10,20',
      },
      label: {
        text: 'Gateway',
        fill: '#333333',
        fontSize: 12,
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
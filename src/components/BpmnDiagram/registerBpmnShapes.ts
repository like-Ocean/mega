import { Graph } from '@antv/x6';

export const registerBpmnShapes = () => {
  Graph.registerNode('event', {
    inherit: 'circle',
    width: 40,
    height: 40,
    attrs: {
      body: {
        stroke: '#000000',
        strokeWidth: 2,
        fill: '#ffffff',
      },
    },
  });

  Graph.registerNode('activity', {
    inherit: 'rect',
    width: 100,
    height: 60,
    attrs: {
      body: {
        stroke: '#000000',
        strokeWidth: 2,
        fill: '#ffffff',
        rx: 5,
        ry: 5,
      },
    },
  });

  Graph.registerNode('gateway', {
    inherit: 'polygon',
    width: 55,
    height: 55,
    attrs: {
      body: {
        stroke: '#000000',
        strokeWidth: 2,
        fill: '#ffffff',
        refPoints: '0,10 10,0 20,10 10,20',
      },
    },
  });

  Graph.registerEdge('bpmn-edge', {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#000000',
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
import { BpmnElementType } from '@/types/bpmn';

export const getNodeColor = (type: BpmnElementType) => {
    const colors = {
        event: '#ff4d4f',
        activity: '#1890ff',
        gateway: '#52c41a',
    };
    return colors[type] || '#ddd';
};

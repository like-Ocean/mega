import axios, { AxiosError } from 'axios';
import { BpmnDiagram, BpmnElementType } from '@/types/bpmn';
import { ApiResponse } from '@/types/api';
import { ApiBpmnElement } from '@/api/types';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

interface GenerateBpmnApiResponse {
    bpmn: ApiBpmnElement[];
}

const transformApiResponse = (response: GenerateBpmnApiResponse): BpmnDiagram => {
    const nodes = response.bpmn
        .filter(
            (item): item is ApiBpmnElement & Required<Pick<ApiBpmnElement, 'position'>> =>
                !!item.position && item.shape !== 'bpmn-edge',
        )
        .map((node) => ({
            id: node.id,
            type: node.shape as BpmnElementType,
            position: node.position,
            label: node.label,
            width: node.width ?? 100,
            height: node.height ?? 60,
        }));

    const edges = response.bpmn
        .filter(
            (item): item is ApiBpmnElement & Required<Pick<ApiBpmnElement, 'source' | 'target'>> =>
                item.shape === 'bpmn-edge' && !!item.source && !!item.target,
        )
        .map((edge) => ({
            id: edge.id,
            type: 'bpmn-edge' as const,
            source: edge.source,
            target: edge.target,
        }));

    return { nodes, edges };
};

export const generateBpmn = async (input: string): Promise<ApiResponse<BpmnDiagram>> => {
    try {
        const { data } = await apiClient.post<GenerateBpmnApiResponse>('/api/user_input/text', {
            user_input: input,
        });

        return { data: transformApiResponse(data) };
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        return {
            error:
                axiosError.response?.data?.message ||
                axiosError.message ||
                'Неизвестная ошибка при генерации BPMN',
        };
    }
};

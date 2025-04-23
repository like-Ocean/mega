import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import React from 'react';

interface MessageInputFormProps {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    isLoading: boolean;
}

export const MessageInputForm: React.FC<MessageInputFormProps> = ({
    value,
    onChange,
    onSend,
    isLoading,
}) => {
    return (
        <div style={{ display: 'flex', gap: '8px' }}>
            <Input.TextArea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Опишите бизнес-процесс..."
                autoSize={{ minRows: 2, maxRows: 4 }}
                onPressEnter={(e) => {
                    if (!e.shiftKey) {
                        e.preventDefault();
                        onSend();
                    }
                }}
                style={{ flex: 1 }}
            />
            <Button
                type="primary"
                onClick={onSend}
                icon={<SendOutlined />}
                loading={isLoading}
                style={{ height: 'auto' }}
            />
        </div>
    );
};

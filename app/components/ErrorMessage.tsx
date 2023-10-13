import React from 'react';
import { Text } from '@radix-ui/themes';

interface Props {
    children: React.ReactNode;
}

const ErrorMessage = ({ children }: Props) => {
    if (!children) return null;

    return (
        <Text as="p" color="red">
            {children}
        </Text>
    );
};

export default ErrorMessage;

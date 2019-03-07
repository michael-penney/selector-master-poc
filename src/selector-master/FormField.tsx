import React from 'react';
import { Form } from 'react-bootstrap';

interface Props {
    label: string
    children: React.ReactElement
};

export default function FormField({ label, children }: Props) {
    return <Form.Group>
        <Form.Label>
            { label }
        </Form.Label>
        { children }
    </Form.Group>
}


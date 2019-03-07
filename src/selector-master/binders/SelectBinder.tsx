import React from 'react';
import { Form } from "react-bootstrap";
import { BinderProps } from '../types';

export interface Option<T> {
    label: string, value: T
}

export interface SelectBinderProps<T> extends BinderProps<T> {
    options: Option<T>[]
};

export default function SelectBinder<T>(props: SelectBinderProps<T>) {
    const options = props.options;
    const selectedIdx = options.findIndex((opt) => opt.value === props.value);

    return <Form.Control as="select"
        value={'' + selectedIdx}
        onChange={(e: any) => props.onChanged(options[e.target.value].value)}>
        { options.map((opt, index) => <option key={index} value={'' + index}>{ opt.label }</option>) }
    </Form.Control>
}

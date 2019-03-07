import React from 'react';
import { Form } from "react-bootstrap";

import { BinderProps } from "../types";

export default function TextBinder(props: BinderProps<string>) {
    const disabled = !props.onChanged;

    function handleChanged(e: any) {
        if (props.onChanged)
            props.onChanged(e.target.value);
    }

    return <Form.Control 
        type="text"
        value={props.value}
        disabled={disabled}
        onChange={handleChanged}/>
}

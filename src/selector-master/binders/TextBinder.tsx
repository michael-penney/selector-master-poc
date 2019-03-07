import React from 'react';
import { Form } from "react-bootstrap";

import { BinderProps } from "../types";

export default function TextBinder(props: BinderProps<string>) {
    return <Form.Control 
        type="text"
        value={props.value}
        onChange={(e: any) => props.onChanged(e.target.value)}/>
}

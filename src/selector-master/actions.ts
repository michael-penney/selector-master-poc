import { Action } from "redux";

export enum ActionType {
    SET_FORM_VALUE = "core.form.SET_FORM_VALUE",
    RESET_ALL_FORM_VALUES = "core.form.RESET_ALL_FORM_VALUES",
    RESET_FORM_VALUES = "core.form.RESET_FORM_VALUES"
}

export function setFormValue(formId: string, key: string, value: any): SetFormValueAction {
    return {
        type: ActionType.SET_FORM_VALUE,
        formId,
        key: key as string,
        value
    };
}

export function resetAllFormValues(formId: string): ResetAllFormValuesAction {
    return {
        type: ActionType.RESET_ALL_FORM_VALUES,
        formId
    };
}

export function resetFormValues(formId: string, keys: string[]): ResetFormValuesAction {
    return {
        type: ActionType.RESET_FORM_VALUES,
        formId, keys
    };
}

export interface SetFormValueAction extends Action {
    formId: string,
    key: string,
    value: any
}

export interface ResetAllFormValuesAction extends Action {
    formId: string
}

export interface ResetFormValuesAction extends Action {
    formId: string,
    keys: string[]
}

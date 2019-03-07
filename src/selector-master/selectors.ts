import { Map } from "immutable";
import { FormsState } from "./types";

export function getFormValues(state: FormsState, formId: string): Map<string, any> {
    const form = state.get('forms').get(formId);
    return form ? form.get('values') : Map();
}

export function getFormValuePair(state: FormsState, formId: string, key: string) {
    const form = state.get('forms').get(formId);
    return form && form.get('values').get(key);
}

export function getFormValue<T>(state: FormsState, formId: string, key: string): T|undefined {
    const pair = getFormValuePair(state, formId, key);
    return pair && pair.get('value');
}

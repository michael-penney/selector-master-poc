import { Record, Map, List } from 'immutable';
import { Action } from 'redux';
import { FormsState, FormState, RecordFactory as RecFactory } from './types';
import { ActionType, SetFormValueAction, ResetFormValuesAction, ResetAllFormValuesAction } from './actions';

export const createState: RecFactory<FormsState> = Record({
    forms: Map<string, FormState>()
});

const createForm: RecFactory<FormState> = Record({
    values: Map<string, any>()
});

export default function(state: FormsState = createState(), action: Action) {
    switch (action.type) {
        case ActionType.SET_FORM_VALUE:
            return handleSetFormValue(state, action as SetFormValueAction);
        case ActionType.RESET_ALL_FORM_VALUES:
            return handlerResetAllFormValues(state, action as ResetAllFormValuesAction);
        case ActionType.RESET_FORM_VALUES:
            return handleResetFormValeus(state, action as ResetFormValuesAction);
        default:
            return state;
    }
}

function handleSetFormValue(state: FormsState, { formId, key, value }: SetFormValueAction) {
    return updateForm(state, formId, (form) => form.update('values', (values) => values.set(key, value)));
}

function handlerResetAllFormValues(state: FormsState, { formId }: ResetAllFormValuesAction) {
    return updateForm(state, formId, (form) => form.delete('values'));
}

function handleResetFormValeus(state: FormsState, { formId, keys }: ResetFormValuesAction) {
    return updateForm(state, formId, (form) => form.update('values', (values) => values.withMutations((vs) => {
        for(let key of keys) {
            vs.delete(key);
        }
    })))
}

function updateForm(state: FormsState, formId: string, fn: (form: FormState) => FormState) {
    return state.update('forms', (forms) => forms.update(formId, (form = createForm()) => fn(form)));
}

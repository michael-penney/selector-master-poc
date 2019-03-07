import React, { ReactElement, useMemo } from 'react';
import { connect } from 'react-redux';

import { FormModel, FormActions, FormsState } from './types';
import { setFormValue, resetAllFormValues } from './actions';
import { createProvidersSelector, Providers } from './providers';

type RenderChildrenFn<V> = (formModel: FormModel<V>) => ReactElement;

type OwnProps<TProvided = {}, TValues = {}, TState = any> = {
    formId: string,
    selectState: (s: TState) => FormsState,
    providers?: Providers<TState, TProvided>,
    values?: TValues,
    children: RenderChildrenFn<TProvided & TValues>
};

type DispatchProps = {
    setFormValue: typeof setFormValue,
    resetAllFormValues: typeof resetAllFormValues
};

type StateProps<TProvided> = {
    providedValues: TProvided|undefined
};

type InnerProps = {
    formModel: FormModel<any>,
    children: RenderChildrenFn<any>
}

// Memoized inner component. Only call render when the props changed
const InnerComponent = React.memo(function FormModelInner({ formModel, children }: InnerProps) {
    return children(formModel);
});

function FormModelComponent<TProvided, TValues, TState>(props: StateProps<TProvided> & DispatchProps & OwnProps<TProvided, TValues, TState>) {
    const { formId, values: propValues, providedValues, children,
        setFormValue, resetAllFormValues } = props;
        
    type V = TProvided & TValues;

    // merge the provided values with values passed in the props
    const valuesMerged = Object.assign({}, propValues, providedValues);

    // build the form-actions object
    const actions = useMemo<FormActions<V>>(() => ({
        setValue: setFormValue.bind(null, formId) as any,
        resetAllValues: resetAllFormValues.bind(null, formId)
    }), [formId, valuesMerged, setFormValue, resetAllFormValues]);

    // build the form-model
    const formModel = useMemo<FormModel<V>>(() => ({
        formId,
        values: valuesMerged,
        actions
    }), [formId, valuesMerged, actions]);

    return React.createElement(InnerComponent, { children, formModel });
}

export default connect(
    <TProvided, TValues, TState>(_state: TState, { providers, formId, selectState }: OwnProps<TProvided, TValues, TState>) => {
        const selectProvided = providers && createProvidersSelector(providers);

        return (state: TState): StateProps<TProvided> => {
            const formsState = selectState(state);
            const form = formsState.get('forms').get(formId);
            const formValues = form && form.get('values');
            return {
                providedValues: selectProvided && selectProvided(state, formValues)
            }
        }
    },
    { setFormValue, resetAllFormValues }
)(FormModelComponent) as any as <TProvided, TValues, TState>(props: OwnProps<TProvided, TValues, TState>) => React.ReactElement;

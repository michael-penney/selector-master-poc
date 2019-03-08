import React, { ReactElement, useMemo } from 'react';
import { connect } from 'react-redux';

import { FormModel, FormActions, FormsState } from './types';
import { setFormValue, resetAllFormValues } from './actions';
import { Providers, createProvidersSelector } from './providers';
import { Map } from 'immutable';
import { getFormValues } from './selectors';

type RenderChildrenFn<V> = (formModel: FormModel<V>) => ReactElement;

type OwnProps<Provided = {}, Values = {}, State = any> = {
    formId: string,
    selectState: (s: State) => FormsState,
    providers: Providers<State, Provided>,
    values?: Values,
    children: RenderChildrenFn<Provided & Values>
};

type DispatchProps = {
    setFormValue: typeof setFormValue,
    resetAllFormValues: typeof resetAllFormValues
};

type StateProps<Provided> = {
    providedValues: Provided
};

type InnerProps = {
    formModel: FormModel<any>,
    children: RenderChildrenFn<any>
}

// Memoized inner component. Only call render function when the props changed
const InnerComponent = React.memo(
    function FormModelInner({ formModel, children }: InnerProps) {
        return children(formModel);
    }
);

function FormModelComponent<Provided, Values, State>(props: StateProps<Provided> & DispatchProps & OwnProps<Provided, Values, State>) {
    const {
        children, formId, values: propValues,
        resetAllFormValues, setFormValue, providedValues
    } = props;

    // merge the provided values with the values passed in props
    const valuesMerged = useMemo(() => Object.assign({}, propValues, providedValues), [propValues, providedValues]);

    // build the form-actions
    const actions = useMemo<FormActions<Provided & Values>>(() => ({
        setValue: setFormValue.bind(null, formId) as any,
        resetAllValues: resetAllFormValues.bind(null, formId)
    }), [formId, valuesMerged, setFormValue, resetAllFormValues]);

    // build the form-model
    const formModel = useMemo<FormModel<Provided & Values>>(() => ({
        formId,
        values: valuesMerged,
        actions
    }), [formId, valuesMerged, actions]);

    // render the inner component
    return React.createElement(InnerComponent, { children, formModel });
}

export default connect(
    <Provided, Values, State>(state: State, { formId, providers, selectState }: OwnProps<Provided, Values, State>) => {
        const selectProvided = createProvidersSelector(providers);
        return (state: State): StateProps<Provided> => {
            const formsState = selectState(state);
            const formValues = getFormValues(formsState, formId) as Map<keyof Provided, any>;
            return {
                providedValues: selectProvided(state, formValues)
            }

        }
    },
    { setFormValue, resetAllFormValues }
)(FormModelComponent) as any as <TProvided, TValues, TState>(props: OwnProps<TProvided, TValues, TState>) => React.ReactElement;

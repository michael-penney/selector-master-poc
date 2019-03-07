import { Map, Record, List } from 'immutable';

export interface BinderProps<T> {
    value: T,
    onChanged: (x: T) => void
}

export interface FormActions<V> {
    setValue<K extends keyof V>(key: K, value: V[K]): void,
    resetAllValues(): void
}

export interface GridModel {
    selectedId?: string
}

export type FormModel<V> = {
    formId: string,
    actions: FormActions<V>
    values: V
}

export type FormState = Record<{
    values: Map<string, any>
}>

export type FormsState = Record<{
    forms: Map<string, FormState>
}>

export type RecordFactory<T> = T extends Record<infer S> ? Record.Factory<S> : never

import * as Imm from "immutable";

/** types */

export type ProviderValueFn<S, T> = (state: S, ...args: any[]) => T;
export type DependencyFn<S> = ((state: S) => any) | string;

export interface ProviderConfig<S, T> {
    value: T|ProviderValueFn<S, T>,
    dependsOn?: DependencyFn<S>[]
}

export type Provider<S, T> = ProviderValueFn<S, T> | ProviderConfig<S, T>

export type Providers<S, V> = {
    [K in keyof V]: Provider<S, V[K]>
}

export type ValuesSelector<S, V> = (state: S) => Partial<V>;

/** end types */

export function createProvidersSelector<State, Values>(providers: Providers<State, Values>) {
    const providerKeys = getProviderKeysOrdered(providers);

    const deps = new Map<keyof Values, any[]>();
    
    let prevValues: Values|undefined;
    let prevFormValues: Imm.Map<keyof Values, any>|undefined;
    
    return (storeState: State, formValues: Imm.Map<keyof Values, any> = Imm.Map()) => {
        const values: Partial<Values> = {};
        
        let changed = prevValues == null;

        for (let key of providerKeys) {
            if (formValues.has(key) && (prevFormValues == null || !prevFormValues.has(key) || formValues.get(key) !== prevFormValues.get(key))) {
                values[key] = formValues.get(key);
                changed = true;

            } else {
                const provider: Provider<State, any> = providers[key];
                if (provider instanceof Function) {
                    values[key] = provider(storeState);
        
                } else {
                    const depKeys = provider.dependsOn;
                    if (depKeys) {
                        const n = depKeys.length;

                        let depsValues = deps.get(key);
                        if (depsValues == null) {
                            depsValues = new Array<any>(n);
                            deps.set(key, depsValues);
                        }
                        
                        let depsChanged = prevValues == null;
        
                        for (let i = 0; i < n; ++i) {
                            const depKey = depKeys[i];

                            let depValue;
                            if (depKey instanceof Function) {
                                depValue = depKey(storeState);
                            } else {
                                depValue = values[depKey as keyof Values];
                            }
        
                            if (!depsValues.hasOwnProperty(i) || depsValues[i] !== depValue) {
                                depsValues[i] = depValue;
                                depsChanged = true;
                            }
                        }
        
                        if (prevValues == null || depsChanged) {
                            values[key] = provider.value(storeState, ...depsValues);
                        } else {
                            values[key] = prevValues[key]
                        }
        
                    } else {
                        values[key] = provider.value(storeState);
                    }
                }
            }

            if (prevValues == null || values[key] !== prevValues[key]) {
                changed = true;
            }
        }
    
        prevFormValues = formValues;

        if (changed) {
            prevValues = values as Values;
            return prevValues;
    
        } else {
            return prevValues!;
        }
    }
}

/**
 * Gets the keys of the providers, ordered by dependencies
 * @param providers 
 */
function getProviderKeysOrdered<S, V>(providers: Providers<S, V>): (keyof V)[] {
    let keys = Object.keys(providers) as (keyof V)[];
    const result: (keyof V)[] = [];
    const seen = new Set<keyof V>();

    while (keys.length) {
        let depKeys: (keyof V)[] | undefined;
        
        for (let k of keys) {
            const provider: Provider<S, any> = providers[k as keyof V];

            if (typeof provider === 'object'
                && provider.dependsOn
                && provider.dependsOn.some((depKey) => !(depKey instanceof Function) && !seen.has(depKey as keyof V))) {

                if (!depKeys)
                    depKeys = [];

                // provider has unresolved dependencies. Delay until later
                depKeys.push(k);
                continue;
            }

            result.push(k);
            seen.add(k);
        }

        if (depKeys) {
            if (depKeys.length === keys.length) {
                throw new Error('cyclic dependency! Couldn\'t resolve keys: - ' + depKeys);
            } else {
                keys = depKeys;
            }

        } else {
            break;
        }
    }

    return result;
}

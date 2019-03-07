import * as Imm from 'immutable';

export type ProviderStateSelector<S, V> = (state: S, latest?: Imm.Map<string, any>) => V

type ProviderValueFn<S, T> = (state: S, ...args: any[]) => T;
type DependencyFn<S> = ((state: S) => any)|string;

interface ProviderConfig<S, T> {
    value: T|ProviderValueFn<S, T>,
    dependsOn?: DependencyFn<S>[]
}

type Provider<S, T> = ProviderValueFn<S, T>|ProviderConfig<S, T>

export type Providers<S, V> = {
    [K in keyof V]: Provider<S, V[K]>
}

interface Source<T> {
    value: T,
    seq: number
}

class ProviderState<S, T> {
    private readonly key: string;
    private readonly provider: Provider<S, T>;

    private seq: number = 0;
    private depValues: any[]|undefined;
    private providerSource: Source<T>|undefined;
    private formSource: Source<T>|undefined;

    constructor(key: string, provider: Provider<S, T>) {
        this.key = key;
        this.provider = provider;
    }

    resolveNextValue(state: S, values: any, formValues: Imm.Map<string, any>|undefined) {
        const dependencies = this.getDependencies();
        if (dependencies == null) {
            const value = this.invokeProvider(state);
            if (!this.providerSource || this.providerSource.value !== value) {
                this.providerSource = {
                    value,
                    seq: this.seq++
                };
            }

        } else {
            const depValues = this.resolveDependencyValues(state, dependencies, values);
            if (!this.providerSource || depValues !== this.depValues) {
                this.depValues = depValues;
                const value = this.invokeProvider(state, depValues);
                this.providerSource = {
                    value,
                    seq: this.seq++
                };
            }
        }

        if (formValues && formValues.has(this.key)) {
            const formValue = formValues.get(this.key) as T;
            const source = this.formSource;
            if (!source || source.value !== formValue) {
                this.formSource = {
                    value: formValue,
                    seq: this.seq++
                };
            }

        } else {
            this.formSource = undefined;
        }

        if (this.formSource && this.formSource.seq > this.providerSource.seq) {
            return this.formSource.value;
        } else {
            return this.providerSource.value;
        }
    }

    private getDependencies(): DependencyFn<S>[]|undefined {
        const provider = this.provider;
        if (!(provider instanceof Function)) {
            return provider.dependsOn;
        }
    }

    private resolveDependencyValues(state: S, dependencies: DependencyFn<S>[], values: any): any[] {
        const depValues = new Array(dependencies.length);
        
        let depsChanged = false;
        for (let i = 0, n = dependencies.length; i < n; ++i) {
            const dep = dependencies[i];

            let depValue: any;
            if (typeof dep === 'string') {
                depValue = values[dep];
            } else {
                depValue = dep(state);
            }

            if (!depsChanged && (this.depValues == null || this.depValues[i] !== depValue)) {
                depsChanged = true;
            }

            depValues[i] = depValue;
        }

        if (this.depValues == null || depsChanged) {
            return depValues;
        } else {
            return this.depValues;
        }
    }

    private invokeProvider(state: S, args?: any[]): T {
        const provider = this.provider;
        if (provider instanceof Function) {
            return args ? provider(state, ...args) : provider(state);

        } else {
            if (provider.value instanceof Function) {
                return args ? provider.value(state, ...args) : provider.value(state);

            } else {
                return provider.value;
            }
        }
    }
}

export function createProvidersSelector<S, V>(providers: Providers<S, V>): ProviderStateSelector<S, V> {
    const prevState = new Map<string, ProviderState<S, any>>();
    let prevValues: V|undefined;
    const keys = getProviderKeysOrdered(providers);
    
    return (state: S, latest?: Imm.Map<string, any>): V => {
        const values: { [key: string]: any } = {};
        let valuesChanged = false;

        for (let key of keys) {
            let providerState = prevState.get(key);

            if (providerState == null) {
                providerState = new ProviderState(key, providers[key as keyof V]);
                prevState.set(key, providerState);
            }

            values[key] = providerState.resolveNextValue(state, values, latest);
            if (prevValues == null || values[key] !== prevValues[key as keyof V]) {
                valuesChanged = true;
            }
        }

        if (valuesChanged) {
            prevValues = values as V;
            return values as V;

        } else {
            if (prevValues == null)
                prevValues = values as V;

            // return the previous value if nothing changed.
            // Makes the result of this function memoizable
            return prevValues;
        }
    }
}

/**
 * Gets the keys of the providers, ordered by dependencies
 * @param providers 
 */
function getProviderKeysOrdered<S, V>(providers: Providers<S, V>) {
    let keys = Object.keys(providers);
    const result: string[] = [];
    const seen = new Set<string>();

    while (keys.length) {
        let depKeys: string[]|undefined;
        
        for (let k of keys) {
            const provider: Provider<S, any> = providers[k as keyof V];

            if (typeof provider === 'object'
                && provider.dependsOn
                && provider.dependsOn.some((depKey) => typeof depKey === 'string' && !seen.has(depKey))) {

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

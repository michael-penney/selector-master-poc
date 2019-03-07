import { createProvidersSelector } from '../selector-master/providers';

describe('providers selector', () => {
    
    test('selects data from the store', () => {
        const selector = createProvidersSelector({
            field: (state) => state.id
        });

        const result = selector({ id: 'x' });
        expect(result).toEqual({ field: 'x' });
    });

    test('updates when the store changed', () => {
        const selector = createProvidersSelector({
            a: (state) => state.id,
            b: (state) => state.name
        });

        selector({ id: 'x', name: 'a' });
        const result = selector({ id: 'x', name: 'b' });
        expect(result).toEqual({ a: 'x', b: 'b' });
    });

    test('returns the same instance when nothing changed', () => {
        const selector = createProvidersSelector({
            a: (state) => state.id,
            b: (state) => state.name
        });

        const result1 = selector({ id: 'x', name: 'a' });
        const result2 = selector({ id: 'x', name: 'a' });
        expect(result1).toBe(result2);
    });

    test('field with dependent value', () => {
        const selector = createProvidersSelector({
            a: (state) => state.firstName,
            b: (state) => state.lastName,
            c: {
                value: (state, a, b) => a + ' ' + b,
                dependsOn: ['a', 'b']
            }
        }); 

        let result = selector({ firstName: 'first', lastName: 'last' });
        expect(result).toEqual({ a: 'first', b: 'last', c: 'first last' });
    });

    test('multiple dependent fields', () => {
        const selector = createProvidersSelector({
            a: {
                value: (state, a, b) => a + b,
                dependsOn: ['b', 'c']
            },
            b: {
                value: (state, b) => b * 2,
                dependsOn: ['c']
            },
            c: {
                value: (state) => state.count
            }
        }); 

        let result = selector({ count: 3 });
        expect(result).toEqual({ a: 9, b: 6, c: 3 });
    });

    test('field with no dependencies never recomputes', () => {
        const selector = createProvidersSelector({
            field: {
                value: (state) => state.id,
                dependsOn: []
            }
        });

        let result = selector({ id: 'a' });
        expect(result).toEqual({ field: 'a' });

        result = selector({ id: 'b' });
        expect(result).toEqual({ field: 'a' });
    });

    test('unchanged dependent field doesnt trigger update', () => {
        const selector = createProvidersSelector({
            a: {
                value: (state) => state.count,
                dependsOn: []
            },
            b: {
                value: (state, a) => a * 2,
                dependsOn: ['a']
            }
        });

        let result = selector({ count: 2 });
        expect(result).toEqual({ a: 2, b: 4 });
        expect(selector({ count: 3 })).toBe(result);
    });

    test('detects cyclic dependency', () => {
        expect(() => {
            createProvidersSelector({
                a: {
                    value: () => 'a',
                    dependsOn: ['b']
                },
                b: {
                    value: () => 'b',
                    dependsOn: ['a']
                }
            });
        }).toThrow();
    });

    test('empty providers object', () => {
        const selector = createProvidersSelector({ }); 

        let result = selector({ id: 'a' });
        expect(result).toEqual({ });
        expect(selector({ id: 'b' })).toBe(result);
    });
});

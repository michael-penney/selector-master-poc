import { parseVarName, parseArgs, parseFunc, parseStmt } from "../../../expressions/parser/parser";

test('parses a variable name', () => {
    expect(parseVarName(0, 'a')).toEqual(['a', 1]);
});

test('parsing a variable name returns only matched region', () => {
    expect(parseVarName(0, 'abc$^123')).toEqual(['abc', 3]);
});

test('variable name with numbers', () => {
    expect(parseVarName(0, 'a2')).toEqual(['a2', 2]);
});

test('invalid variable name', () => {
    expect(parseVarName(0, '2a')).toBeNull();
});

test('parses arguments', () => {
    expect(parseArgs(0, 'foo bar,baz')).toEqual([['foo', 'bar', 'baz'], 11]);
});

test('parses arguments with whitespace', () => {
    expect(parseArgs(0, 'foo  bar ,baz')).toEqual([['foo', 'bar', 'baz'], 13]);
});

test ('parses function with args list', () => {
    expect(parseFunc(0, '\\x -> x')).toEqual([funcNode(['x'], varNode('x')), 7]);
});

test ('parses function without args list', () => {
    expect(parseFunc(0, '\\ x')).toEqual([funcNode([], varNode('x')), 3]);
});

test('parses binary expression', () => {
    expect(parseStmt(0, 'a + b')).toEqual([binaryNode('plus', varNode('a'), varNode('b')), 5]);
});



function binaryNode(opName, lhs, rhs) {
    return { type: 'binary', opName, lhs, rhs };
}

function funcNode(args, stmt) {
    return { type: 'func', args, stmt };
}

function varNode(name) {
    return { type: 'var', name };
}

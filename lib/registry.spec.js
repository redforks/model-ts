"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registry_1 = require("./registry");
let r;
beforeEach(() => {
    r = new registry_1.Registry('test');
});
it('get - getDefault', () => {
    expect(() => r.get('foo')).toThrow('"foo" not registered in "test"');
    expect(r.getDefault('foo', 4)).toBe(4);
    r.register('foo', 3);
    expect(r.get('foo')).toBe(3);
    expect(r.getDefault('foo', 4)).toBe(3);
});
it('register', () => {
    r.register('foo', 3);
    expect(r.get('foo')).toBe(3);
    expect(() => r.register('foo', 4))
        .toThrow('"foo" already registered in "test"');
});
it('fromArray', () => {
    r.fromArray([['foo', 3], ['bar', 4]]);
    expect(r.get('foo')).toBe(3);
    expect(r.get('bar')).toBe(4);
    expect(() => {
        r.fromArray([['foobar', 5], ['foo', 6]]);
    }).toThrow('"foo" already registered in "test"');
});
it('pairs', () => {
    r.fromArray([['foo', 3], ['bar', 4]]);
    expect(r.pairs()).toEqual([['foo', 3], ['bar', 4]]);
    expect(r.pairs()).toBe(r.pairs());
    r.register('foobar', 5);
    expect(r.pairs()).toEqual([['foo', 3], ['bar', 4], ['foobar', 5]]);
    r.fromArray([['a', 6]]);
    expect(r.pairs()).toEqual([['foo', 3], ['bar', 4], ['foobar', 5], ['a', 6]]);
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Registry {
    constructor(name) {
        this.name = name;
        this.map = new Map();
    }
    register(k, v) {
        this.cachedPairs = undefined;
        if (this.map.has(k)) {
            throw Error(`"${k}" already registered in "${this.name}"`);
        }
        this.map.set(k, v);
    }
    get(k) {
        const r = this.map.get(k);
        if (r == null) {
            throw Error(`"${k}" not registered in "${this.name}"`);
        }
        return r;
    }
    getDefault(k, def) {
        return (this.map.get(k) || def);
    }
    fromArray(arr) {
        this.cachedPairs = undefined;
        for (const pair of arr) {
            this.register(pair[0], pair[1]);
        }
    }
    pairs() {
        if (!this.cachedPairs) {
            this.cachedPairs = Array.from(this.map.entries());
        }
        return this.cachedPairs;
    }
}
exports.Registry = Registry;

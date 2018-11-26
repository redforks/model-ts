export declare type Pair<K, V> = [K, V];
export declare class Registry<K, V> {
    readonly name: string;
    private map;
    private cachedPairs?;
    constructor(name: string);
    register(k: K, v: V): void;
    get(k: K): V;
    getDefault<R extends V | undefined>(k: K, def?: R): R;
    fromArray(arr: Array<Pair<K, V>>): void;
    pairs(): Array<Pair<K, V>>;
}

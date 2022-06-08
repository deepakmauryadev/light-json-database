export declare class JsonDatabase {
    private name;
    private filePath;
    constructor(name: string);
    get<T>(key: string): T;
    getAll<T>(): T;
    set(key: string, value: any): void;
    setAll(data: any): void;
    remove(key: string): void;
    removeAll(): void;
}
//# sourceMappingURL=index.d.ts.map
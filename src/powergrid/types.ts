export interface Row extends Array<any> {
    id: string,
};

export interface Column {
    _key: string,
    title: string,
    width: number,
    [key: string]: any
}

export interface EventHandler {
    name: string,
    action: (...args: any[]) => void
}

export interface PowergridOpts {
    rootId: string,
    columns: Column[],
    dataSource: IDatasource,
    className?: string,
    frozenColumnsLeft?: number,
    frozenColumnsRight?: number,
    frozenRowsTop?: number,
    frozenRowsBottom?: number,
    extensions?: { [key: string]: any },
    rowHeight?: number,
}

export interface IDatasource {
    recordCount(): number;

    getData(start: number, end: number): Row[];

    setValue(id: string, key: number, value: any): void;

    getRecordById(id: string): Row;

    isReady(): boolean;

    assertReady(): void;
}

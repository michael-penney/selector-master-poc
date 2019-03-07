import { Column, Row } from "./types";

export function dataToRows<T>(data: Iterable<T>, idFn: (item: T, index: number) => string, columns: Column[]): Row[] {
    const rows: Row[] = [];

    let i = 0;
    for (let item of data) {
        const row: Row = columns.map((column) => (item as any)[column._key]) as any;
        row.id = idFn(item, i++);
        rows.push(row);
    }

    return rows;
}



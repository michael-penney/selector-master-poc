import $ from 'jquery';
import { Row, IDatasource } from './types';

export type DataChangedFn = (id: string, key: number, value: any) => void;

export class Datasource implements IDatasource {
    private data: Row[];
    private lookupById: Map<string, number>;

    private handleValueChanged: DataChangedFn|undefined;

    constructor(data: Row[]) {
        this.data = data;
        this.lookupById = this.computeLookupById(data);
    }

    onValueChanged(callback: DataChangedFn|undefined): void {
        this.handleValueChanged = callback;
    }

    updateData(data: Row[]) {
        if (data === this.data) return;
        const oldData = this.data;
        this.data = data;
        this.lookupById = this.computeLookupById(data);

        $(this).trigger('datachanged', {
            data,
            oldData
        });
    }

    recordCount() {
        return this.data.length;
    }

    getData(start: number, end: number): Row[] {
        return this.data.slice(start, end);
    }

    setValue(id: string, key: number, value: any) {
        const record = this.getRecordById(id);
        record[key] = value;

        this.handleValueChanged && this.handleValueChanged(id, key, value);
    }

    getRecordById(id: string): Row {
        const index = this.lookupById.get(id)!;
        return this.data[index];
    }

    isReady() {
        return true;
    }

    assertReady() {
        if(!this.isReady()) {
            throw 'Datasource not ready yet';
        }
    }

    private computeLookupById(data: Row[]) {
        const result = new Map<string, number>();
        for (let i = 0, n = data.length; i < n; ++i) {
            result.set(data[i].id, i);
        }
        return result;
    }
}

import React, { useMemo } from 'react';
import { Map } from 'immutable';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Container, Button } from 'react-bootstrap';

import { StoreState as S, Product } from './types';

import { Column, Row } from './powergrid/types';
import GridReactive from './powergrid/GridReactive';
import { dataToRows } from './powergrid/helpers';

import FormModel from './selector-master/FormModel';
import TextBinder from './selector-master/binders/TextBinder';
import SelectBinder from './selector-master/binders/SelectBinder';
import FormField from './selector-master/FormField';

import { setChangedQuantity } from './dataActions';
import { Providers } from './selector-master/providers';

interface Values {
    products: Product[],
    productNo: string,
    productDescription: string,
    data: Row[],
    data2: Row[]
    selectedId: string,
    totalQuantity: number
}

const salesOrderColumns: Column[] = [
    { _key: 'id', width: 160, title: 'Id' },
    { _key: 'quantity', width: 150, title: 'Quantity' },
    { _key: 'date', width: 150, title: 'Date' },
    { _key: 'remark', width: 150, title: 'Remark' }
]

const forecastColumns: Column[] = [
    { _key: 'id', width: 160, title: 'Id' },
    { _key: 'quantity', width: 150, title: 'Quantity', editable: true }
]

const providers: Providers<S, Values> = {
    products: (s: S) => s.data.products,
    productNo: {
        value: (s: S, products: Product[]) => products[0].no,
        dependsOn: ['products']
    },
    productDescription: {
        value: (s: S, productNo: string, products: Product[]) => {
            const product = products.find((x) => x.no === productNo);
            return product ? product.description : '';
        },
        dependsOn: ['productNo', 'products']
    },
    data: {
        value: (s: S, productNo: string) => dataToRows(s.data.salesOrders[productNo], (f) => f.id, salesOrderColumns),
        dependsOn: ['productNo']
    },
    selectedId: {
        value: () => '',
        dependsOn: ['data']
    },
    data2: {
        value: (s: S, selectedId: string, changedQuantities: Map<string, number>) => {
            const rows =  selectedId && s.data.forecasts[selectedId] ? dataToRows(s.data.forecasts[selectedId], (f) => f.id, forecastColumns) : [];

            // merge rows with changed quantities.
            // Maybe we want to build this into the grid component somehow - But for now it's a manual step.
            for (let row of rows) {
                const changedQuantity = changedQuantities.get(row[0]);
                if (changedQuantity != null)
                    row[1] = changedQuantity;
            }

            return rows;
        },
        dependsOn: ['selectedId', (s: S) => s.data.changedQuantities]
    },
    totalQuantity: {
        value: (s: S, data: Row[]) => data.reduce((acc, d) => acc + parseFloat(d[1]), 0),
        dependsOn: ['data2']
    }
}

type FormProps = {
    dispatch: Dispatch
}

function SuperForm({ dispatch }: FormProps) {
    return <FormModel
        formId="form-1"
        providers={providers}
        selectState={(s: S) => s.form}>
        {({ values, actions }) => {
            const opts = useMemo(() => values.products.map((p) => ({ label: p.name, value: p.no })), [values.products]);

            return <Container>
                <Button onClick={() => actions.resetAllValues()}>Reset</Button>

                <FormField label="Product no">
                    <SelectBinder
                        value={values.productNo}
                        options={opts}
                        onChanged={(v) => actions.setValue('productNo', v)}/>
                </FormField>

                <FormField label="Product Description">
                    <TextBinder
                        value={values.productDescription}
                        onChanged={(v: string) => actions.setValue('productDescription', v)}/>
                </FormField>

                <GridReactive
                    gridId="grid-1"
                    data={values.data}
                    columns={salesOrderColumns}
                    extensions={{
                        selection: true
                    }}
                    onSelectionChanged={(id: string) => actions.setValue('selectedId', id)}/>

                <FormField label="Selected Id">
                    <TextBinder
                        value={values.selectedId}
                        onChanged={(v: string) => actions.setValue('selectedId', v)}/>
                </FormField>

                <FormField label="Total">
                    <TextBinder
                        value={'' + values.totalQuantity}/>
                </FormField>

                <GridReactive
                    gridId="grid-2"
                    data={values.data2}
                    onValueChanged={(id, key, value) => dispatch(setChangedQuantity(id, parseFloat(value)))}
                    columns={forecastColumns}
                    extensions={{
                        editing: true
                    }}/>
            </Container>
        }}
    </FormModel>
}

export default connect()(SuperForm);

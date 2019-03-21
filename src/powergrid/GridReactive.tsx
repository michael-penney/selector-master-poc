import React, { useEffect, useState } from 'react';

import Grid from './Grid';
import { PowergridOpts, Row } from './types';
import { Datasource } from './Datasource';
import { createExtensions, ExtensionOpts, ExtsContext, OnSelectionChangedFn, PgExts } from './extensions/extensions';

/**
 * React Wrapper around the powergrid component imperative API. Manages creation of a datasource / extensions.
 * Watches changes in the component props and triggers changes.
 */

type ExtraPgOpts = Pick<PowergridOpts, Exclude<keyof PowergridOpts, 'dataSource'|'extensions'|'rootId'>>;

export type OnValueChangedFn = (id: string, key: number, value: string) => void;

type Props = {
    gridId: string,
    data: Row[],
    extensions: ExtensionOpts,
    onValueChanged?: OnValueChangedFn,
    onSelectionChanged?: OnSelectionChangedFn
} & ExtraPgOpts;

export default function GridReactive(props: Props) {
    const { gridId, data, extensions, onValueChanged, onSelectionChanged, ...extraOpts } = props;

    // construct the initial state
    const [{ dataSource, extsContext, pgExtensions }] = useState(() => {
        // create the context object
        const extsContext: ExtsContext = {
            onRowSelected: onSelectionChanged
        };

        // create the powergrid extensions. Pass in the "context", to act
        // as a reference to the latest props passed into the component
        const pgExtensions = createExtensions(extensions, extsContext);

        // create the datasource
        const dataSource = new Datasource(data);
        dataSource.onValueChanged(onValueChanged);

        return {
            extsContext,
            pgExtensions,
            dataSource
        };
    })
    
    // update the datasource when the data changed
    useEffect(() => { dataSource.updateData(data); }, [data]);

    // update the datasource onValueChanged callback
    useEffect(() => { dataSource.onValueChanged(onValueChanged); }, [onValueChanged]);

    // update the extensions context
    useEffect(() => {
        extsContext.onRowSelected = onSelectionChanged;
    }, [onSelectionChanged]);

    const rootId = gridId;
    const opts: PowergridOpts = { ...extraOpts, rootId, dataSource, extensions: pgExtensions };
    return <Grid rootId={gridId} opts={opts}/>
}

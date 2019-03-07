import React, { useEffect, useRef } from 'react';

import Grid from './Grid';
import { PowergridOpts, Row } from './types';
import { Datasource } from './Datasource';
import { createExtensions, ExtensionOpts, ExtsContext, OnSelectionChangedFn, PgExts } from './extensions/extensions';

/**
 * Wrapper around the powergrid component.
 * Creates a datasource and initializes the extensions.
 */

type Opts = Pick<PowergridOpts, Exclude<keyof PowergridOpts, 'dataSource' | 'extensions' | 'data' | 'rootId'>>;

export type OnValueChangedFn = (id: string, key: number, value: string) => void;

type Props = {
    gridId: string,
    data: Row[],
    extensions: ExtensionOpts,
    opts: Opts,
    onValueChanged?: OnValueChangedFn,
    onSelectionChanged?: OnSelectionChangedFn
}

type InitialState = {
    extsContext: ExtsContext,
    pgExtensions: PgExts,
    dataSource: Datasource
}

export default function GridReactive(props: Props) {
    const { gridId, extensions, opts, data, onValueChanged, onSelectionChanged } = props;

    // use useRef instead of useMemo, because we require a guarantee that the
    // initial-state will never be re-created. UseMemo is an "optimization" and might not offer that guarantee in the future.
    const initialStateRef = useRef<InitialState|null>(null);
    function getInitialState(): InitialState {
        let initialState = initialStateRef.current;
        if (initialState != null) return initialState;

        // create the extensions context object
        const extsContext: ExtsContext = {
            onRowSelected: onSelectionChanged
        };

        // create powergrid extensions
        const pgExtensions = createExtensions(extensions, extsContext);

        // create powergrid datasource
        const dataSource = new Datasource(data);

        // create the initial state
        initialState = {
            extsContext,
            pgExtensions,
            dataSource
        };

        initialStateRef.current = initialState;
        return initialState;
    }

    const { dataSource, extsContext, pgExtensions } = getInitialState();
    
    // update the datasource when the data changed
    useEffect(() => {
        dataSource.updateData(data);
    }, [data]);

    // update the datasource onValueChanged callback
    useEffect(() => {
        dataSource.onValueChanged(onValueChanged);
    }, [onValueChanged]);

    // update the callbacks in the extensions context
    useEffect(() => {
        extsContext.onRowSelected = onSelectionChanged;
    }, [onSelectionChanged]);

    const rootId = gridId;
    const allOpts: PowergridOpts = { ...opts, rootId, dataSource, extensions: pgExtensions };
    return <Grid rootId={gridId} opts={allOpts}/>
}

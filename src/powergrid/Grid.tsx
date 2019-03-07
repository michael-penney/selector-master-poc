import React, { CSSProperties, useRef, useLayoutEffect } from 'react';
import $ from 'jquery';

import { EventHandler, PowergridOpts } from './types';

export type Props = {
    rootId: string,
    className?: string,
    style?: CSSProperties,
    events?: EventHandler[],
    onGridMounted?: (grid: any) => void,
    opts: PowergridOpts
}

function propsAreEqual() {
    // this component should never re-render
    return true;
}

export default React.memo(
    function Grid(props: Props) {
        const elRef = useRef<HTMLDivElement>(null);
        useLayoutEffect(() => {
            const el = elRef.current;
            if (el == null) return;

            // mount the Powergrid
            const gridOpts = Object.assign({ settingsId: props.rootId }, props.opts);
            const grid = ($(el) as any).PowerGrid(gridOpts);

            // attach event listeners
            const events = props.events;
            if (events) {
                for (let event of events) {
                    grid.target.on(event.name, event.action);
                }
            }

            // supply the newly created grid to the call-back
            if (props.onGridMounted)
                props.onGridMounted(grid);
        }, []);

        return <div id={props.rootId} style={props.style} className={props.className} ref={elRef}/>
    },
    propsAreEqual
);


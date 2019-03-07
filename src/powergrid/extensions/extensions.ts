export type OnSelectionChangedFn = (id: string) => void;

export type PgExts = { [key: string]: any };

export interface ExtensionOpts {
    selection?: boolean,
    editing?: boolean
}

export interface ExtsContext {
    onRowSelected?: OnSelectionChangedFn
}

function addSelectionExt(result: PgExts, ctx: ExtsContext) {
    result.selection = {
        onrowselected: function(grid: any, id: string|number) {
            ctx.onRowSelected && ctx.onRowSelected('' + id);
        }
    }
}

function addEditingExt(result: PgExts) {
    result.editing = true;
}

export function createExtensions(opts: ExtensionOpts, ctx: ExtsContext): PgExts {
    const pgExts: PgExts = {};

    if (opts.selection)
        addSelectionExt(pgExts, ctx);

    if (opts.editing)
        addEditingExt(pgExts);

    return pgExts;
}

import * as vscode from 'vscode';
import {window, workspace, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument} from 'vscode';
export function activate(context: vscode.ExtensionContext) {

    let controller = new BeautiflierController();

    context.subscriptions.push(controller);
}

class BeautiflierController {

    private disposable: Disposable;

    constructor() {
        let subscriptions: Disposable[] = [];
        workspace.onDidSaveTextDocument(this._onEvent, this, subscriptions);

        this.disposable = Disposable.from(...subscriptions);
    }

    dispose() {
        this.disposable.dispose();
    }

    private _onEvent() {
        commands.executeCommand('editor.action.format').then(() => {
            console.log('i format');
            // setTimeout(function() {
            //     
            // }, 400);
        });
    }
}

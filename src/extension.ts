import * as vscode from 'vscode';
import {window, workspace, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument} from 'vscode';
export function activate(context: vscode.ExtensionContext) {
    
    console.log("Activation")
    
    var disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed
        let controller = new BeautiflierController();  
        context.subscriptions.push(controller);
    });
    
    context.subscriptions.push(disposable);
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
            commands.executeCommand('workbench.action.files.save');
        });
    }
}

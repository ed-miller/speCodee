'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import WebSocket = require('ws');
import fs = require('fs');
import { watchFile } from 'fs';
import procRunner = require('child_process');

const authToken:string = "sdasdasdasdasdasdas";

function editText(pos:vscode.Position, text:string) {
    vscode.window.activeTextEditor.edit(edit => {
        edit.insert(/* vscode.window.activeTextEditor.selection.active */pos, text);
        vscode.window.activeTextEditor.show();
    }, {undoStopBefore:true, undoStopAfter:false });
}

function createClass(name:string) {
    let doc = vscode.window.activeTextEditor.document;
    const fullText = doc.getText()
    let pos = doc.positionAt(fullText.length - 1);
    editText(pos, "\r\nclass "+name+"\r\n"+"{\r\n\r\n\r\n\r\n\r\n\r\n}\r\n\r\n");
}

function createMethod(name:string) {
    let doc = vscode.window.activeTextEditor.document;
    const fullText = doc.getText()

    let posClassEnd = fullText.lastIndexOf('}');
    console.log('posClassEnd', posClassEnd);

    if (posClassEnd > 0) { 
        let pos = doc.positionAt(posClassEnd);
        editText(pos, "\r\n\t"+name+"() {\r\n\t\t\r\n\t}\r\n\r\n");
    }
}

function createAttribute(name:string, type:string) {
    let doc = vscode.window.activeTextEditor.document;
    const fullText = doc.getText();

    let posClassBegin = fullText.indexOf('{');

    if (posClassBegin > 0) { 
        let pos = doc.positionAt(posClassBegin +1);
        editText(pos,  "\r\n\tprivate "+name+":"+type+"\r\n");
    }
}

function codeeGotoLine(line:number) {
    const editor = vscode.window.activeTextEditor;
    const position = editor.selection.active;

    var newPosition = position.with(line > 0 ? line-1 : 0, 0);
    var newSelection = new vscode.Selection(newPosition, newPosition);
    editor.selection = newSelection;
}

function codeeMarkLine(line:number) {
    const editor = vscode.window.activeTextEditor;
    const position = editor.selection.active;

    var newPosition = position.with(line > 0 ? line-1 : 0, 0);
    var newPosition2 = position.with(line, 0);
    var newSelection = new vscode.Selection(newPosition, newPosition2);
    editor.selection = newSelection;
}

/*
Erzeuge Klasse  Haus
Erstelle Methode Zünden
Erstelle Attribut Zylinderfassung
Gehe zur zeile 77

*/

function processCommand(command:string) {
    command = command.replace(/[\s]{2,}/g, ' ');
    console.log('processCommand:', command);
    let posClassKeyWord = command.indexOf('Klasse');
    if (posClassKeyWord > 0) {
        let name = command.substring(posClassKeyWord + 7);
        console.log('processCommand class', name.split(' ')[0], name);
        createClass(name.split(' ')[0]);
    }
}


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "specody" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('speCodee: Speech recognition started!');
        
        // createMethod('Farbwechsel');
        // createClass('Regenbogen');
    });

    

    disposable = vscode.commands.registerCommand('extension.createMethod', () => {
        createMethod('Farbwechsel');
    });
    context.subscriptions.push(disposable);

    

    disposable = vscode.commands.registerCommand('extension.codeeCreateAttribute2', () => {
        createAttribute('Sättigung', 'number');
    });
    context.subscriptions.push(disposable);


    

    disposable = vscode.commands.registerCommand('extension.codeeGotoLine', () => {
        codeeMarkLine(7);
    });
    context.subscriptions.push(disposable);



    let speechFile = 'C:/users/x/desktop/speech.rec';


    fs.watchFile(speechFile, {persistent:true, interval:300}, (curr:fs.Stats, prev:fs.Stats) => {
        console.log('watchFile:', curr, prev);
        let speech = fs.readFileSync(speechFile, {encoding:'utf-8'});
        console.log('speech:', speech, speech.split("\r\n"));

        speech.split("\r\n").forEach(element => {
            processCommand(element);
        });
    });



    const subprocess = procRunner.execFileSync('Speech.exe');
    console.log('process:',subprocess);

    
}

// this method is called when your extension is deactivated
export function deactivate() {


}
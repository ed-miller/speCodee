//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';
import {tranformReservedWord, tranformMark} from "../extension";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode';
// import * as myExtension from '../extension';

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function () {

    // Defines a Mocha unit test
    // test("Something 1", function() {
    //     assert.equal(-1, [1, 2, 3].indexOf(5));
    //     assert.equal(-1, [1, 2, 3].indexOf(0));
    // });


    test("transform an input to an create class", function() {
        let commands = [
            'Erstelle klasse Superbogen',
            'Erstelle klasseSuperbogen',
            'EntferneklasseSuperbogen',
            'Entferneklasse   Superbogen',
            'Erstelle     klasse   Superbogen',
            'Erstelle     methode   Superbogen',
            'Erstelle methode Superbogen',
            'Erstelle methodeSuperbogen',
            'ErstellemethodeSuperbogen',
            'Erstellemethode   Superbogen',
            'Erstelle     attribut   Superbogen',
            'Erstelle attribut Superbogen vom typ string',
            'Erstelle attributeSuperbogen vomtyp string',
            'ErstelleattributSuperbogenvom typnummer',
            'Erzeugeattribute   Superbogenvomtypnummer',
        ];
        commands.forEach((command) => {
            const result = tranformReservedWord(command);

            assert.ok(result.modifier === "entferne"
                ||result.modifier === "erstelle"
                ||result.modifier === "stelle"
                ||result.modifier === "erzeuge"
                ||result.modifier === "zeuge");

            assert.ok(result.reservedWord === "klasse"
                ||result.reservedWord === "methode"
                ||result.reservedWord === "method"
                ||result.reservedWord === "attribut"
                ||result.reservedWord === "attribute");

            // assert.equal(result.name, "superbogen");
            console.log('result.name', result.name)
            assert.ok(result.name === "superbogen"
                || result.name === "esuperbogen");

            if (result.of === 'vom' && result.typeString === 'typ'){
                assert.ok((result.type === "string" || result.type === "nummer"));
            }
        })

    });

    test("transform an input to mark row", function() {
        let commands = [
            'Markiere Zeile 1',
            'Markiere Zeile2',
            'MarkiereZeile3',
            'MarkiereZeile   4',
            'Markiere     Zeile   5',
            'Entferne Zeile 1',
            'Entferne Zeile2',
            'EntferneZeile3',
            'EntferneZeile   4',
            'Entferne     Zeile   5',
            'ausgabe Zeile 1',
            'ausgabe Zeile2',
            'ausgabeZeile3',
            'ausgabeZeile   4',
            'ausgabe     Zeile   5',
        ];

        commands.forEach((command) => {
            const result = tranformMark(command);
            assert.ok(result.line >= 0);
            assert.ok((result.modifier === 'entferne'
                || result.modifier === 'markiere'
                || result.modifier === 'gehe zu'
                || result.modifier === 'ausgabe'));
        })

    });

});
//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';
import {tranformClass} from "../extension";

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
            'LöscheklasseSuperbogen',
            'Markiereklasse   Superbogen',
            'Erstelle     klasse   Superbogen',
            'Erstelle     methode   Superbogen',
            'Erstelle methode Superbogen',
            'Erstelle methodeSuperbogen',
            'ErstellemethodeSuperbogen',
            'Erstellemethode   Superbogen',
            'Erstelle     attribut   Superbogen',
            'Erstelle attribut Superbogen vom typ string',
            'Erstelle attributSuperbogen vomtyp string',
            'ErstelleattributSuperbogenvom typnummer',
            'Erzeugeattribut   Superbogenvomtypnummer',
        ];
        commands.forEach((command) => {
            const result = tranformClass(command);
            console.log('result', result);

            assert.ok(result.modifier === "lösche"
                ||result.modifier === "erstelle"
                ||result.modifier === "erzeuge"
                ||result.modifier === "markiere");

            assert.ok(result.reservedWord === "klasse"
                ||result.reservedWord === "methode"
                ||result.reservedWord === "attribut");

            assert.equal(result.name, "superbogen");

            if (result.of === 'vom' && result.typeString === 'typ'){
                assert.ok((result.type === "string" || result.type === "nummer"));
            }
        })

    });
});
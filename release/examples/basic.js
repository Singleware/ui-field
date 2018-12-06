"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 *
 * The proposal of this example is to show how to use the basic field template.
 */
const Field = require("../source");
const JSX = require("@singleware/jsx");
const field = (JSX.create(Field.Component, null,
    JSX.create("span", { slot: "label" }, "Select value:"),
    JSX.create("span", { slot: "prepend" }, "Before"),
    JSX.create("span", { slot: "append" }, "After"),
    JSX.create("select", { slot: "center" },
        JSX.create("option", { value: "0" }, "Value A"),
        JSX.create("option", { value: "1" }, "Value B"))));
// Change disabled property of the <select> element.
field.disabled = true;
// Change read-only property of the <select> element.
field.readOnly = true;
// Change required property of the <select> element.
field.required = true;
// Change name property of the <select> element.
field.name = 'new-name';
// Change value property of the <select> element.
field.value = '1';
// Change label slot content.
field.label = 'New label';
// Change field orientation ('row' or 'column')
field.orientation = 'row';

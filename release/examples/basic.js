"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 *
 * The proposal of this example is to show how to use the basic field template.
 */
const Field = require("../source");
const DOM = require("@singleware/jsx");
const field = (DOM.create(Field.Template, null,
    DOM.create("span", { slot: "label" }, "Select value:"),
    DOM.create("span", { slot: "prepend" }, "Before"),
    DOM.create("span", { slot: "append" }, "After"),
    DOM.create("select", { slot: "center" },
        DOM.create("option", { value: "0" }, "Value A"),
        DOM.create("option", { value: "1" }, "Value B"))));
// Change disabled property of the <select> element.
field.disabled = true;
// Change read-only property of the <select> element.
field.readOnly = true;
// Change required property of the <select> element.
field.required = true;
// Change type property of the <select>
// Wait... of course that element could not support type property, try with <input> instead.
field.type = 'new-type';
// Change name property of the <select> element.
field.name = 'new-name';
// Change value property of the <select> element.
field.value = '1';
// Change label slot content.
field.label = 'New label';
// Change field orientation ('row' or 'column')
field.orientation = 'row';

/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 *
 * The proposal of this example is to show how to use the basic field template.
 */
import * as Field from '../source';
import * as JSX from '@singleware/jsx';

const field = (
  <Field.Component>
    <span slot="label">Select value:</span>
    <span slot="prepend">Before</span>
    <span slot="append">After</span>
    <select slot="center">
      <option value="0">Value A</option>
      <option value="1">Value B</option>
    </select>
  </Field.Component>
) as Field.Element;

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

# UI-Field

Custom HTML element used to mirror field properties into the first element in its center slot, also provides the common field structures with label, prepend and append slots.

### State Attributes

| Name    | Description                                                |
| ------- | ---------------------------------------------------------- |
| empty   | Automatic assigned when the center slot element is empty   |
| checked | Automatic assigned when the center slot element is checked |
| invalid | Automatic assigned when the center slot element is invalid |

### Mirrored Properties

| Name           | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| empty          | Get the `empty` state from the center slot element                |
| type           | Get and set the element `type` in the center slot                 |
| name           | Get and set the element `name` in the center slot                 |
| value          | Get and set the element `value` in the center slot                |
| checked        | Get and set the `checked` state in the center slot element        |
| defaultValue   | Get and set the `defaultValue` in the center slot element         |
| defaultChecked | Get and set the `defaultChecked` state in the center slot element |
| required       | Get and set the `required` state in the center slot element       |
| readOnly       | Get and set the `readOnly` state in the center slot element       |
| disabled       | Get and set the `disabled` state in the center slot element       |

### Properties

| Name        | Description                                                     |
| ----------- | --------------------------------------------------------------- |
| label       | Get and set the field label                                     |
| orientation | Get and set the field orientation. Use: `row` or `column` value |

### Methods

| Name              | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| focus             | Move the focus to the center slot element                                 |
| reset             | Reset the current value from the center slot element to its default value |
| checkValidity     | Get the validity of the center slot element                               |
| setCustomValidity | Set a custom validity in the center slot element                          |

## Install

Using npm:

```sh
npm i @singleware/ui-field
```

## License

[MIT &copy; Silas B. Domingos](https://balmante.eti.br)

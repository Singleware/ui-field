"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
const DOM = require("@singleware/jsx");
const Control = require("@singleware/ui-control");
/**
 * Field template class.
 */
let Template = class Template extends Control.Component {
    /**
     * Default constructor.
     * @param properties Field properties.
     * @param children Field children.
     */
    constructor(properties, children) {
        super(properties, children);
        /**
         * Field states.
         */
        this.states = {
            unwind: false
        };
        /**
         * Prepend element.
         */
        this.prependSlot = DOM.create("slot", { name: "prepend", class: "prepend" });
        /**
         * Center element.
         */
        this.centerSlot = DOM.create("slot", { name: "center", class: "center" });
        /**
         * Append element.
         */
        this.appendSlot = DOM.create("slot", { name: "append", class: "append" });
        /**
         * Group element.
         */
        this.group = (DOM.create("div", { class: "group" },
            this.prependSlot,
            this.centerSlot,
            this.appendSlot));
        /**
         * Label element.
         */
        this.labelSlot = DOM.create("slot", { name: "label", class: "label" });
        /**
         * Field element.
         */
        this.field = (DOM.create("label", { class: "field" },
            this.labelSlot,
            this.group));
        /**
         * Field styles.
         */
        this.styles = (DOM.create("style", null, `:host > .field {
  display: flex;
  width: 100%;
}
:host > .field,
:host([data-orientation='row']) > .field {
  flex-direction: row;
}
:host([data-orientation='row']) > .field > .label {
  display: block;
  align-self: center;
}
:host([data-orientation='column']) > .field {
  flex-direction: column;
}
:host > .field > .group {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: inherit;
}
:host > .field > .group > .prepend,
:host > .field > .group > .append {
  flex-shrink: 0;
  flex-grow: 0;
}`));
        /**
         * Field skeleton.
         */
        this.skeleton = (DOM.create("div", { slot: this.properties.slot, class: this.properties.class }, this.children));
        DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.styles, this.field);
        this.bindHandlers();
        this.bindProperties();
        this.assignProperties();
    }
    /**
     * Updates the specified property state into the field element.
     * @param field Field element.
     * @param property Property name.
     * @param state Property state.
     */
    updatePropertyState(field, property, state) {
        if (state) {
            field.dataset[property] = 'on';
        }
        else {
            delete field.dataset[property];
        }
    }
    /**
     * Change event handler.
     */
    changeHandler() {
        let field;
        if ((field = Control.getChildByProperty(this.centerSlot, 'value'))) {
            this.updatePropertyState(field, 'empty', this.empty);
        }
        if ((field = Control.getChildByProperty(this.centerSlot, 'checked'))) {
            this.updatePropertyState(field, 'checked', this.checked);
        }
    }
    /**
     * Bind event handlers to update the custom element.
     */
    bindHandlers() {
        this.skeleton.addEventListener('keyup', this.changeHandler.bind(this), true);
        this.skeleton.addEventListener('change', this.changeHandler.bind(this), true);
    }
    /**
     * Bind exposed properties to the custom element.
     */
    bindProperties() {
        this.bindComponentProperties(this.skeleton, [
            'label',
            'type',
            'name',
            'unwind',
            'value',
            'checked',
            'defaultValue',
            'defaultChecked',
            'empty',
            'required',
            'readOnly',
            'disabled',
            'orientation',
            'reportValidity',
            'checkValidity',
            'setCustomValidity',
            'reset'
        ]);
    }
    /**
     * Assign all element properties.
     */
    assignProperties() {
        this.assignComponentProperties(this.properties, [
            'label',
            'type',
            'name',
            'value',
            'checked',
            'unwind',
            'required',
            'readOnly',
            'disabled'
        ]);
        this.orientation = this.properties.orientation || 'column';
        this.changeHandler();
    }
    /**
     * Get field label.
     */
    get label() {
        return this.labelSlot.assignedNodes()[0];
    }
    /**
     * Set field label.
     */
    set label(label) {
        if (this.label) {
            this.label.remove();
        }
        DOM.append(this.skeleton, label);
    }
    /**
     * Get field type.
     */
    get type() {
        return Control.getChildProperty(this.centerSlot, 'type');
    }
    /**
     * Set field type.
     */
    set type(type) {
        Control.setChildProperty(this.centerSlot, 'type', type);
    }
    /**
     * Get field name.
     */
    get name() {
        return Control.getChildProperty(this.centerSlot, 'name');
    }
    /**
     * Set field name.
     */
    set name(name) {
        Control.setChildProperty(this.centerSlot, 'name', name);
    }
    /**
     * Get unwind state.
     */
    get unwind() {
        return this.states.unwind;
    }
    /**
     * Set unwind state.
     */
    set unwind(state) {
        this.states.unwind = state;
    }
    /**
     * Get field value.
     */
    get value() {
        return Control.getChildProperty(this.centerSlot, 'value');
    }
    /**
     * Set field value.
     */
    set value(value) {
        const field = Control.getChildByProperty(this.centerSlot, 'value');
        if (field) {
            field.value = value;
            this.updatePropertyState(field, 'empty', this.empty);
        }
    }
    /**
     * Get checked state.
     */
    get checked() {
        return Control.getChildProperty(this.centerSlot, 'checked');
    }
    /**
     * Set checked state.
     */
    set checked(state) {
        const field = Control.getChildByProperty(this.centerSlot, 'checked');
        if (field) {
            field.checked = state;
            this.updatePropertyState(field, 'checked', state);
        }
    }
    /**
     * Get default value.
     */
    get defaultValue() {
        const field = Control.getChildByProperty(this.centerSlot, 'defaultValue');
        return field ? field.defaultValue : this.properties.value;
    }
    /**
     * Get default checked state.
     */
    get defaultChecked() {
        const field = Control.getChildProperty(this.centerSlot, 'defaultChecked');
        return field ? field.defaultChecked : this.properties.checked;
    }
    /**
     * Get empty state.
     */
    get empty() {
        return this.value === void 0 || ((typeof this.value === 'string' || this.value instanceof Array) && this.value.length === 0);
    }
    /**
     * Get required state.
     */
    get required() {
        return Control.getChildProperty(this.centerSlot, 'required');
    }
    /**
     * Set required state.
     */
    set required(state) {
        Control.setChildProperty(this.centerSlot, 'required', state);
    }
    /**
     * Get read-only state.
     */
    get readOnly() {
        return Control.getChildProperty(this.centerSlot, 'readOnly');
    }
    /**
     * Set read-only state.
     */
    set readOnly(state) {
        Control.setChildProperty(this.centerSlot, 'readOnly', state);
    }
    /**
     * Get disabled state.
     */
    get disabled() {
        return Control.getChildProperty(this.centerSlot, 'disabled');
    }
    /**
     * Set disabled state.
     */
    set disabled(state) {
        Control.setChildProperty(this.centerSlot, 'disabled', state);
    }
    /**
     * Get orientation mode.
     */
    get orientation() {
        return this.skeleton.dataset.orientation || 'row';
    }
    /**
     * Set orientation mode.
     */
    set orientation(mode) {
        this.skeleton.dataset.orientation = mode;
    }
    /**
     * Field element.
     */
    get element() {
        return this.skeleton;
    }
    /**
     * Checks the field validity.
     * @returns Returns true when the field is valid, false otherwise.
     */
    checkValidity() {
        let field = Control.getChildByProperty(this.centerSlot, 'checkValidity');
        return field ? field.checkValidity() : true;
    }
    /**
     * Reports the field validity.
     * @returns Returns true when the field is valid, false otherwise.
     */
    reportValidity() {
        let field = Control.getChildByProperty(this.centerSlot, 'reportValidity');
        return field ? field.reportValidity() : this.checkValidity();
    }
    /**
     * Set the custom validity error message.
     * @param error Custom error message.
     */
    setCustomValidity(error) {
        const field = Control.getChildByProperty(this.centerSlot, 'setCustomValidity');
        if (field) {
            field.setCustomValidity(error);
        }
    }
    /**
     * Reset the field to its initial value and state.
     */
    reset() {
        const field = Control.getChildByProperty(this.centerSlot, 'reset');
        if (field) {
            field.reset();
        }
        else {
            this.value = this.defaultValue;
            this.checked = this.defaultChecked;
        }
        this.changeHandler();
    }
};
__decorate([
    Class.Private()
], Template.prototype, "states", void 0);
__decorate([
    Class.Private()
], Template.prototype, "prependSlot", void 0);
__decorate([
    Class.Private()
], Template.prototype, "centerSlot", void 0);
__decorate([
    Class.Private()
], Template.prototype, "appendSlot", void 0);
__decorate([
    Class.Private()
], Template.prototype, "group", void 0);
__decorate([
    Class.Private()
], Template.prototype, "labelSlot", void 0);
__decorate([
    Class.Private()
], Template.prototype, "field", void 0);
__decorate([
    Class.Private()
], Template.prototype, "styles", void 0);
__decorate([
    Class.Private()
], Template.prototype, "skeleton", void 0);
__decorate([
    Class.Private()
], Template.prototype, "updatePropertyState", null);
__decorate([
    Class.Private()
], Template.prototype, "changeHandler", null);
__decorate([
    Class.Private()
], Template.prototype, "bindHandlers", null);
__decorate([
    Class.Private()
], Template.prototype, "bindProperties", null);
__decorate([
    Class.Private()
], Template.prototype, "assignProperties", null);
__decorate([
    Class.Public()
], Template.prototype, "label", null);
__decorate([
    Class.Public()
], Template.prototype, "type", null);
__decorate([
    Class.Public()
], Template.prototype, "name", null);
__decorate([
    Class.Public()
], Template.prototype, "unwind", null);
__decorate([
    Class.Public()
], Template.prototype, "value", null);
__decorate([
    Class.Public()
], Template.prototype, "checked", null);
__decorate([
    Class.Public()
], Template.prototype, "defaultValue", null);
__decorate([
    Class.Public()
], Template.prototype, "defaultChecked", null);
__decorate([
    Class.Public()
], Template.prototype, "empty", null);
__decorate([
    Class.Public()
], Template.prototype, "required", null);
__decorate([
    Class.Public()
], Template.prototype, "readOnly", null);
__decorate([
    Class.Public()
], Template.prototype, "disabled", null);
__decorate([
    Class.Public()
], Template.prototype, "orientation", null);
__decorate([
    Class.Public()
], Template.prototype, "element", null);
__decorate([
    Class.Public()
], Template.prototype, "checkValidity", null);
__decorate([
    Class.Public()
], Template.prototype, "reportValidity", null);
__decorate([
    Class.Public()
], Template.prototype, "setCustomValidity", null);
__decorate([
    Class.Public()
], Template.prototype, "reset", null);
Template = __decorate([
    Class.Describe()
], Template);
exports.Template = Template;

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
const JSX = require("@singleware/jsx");
/**
 * Field element.
 */
let Element = class Element extends HTMLElement {
    /**
     * Default constructor.
     */
    constructor() {
        super();
        /**
         * Label slot element.
         */
        this.labelSlot = JSX.create("slot", { name: "label", class: "label" });
        /**
         * Prepend slot element.
         */
        this.prependSlot = JSX.create("slot", { name: "prepend", class: "prepend" });
        /**
         * Center slot element.
         */
        this.centerSlot = JSX.create("slot", { name: "center", class: "center" });
        /**
         * Append slot element.
         */
        this.appendSlot = JSX.create("slot", { name: "append", class: "append" });
        /**
         * Field layout element.
         */
        this.fieldLayout = (JSX.create("label", { class: "field" },
            this.labelSlot,
            JSX.create("div", { class: "group" },
                this.prependSlot,
                this.centerSlot,
                this.appendSlot)));
        /**
         * Field styles element.
         */
        this.fieldStyles = (JSX.create("style", null, `:host > .field {
  display: flex;
  width: 100%;
}
:host([orientation='row']) > .field {
  flex-direction: row;
}
:host([orientation='row']) > .field > .label {
  display: block;
  align-self: center;
}
:host > .field,
:host([orientation='column']) > .field {
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
        const shadow = JSX.append(this.attachShadow({ mode: 'closed' }), this.fieldStyles, this.fieldLayout);
        const options = { capture: true, passive: true };
        const callback = this.changeHandler.bind(this);
        shadow.addEventListener('slotchange', callback, options);
        shadow.addEventListener('focus', callback, options);
        shadow.addEventListener('keyup', callback, options);
        shadow.addEventListener('change', callback, options);
        shadow.addEventListener('blur', callback, options);
    }
    /**
     * Gets the first child element from specified slot element.
     * @param slot Slot element.
     * @throws Throws an error when there are no children in the specified slot.
     * @returns Returns the first child element.
     */
    getChildElement(slot) {
        const child = slot.assignedNodes()[0];
        if (!child) {
            throw new Error(`There are no children in the '${slot.name}' slot.`);
        }
        return child;
    }
    /**
     * Sets the property into the first child from specified slot element.
     * @param slot Slot element.
     * @param property Property name.
     * @param value Property value.
     * @throws Throws an error when there are no children in the specified slot.
     * @returns Returns true when the specified property has been assigned, false otherwise.
     */
    setChildProperty(slot, property, value) {
        const child = this.getChildElement(slot);
        if (property in child) {
            child[property] = value;
            return true;
        }
        return false;
    }
    /**
     * Gets the property from the first child in the specified slot element.
     * @param slot Slot element.
     * @param property Property name.
     * @returns Returns the property value.
     * @throws Throws an error when there are no children in the specified slot.
     */
    getChildProperty(slot, property) {
        return this.getChildElement(slot)[property];
    }
    /**
     * Updates the specified state in the element.
     * @param name State name.
     * @param state State value.
     */
    updateState(name, state) {
        if (state) {
            this.setAttribute(name, '');
        }
        else {
            this.removeAttribute(name);
        }
    }
    /**
     * Change event handler.
     */
    changeHandler() {
        this.updateState('empty', this.empty);
        this.updateState('checked', this.checked);
        this.updateState('invalid', !this.empty && !this.checkValidity());
    }
    /**
     * Determines whether the element is empty or not.
     */
    get empty() {
        const child = this.getChildElement(this.centerSlot);
        if ('empty' in child) {
            return child.empty;
        }
        return child.value === void 0 || ((typeof child.value === 'string' || child.value instanceof Array) && child.value.length === 0);
    }
    /**
     * Gets the element label.
     */
    get label() {
        return this.labelSlot.assignedNodes()[0];
    }
    /**
     * Sets the element label.
     */
    set label(label) {
        if (this.label) {
            this.label.remove();
        }
        JSX.append(this, label);
    }
    /**
     * Gets the element type.
     */
    get type() {
        return this.getChildProperty(this.centerSlot, 'type');
    }
    /**
     * Sets the element type.
     */
    set type(type) {
        this.setChildProperty(this.centerSlot, 'type', type);
    }
    /**
     * Gets the element name.
     */
    get name() {
        return this.getChildProperty(this.centerSlot, 'name');
    }
    /**
     * Sets the element name.
     */
    set name(name) {
        this.setChildProperty(this.centerSlot, 'name', name);
    }
    /**
     * Gets the element value.
     */
    get value() {
        return this.getChildProperty(this.centerSlot, 'value');
    }
    /**
     * Sets the element value.
     */
    set value(value) {
        this.setChildProperty(this.centerSlot, 'value', value);
    }
    /**
     * Gets the checked state of the element.
     */
    get checked() {
        return Boolean(this.getChildProperty(this.centerSlot, 'checked'));
    }
    /**
     * Sets the checked state of the element.
     */
    set checked(value) {
        this.setChildProperty(this.centerSlot, 'checked', Boolean(value));
    }
    /**
     * Gets the default value of the element.
     */
    get defaultValue() {
        return this.getChildProperty(this.centerSlot, 'defaultValue');
    }
    /**
     * Sets the default value of the element.
     */
    set defaultValue(value) {
        this.setChildProperty(this.centerSlot, 'defaultValue', value);
    }
    /**
     * Gets the default checked state of the element.
     */
    get defaultChecked() {
        return Boolean(this.getChildProperty(this.centerSlot, 'defaultChecked'));
    }
    /**
     * Sets the default checked state of the element.
     */
    set defaultChecked(value) {
        this.setChildProperty(this.centerSlot, 'defaultChecked', Boolean(value));
    }
    /**
     * Gets the required state of the element.
     */
    get required() {
        return this.hasAttribute('required');
    }
    /**
     * Sets the required state of the element.
     */
    set required(state) {
        this.updateState('required', this.setChildProperty(this.centerSlot, 'required', state) && state);
    }
    /**
     * Gets the read-only state of the element.
     */
    get readOnly() {
        return this.hasAttribute('readonly');
    }
    /**
     * Sets the read-only state of the element.
     */
    set readOnly(state) {
        this.updateState('readonly', this.setChildProperty(this.centerSlot, 'readOnly', state) && state);
    }
    /**
     * Gets the disabled state of the element.
     */
    get disabled() {
        return this.hasAttribute('disabled');
    }
    /**
     * Sets the disabled state of the element.
     */
    set disabled(state) {
        this.updateState('disabled', this.setChildProperty(this.centerSlot, 'disabled', state) && state);
    }
    /**
     * Gets the element orientation.
     */
    get orientation() {
        return this.getAttribute('orientation') || 'column';
    }
    /**
     * Sets the element orientation.
     */
    set orientation(orientation) {
        this.setAttribute('orientation', orientation);
    }
    /**
     * Move the focus to this element.
     */
    focus() {
        const child = this.getChildElement(this.centerSlot);
        if (child.focus instanceof Function) {
            child.focus();
        }
    }
    /**
     * Reset the element value to its initial value.
     */
    reset() {
        const child = this.getChildElement(this.centerSlot);
        if (child.reset instanceof Function) {
            child.reset();
        }
        else {
            if ('value' in child) {
                child.value = child.defaultValue;
            }
            if ('checked' in child) {
                child.checked = child.defaultChecked;
            }
        }
    }
    /**
     * Checks the element validity.
     * @returns Returns true when the element is valid, false otherwise.
     */
    checkValidity() {
        const child = this.getChildElement(this.centerSlot);
        return !(child.checkValidity instanceof Function) || child.checkValidity();
    }
    /**
     * Set the element custom validity error message.
     * @param error Custom error message.
     */
    setCustomValidity(error) {
        const child = this.getChildElement(this.centerSlot);
        if (child.setCustomValidity instanceof Function) {
            child.setCustomValidity(error);
        }
    }
};
__decorate([
    Class.Private()
], Element.prototype, "labelSlot", void 0);
__decorate([
    Class.Private()
], Element.prototype, "prependSlot", void 0);
__decorate([
    Class.Private()
], Element.prototype, "centerSlot", void 0);
__decorate([
    Class.Private()
], Element.prototype, "appendSlot", void 0);
__decorate([
    Class.Private()
], Element.prototype, "fieldLayout", void 0);
__decorate([
    Class.Private()
], Element.prototype, "fieldStyles", void 0);
__decorate([
    Class.Private()
], Element.prototype, "getChildElement", null);
__decorate([
    Class.Private()
], Element.prototype, "setChildProperty", null);
__decorate([
    Class.Private()
], Element.prototype, "getChildProperty", null);
__decorate([
    Class.Private()
], Element.prototype, "updateState", null);
__decorate([
    Class.Private()
], Element.prototype, "changeHandler", null);
__decorate([
    Class.Public()
], Element.prototype, "empty", null);
__decorate([
    Class.Public()
], Element.prototype, "label", null);
__decorate([
    Class.Public()
], Element.prototype, "type", null);
__decorate([
    Class.Public()
], Element.prototype, "name", null);
__decorate([
    Class.Public()
], Element.prototype, "value", null);
__decorate([
    Class.Public()
], Element.prototype, "checked", null);
__decorate([
    Class.Public()
], Element.prototype, "defaultValue", null);
__decorate([
    Class.Public()
], Element.prototype, "defaultChecked", null);
__decorate([
    Class.Public()
], Element.prototype, "required", null);
__decorate([
    Class.Public()
], Element.prototype, "readOnly", null);
__decorate([
    Class.Public()
], Element.prototype, "disabled", null);
__decorate([
    Class.Public()
], Element.prototype, "orientation", null);
__decorate([
    Class.Public()
], Element.prototype, "focus", null);
__decorate([
    Class.Public()
], Element.prototype, "reset", null);
__decorate([
    Class.Public()
], Element.prototype, "checkValidity", null);
__decorate([
    Class.Public()
], Element.prototype, "setCustomValidity", null);
Element = __decorate([
    JSX.Describe('swe-field'),
    Class.Describe()
], Element);
exports.Element = Element;

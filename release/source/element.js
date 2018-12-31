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
const Control = require("@singleware/ui-control");
const stylesheet_1 = require("./stylesheet");
/**
 * Field element.
 */
let Element = class Element extends Control.Element {
    /**
     * Default constructor.
     */
    constructor() {
        super();
        /**
         * Element styles.
         */
        this.styles = new stylesheet_1.Stylesheet();
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
        this.fieldStyles = JSX.create("style", { type: "text/css" }, this.styles.toString());
        const shadow = JSX.append(this.attachShadow({ mode: 'closed' }), this.fieldStyles, this.fieldLayout);
        shadow.addEventListener('slotchange', this.changeHandler.bind(this));
        shadow.addEventListener('keyup', this.changeHandler.bind(this));
        shadow.addEventListener('change', this.changeHandler.bind(this));
    }
    /**
     * Change event handler.
     */
    changeHandler() {
        this.updatePropertyState('empty', this.empty);
        this.updatePropertyState('checked', this.checked);
        this.updatePropertyState('invalid', !this.empty && !this.checkValidity());
    }
    /**
     * Determines whether the element is empty or not.
     */
    get empty() {
        const child = this.getRequiredChildElement(this.centerSlot);
        if (!('empty' in child)) {
            return child.value === void 0 || ((typeof child.value === 'string' || child.value instanceof Array) && child.value.length === 0);
        }
        return child.empty;
    }
    /**
     * Gets the label.
     */
    get label() {
        return this.currentLabel;
    }
    /**
     * Sets the label.
     */
    set label(label) {
        const child = this.labelSlot.assignedNodes()[0];
        if (child) {
            JSX.append(JSX.clear(child), (this.currentLabel = label));
        }
    }
    /**
     * Gets the element type.
     */
    get type() {
        return this.getRequiredChildProperty(this.centerSlot, 'type');
    }
    /**
     * Sets the element type.
     */
    set type(type) {
        this.setRequiredChildProperty(this.centerSlot, 'type', type);
    }
    /**
     * Gets the element name.
     */
    get name() {
        return this.getRequiredChildProperty(this.centerSlot, 'name');
    }
    /**
     * Sets the element name.
     */
    set name(name) {
        this.setRequiredChildProperty(this.centerSlot, 'name', name);
    }
    /**
     * Gets the element value.
     */
    get value() {
        return this.getRequiredChildProperty(this.centerSlot, 'value');
    }
    /**
     * Sets the element value.
     */
    set value(value) {
        this.setRequiredChildProperty(this.centerSlot, 'value', value);
    }
    /**
     * Gets the checked state of the element.
     */
    get checked() {
        return Boolean(this.getRequiredChildProperty(this.centerSlot, 'checked'));
    }
    /**
     * Sets the checked state of the element.
     */
    set checked(value) {
        this.setRequiredChildProperty(this.centerSlot, 'checked', Boolean(value));
    }
    /**
     * Gets the default value of the element.
     */
    get defaultValue() {
        return this.getRequiredChildProperty(this.centerSlot, 'defaultValue');
    }
    /**
     * Sets the default value of the element.
     */
    set defaultValue(value) {
        this.setRequiredChildProperty(this.centerSlot, 'defaultValue', value);
    }
    /**
     * Gets the default checked state of the element.
     */
    get defaultChecked() {
        return Boolean(this.getRequiredChildProperty(this.centerSlot, 'defaultChecked'));
    }
    /**
     * Sets the default checked state of the element.
     */
    set defaultChecked(value) {
        this.setRequiredChildProperty(this.centerSlot, 'defaultChecked', Boolean(value));
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
        this.updatePropertyState('required', this.setRequiredChildProperty(this.centerSlot, 'required', state) && state);
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
        this.updatePropertyState('readonly', this.setRequiredChildProperty(this.centerSlot, 'readOnly', state) && state);
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
        this.updatePropertyState('disabled', this.setRequiredChildProperty(this.centerSlot, 'disabled', state) && state);
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
        this.callRequiredChildMethod(this.centerSlot, 'focus', []);
    }
    /**
     * Reset the element value to its initial value.
     */
    reset() {
        const child = this.getRequiredChildElement(this.centerSlot);
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
        this.changeHandler();
    }
    /**
     * Checks the element validity.
     * @returns Returns true when the element is valid, false otherwise.
     */
    checkValidity() {
        return this.callRequiredChildMethod(this.centerSlot, 'checkValidity', []) !== false;
    }
    /**
     * Set the element custom validity error message.
     * @param error Custom error message.
     */
    setCustomValidity(error) {
        this.callRequiredChildMethod(this.centerSlot, 'setCustomValidity', [error]);
    }
};
__decorate([
    Class.Private()
], Element.prototype, "styles", void 0);
__decorate([
    Class.Private()
], Element.prototype, "currentLabel", void 0);
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

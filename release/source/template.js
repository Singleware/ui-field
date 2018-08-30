"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Template_1;
"use strict";
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
let Template = Template_1 = class Template extends Control.Component {
    /**
     * Default constructor.
     * @param properties Field properties.
     * @param children Field children.
     */
    constructor(properties, children) {
        super(properties, children);
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
:host > .field[data-orientation='row'] {
  flex-direction: row;
}
:host > .field[data-orientation='row'] > .label {
  display: block;
  align-self: center;
}
:host > .field[data-orientation='column'] {
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
        /**
         * Field elements.
         */
        this.elements = DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.styles, this.field);
        this.bindHandlers();
        this.bindProperties();
        this.assignProperties();
    }
    /**
     * Change event handler.
     */
    changeHandler() {
        const field = Control.getChildByProperty(this.centerSlot, 'value');
        if (field) {
            if (this.empty) {
                field.dataset.empty = 'on';
            }
            else {
                delete field.dataset.empty;
            }
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
        Object.defineProperties(this.skeleton, {
            label: super.bindDescriptor(this, Template_1.prototype, 'label'),
            type: super.bindDescriptor(this, Template_1.prototype, 'type'),
            name: super.bindDescriptor(this, Template_1.prototype, 'name'),
            value: super.bindDescriptor(this, Template_1.prototype, 'value'),
            empty: super.bindDescriptor(this, Template_1.prototype, 'empty'),
            required: super.bindDescriptor(this, Template_1.prototype, 'required'),
            readOnly: super.bindDescriptor(this, Template_1.prototype, 'readOnly'),
            disabled: super.bindDescriptor(this, Template_1.prototype, 'disabled'),
            orientation: super.bindDescriptor(this, Template_1.prototype, 'orientation'),
            setCustomValidity: super.bindDescriptor(this, Template_1.prototype, 'setCustomValidity')
        });
    }
    /**
     * Assign all element properties.
     */
    assignProperties() {
        Control.assignProperties(this, this.properties, ['label', 'type', 'name', 'value', 'required', 'readOnly', 'disabled']);
        this.orientation = this.properties.orientation || 'row';
        this.changeHandler();
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
     * Get field label.
     */
    get label() {
        const children = this.labelSlot.assignedNodes();
        return children && children.length ? children[0] : void 0;
    }
    /**
     * Set field label.
     */
    set label(label) {
        DOM.append(DOM.clear(this.labelSlot), label);
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
     * Get field value.
     */
    get value() {
        return Control.getChildProperty(this.centerSlot, 'value');
    }
    /**
     * Set field value.
     */
    set value(value) {
        Control.setChildProperty(this.centerSlot, 'value', value);
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
        return this.field.dataset.orientation || 'row';
    }
    /**
     * Set orientation mode.
     */
    set orientation(mode) {
        this.field.dataset.orientation = mode;
    }
    /**
     * Field element.
     */
    get element() {
        return this.skeleton;
    }
};
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
], Template.prototype, "elements", void 0);
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
], Template.prototype, "setCustomValidity", null);
__decorate([
    Class.Public()
], Template.prototype, "label", null);
__decorate([
    Class.Public()
], Template.prototype, "name", null);
__decorate([
    Class.Public()
], Template.prototype, "type", null);
__decorate([
    Class.Public()
], Template.prototype, "value", null);
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
Template = Template_1 = __decorate([
    Class.Describe()
], Template);
exports.Template = Template;

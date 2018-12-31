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
const OSS = require("@singleware/oss");
/**
 * Field stylesheet class.
 */
let Stylesheet = class Stylesheet extends OSS.Stylesheet {
    /**
     * Default constructor.
     */
    constructor() {
        super();
        /**
         * Host styles.
         */
        this.host = this.select(':host');
        /**
         * Field styles.
         */
        this.field = this.select(':host>.field');
        /**
         * Field group styles.
         */
        this.fieldGroup = this.select(':host>.field>.group');
        /**
         * Field sides styles.
         */
        this.fieldSides = this.select(':host>.field>.group>.prepend, :host>.field>.group>.append');
        /**
         * Row field styles.
         */
        this.rowField = this.select(':host([orientation="row"])>.field');
        /**
         * Row field label styles.
         */
        this.rowFieldLabel = this.select(':host([orientation="row"])>.field>.label');
        /**
         * Column field styles.
         */
        this.columnField = this.select(':host([orientation="column"])>.field, :host>.field');
        this.host.display = 'block';
        this.field.display = 'flex';
        this.field.width = '100%';
        this.fieldGroup.display = 'flex';
        this.fieldGroup.flexDirection = 'row';
        this.fieldGroup.alignItems = 'center';
        this.fieldGroup.width = 'inherit';
        this.fieldSides.flexShrink = 0;
        this.fieldSides.flexGrow = 0;
        this.rowField.flexDirection = 'row';
        this.rowFieldLabel.display = 'block';
        this.rowFieldLabel.alignSelf = 'center';
        this.columnField.flexDirection = 'column';
    }
};
__decorate([
    Class.Private()
], Stylesheet.prototype, "host", void 0);
__decorate([
    Class.Private()
], Stylesheet.prototype, "field", void 0);
__decorate([
    Class.Private()
], Stylesheet.prototype, "fieldGroup", void 0);
__decorate([
    Class.Private()
], Stylesheet.prototype, "fieldSides", void 0);
__decorate([
    Class.Private()
], Stylesheet.prototype, "rowField", void 0);
__decorate([
    Class.Private()
], Stylesheet.prototype, "rowFieldLabel", void 0);
__decorate([
    Class.Private()
], Stylesheet.prototype, "columnField", void 0);
Stylesheet = __decorate([
    Class.Describe()
], Stylesheet);
exports.Stylesheet = Stylesheet;

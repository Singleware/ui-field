/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as DOM from '@singleware/jsx';
import * as Control from '@singleware/ui-control';

import { Properties } from './properties';
import { Element } from './element';

/**
 * Field template class.
 */
@Class.Describe()
export class Template extends Control.Component<Properties> {
  /**
   * Prepend element.
   */
  @Class.Private()
  private prependSlot: HTMLSlotElement = <slot name="prepend" class="prepend" /> as HTMLSlotElement;

  /**
   * Center element.
   */
  @Class.Private()
  private centerSlot: HTMLSlotElement = <slot name="center" class="center" /> as HTMLSlotElement;

  /**
   * Append element.
   */
  @Class.Private()
  private appendSlot: HTMLSlotElement = <slot name="append" class="append" /> as HTMLSlotElement;

  /**
   * Group element.
   */
  @Class.Private()
  private group: HTMLDivElement = (
    <div class="group">
      {this.prependSlot}
      {this.centerSlot}
      {this.appendSlot}
    </div>
  ) as HTMLDivElement;

  /**
   * Label element.
   */
  @Class.Private()
  private labelSlot: HTMLSlotElement = <slot name="label" class="label" /> as HTMLSlotElement;

  /**
   * Field element.
   */
  @Class.Private()
  private field: HTMLLabelElement = (
    <label class="field">
      {this.labelSlot}
      {this.group}
    </label>
  ) as HTMLLabelElement;

  /**
   * Field styles.
   */
  @Class.Private()
  private styles: HTMLStyleElement = (
    <style>
      {`:host > .field {
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
}`}
    </style>
  ) as HTMLStyleElement;

  /**
   * Field skeleton.
   */
  @Class.Private()
  private skeleton: Element = (
    <div slot={this.properties.slot} class={this.properties.class}>
      {this.children}
    </div>
  ) as Element;

  /**
   * Field elements.
   */
  @Class.Private()
  private elements: ShadowRoot = DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.styles, this.field) as ShadowRoot;

  /**
   * Change event handler.
   */
  @Class.Private()
  private changeHandler(): void {
    const field = Control.getChildByProperty(this.centerSlot, 'value');
    if (field) {
      if (this.empty) {
        field.dataset.empty = 'on';
      } else {
        delete field.dataset.empty;
      }
    }
  }

  /**
   * Bind event handlers to update the custom element.
   */
  @Class.Private()
  private bindHandlers(): void {
    this.skeleton.addEventListener('keyup', this.changeHandler.bind(this), true);
    this.skeleton.addEventListener('change', this.changeHandler.bind(this), true);
  }

  /**
   * Bind exposed properties to the custom element.
   */
  @Class.Private()
  private bindProperties(): void {
    Object.defineProperties(this.skeleton, {
      label: super.bindDescriptor(this, Template.prototype, 'label'),
      type: super.bindDescriptor(this, Template.prototype, 'type'),
      name: super.bindDescriptor(this, Template.prototype, 'name'),
      value: super.bindDescriptor(this, Template.prototype, 'value'),
      empty: super.bindDescriptor(this, Template.prototype, 'empty'),
      required: super.bindDescriptor(this, Template.prototype, 'required'),
      readOnly: super.bindDescriptor(this, Template.prototype, 'readOnly'),
      disabled: super.bindDescriptor(this, Template.prototype, 'disabled'),
      orientation: super.bindDescriptor(this, Template.prototype, 'orientation'),
      setCustomValidity: super.bindDescriptor(this, Template.prototype, 'setCustomValidity')
    });
  }

  /**
   * Assign all element properties.
   */
  @Class.Private()
  private assignProperties(): void {
    Control.assignProperties(this, this.properties, ['label', 'type', 'name', 'value', 'required', 'readOnly', 'disabled']);
    this.orientation = this.properties.orientation || 'row';
    this.changeHandler();
  }

  /**
   * Default constructor.
   * @param properties Field properties.
   * @param children Field children.
   */
  constructor(properties?: Properties, children?: any[]) {
    super(properties, children);
    this.bindHandlers();
    this.bindProperties();
    this.assignProperties();
  }

  /**
   * Set the custom validity error message.
   * @param error Custom error message.
   */
  @Class.Public()
  public setCustomValidity(error?: string): void {
    const field = Control.getChildByProperty(this.centerSlot, 'setCustomValidity');
    if (field) {
      (field as any).setCustomValidity(error);
    }
  }

  /**
   * Get field label.
   */
  @Class.Public()
  public get label(): any {
    const children = this.labelSlot.assignedNodes();
    return children && children.length ? children[0] : void 0;
  }

  /**
   * Set field label.
   */
  public set label(label: any) {
    DOM.append(DOM.clear(this.labelSlot), label);
  }

  /**
   * Get field name.
   */
  @Class.Public()
  public get name(): string {
    return Control.getChildProperty(this.centerSlot, 'name');
  }

  /**
   * Set field name.
   */
  public set name(name: string) {
    Control.setChildProperty(this.centerSlot, 'name', name);
  }

  /**
   * Get field type.
   */
  @Class.Public()
  public get type(): string {
    return Control.getChildProperty(this.centerSlot, 'type');
  }

  /**
   * Set field type.
   */
  public set type(type: string) {
    Control.setChildProperty(this.centerSlot, 'type', type);
  }

  /**
   * Get field value.
   */
  @Class.Public()
  public get value(): any {
    return Control.getChildProperty(this.centerSlot, 'value');
  }

  /**
   * Set field value.
   */
  public set value(value: any) {
    Control.setChildProperty(this.centerSlot, 'value', value);
  }

  /**
   * Get empty state.
   */
  @Class.Public()
  public get empty(): any {
    return this.value === void 0 || ((typeof this.value === 'string' || this.value instanceof Array) && this.value.length === 0);
  }

  /**
   * Get required state.
   */
  @Class.Public()
  public get required(): boolean {
    return Control.getChildProperty(this.centerSlot, 'required');
  }

  /**
   * Set required state.
   */
  public set required(state: boolean) {
    Control.setChildProperty(this.centerSlot, 'required', state);
  }

  /**
   * Get read-only state.
   */
  @Class.Public()
  public get readOnly(): boolean {
    return Control.getChildProperty(this.centerSlot, 'readOnly');
  }

  /**
   * Set read-only state.
   */
  public set readOnly(state: boolean) {
    Control.setChildProperty(this.centerSlot, 'readOnly', state);
  }

  /**
   * Get disabled state.
   */
  @Class.Public()
  public get disabled(): boolean {
    return Control.getChildProperty(this.centerSlot, 'disabled');
  }

  /**
   * Set disabled state.
   */
  public set disabled(state: boolean) {
    Control.setChildProperty(this.centerSlot, 'disabled', state);
  }

  /**
   * Get orientation mode.
   */
  @Class.Public()
  public get orientation(): string {
    return this.field.dataset.orientation || 'row';
  }

  /**
   * Set orientation mode.
   */
  public set orientation(mode: string) {
    this.field.dataset.orientation = mode;
  }

  /**
   * Field element.
   */
  @Class.Public()
  public get element(): Element {
    return this.skeleton;
  }
}

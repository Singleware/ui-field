/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as DOM from '@singleware/jsx';
import * as Control from '@singleware/ui-control';

import { Properties } from './properties';
import { Element } from './element';
import { States } from './states';

/**
 * Field template class.
 */
@Class.Describe()
export class Template extends Control.Component<Properties> {
  /**
   * Field states.
   */
  @Class.Private()
  private states = {
    unwind: false
  } as States;

  /**
   * Prepend element.
   */
  @Class.Private()
  private prependSlot = <slot name="prepend" class="prepend" /> as HTMLSlotElement;

  /**
   * Center element.
   */
  @Class.Private()
  private centerSlot = <slot name="center" class="center" /> as HTMLSlotElement;

  /**
   * Append element.
   */
  @Class.Private()
  private appendSlot = <slot name="append" class="append" /> as HTMLSlotElement;

  /**
   * Group element.
   */
  @Class.Private()
  private group = (
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
  private labelSlot = <slot name="label" class="label" /> as HTMLSlotElement;

  /**
   * Field element.
   */
  @Class.Private()
  private field = (
    <label class="field">
      {this.labelSlot}
      {this.group}
    </label>
  ) as HTMLLabelElement;

  /**
   * Field styles.
   */
  @Class.Private()
  private styles = (
    <style>
      {`:host > .field {
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
}`}
    </style>
  ) as HTMLStyleElement;

  /**
   * Field skeleton.
   */
  @Class.Private()
  private skeleton = (
    <div slot={this.properties.slot} class={this.properties.class}>
      {this.children}
    </div>
  ) as Element;

  /**
   * Updates the specified property state into the field element.
   * @param field Field element.
   * @param property Property name.
   * @param state Property state.
   */
  @Class.Private()
  private updatePropertyState(field: HTMLElement, property: string, state: boolean): void {
    if (state) {
      field.dataset[property] = 'on';
    } else {
      delete field.dataset[property];
    }
  }

  /**
   * Change event handler.
   */
  @Class.Private()
  private changeHandler(): void {
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
  @Class.Private()
  private assignProperties(): void {
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
   * Default constructor.
   * @param properties Field properties.
   * @param children Field children.
   */
  constructor(properties?: Properties, children?: any[]) {
    super(properties, children);
    DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.styles, this.field);
    this.bindHandlers();
    this.bindProperties();
    this.assignProperties();
  }

  /**
   * Get field label.
   */
  @Class.Public()
  public get label(): any {
    return this.labelSlot.assignedNodes()[0];
  }

  /**
   * Set field label.
   */
  public set label(label: any) {
    if (this.label) {
      this.label.remove();
    }
    DOM.append(this.skeleton, label);
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
   * Get unwind state.
   */
  @Class.Public()
  public get unwind(): boolean {
    return this.states.unwind;
  }

  /**
   * Set unwind state.
   */
  public set unwind(state: boolean) {
    this.states.unwind = state;
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
    const field = Control.getChildByProperty(this.centerSlot, 'value') as any;
    if (field) {
      field.value = value;
      this.updatePropertyState(field, 'empty', this.empty);
    }
  }

  /**
   * Get checked state.
   */
  @Class.Public()
  public get checked(): boolean {
    return Control.getChildProperty(this.centerSlot, 'checked');
  }

  /**
   * Set checked state.
   */
  public set checked(state: boolean) {
    const field = Control.getChildByProperty(this.centerSlot, 'checked') as any;
    if (field) {
      field.checked = state;
      this.updatePropertyState(field, 'checked', state);
    }
  }

  /**
   * Get default value.
   */
  @Class.Public()
  public get defaultValue(): any {
    const field = Control.getChildByProperty(this.centerSlot, 'defaultValue') as any;
    return field ? field.defaultValue : this.properties.value;
  }

  /**
   * Get default checked state.
   */
  @Class.Public()
  public get defaultChecked(): boolean {
    const field = Control.getChildProperty(this.centerSlot, 'defaultChecked') as any;
    return field ? field.defaultChecked : this.properties.checked;
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
    return this.skeleton.dataset.orientation || 'row';
  }

  /**
   * Set orientation mode.
   */
  public set orientation(mode: string) {
    this.skeleton.dataset.orientation = mode;
  }

  /**
   * Field element.
   */
  @Class.Public()
  public get element(): Element {
    return this.skeleton;
  }

  /**
   * Checks the field validity.
   * @returns Returns true when the field is valid, false otherwise.
   */
  @Class.Public()
  public checkValidity(): boolean {
    let field = Control.getChildByProperty(this.centerSlot, 'checkValidity') as any;
    return field ? field.checkValidity() : true;
  }

  /**
   * Reports the field validity.
   * @returns Returns true when the field is valid, false otherwise.
   */
  @Class.Public()
  public reportValidity(): boolean {
    let field = Control.getChildByProperty(this.centerSlot, 'reportValidity') as any;
    return field ? field.reportValidity() : this.checkValidity();
  }

  /**
   * Set the custom validity error message.
   * @param error Custom error message.
   */
  @Class.Public()
  public setCustomValidity(error?: string): void {
    const field = Control.getChildByProperty(this.centerSlot, 'setCustomValidity') as any;
    if (field) {
      field.setCustomValidity(error);
    }
  }

  /**
   * Reset the field to its initial value and state.
   */
  @Class.Public()
  public reset(): void {
    const field = Control.getChildByProperty(this.centerSlot, 'reset') as any;
    if (field) {
      field.reset();
    } else {
      this.value = this.defaultValue;
      this.checked = this.defaultChecked;
    }
    this.changeHandler();
  }
}

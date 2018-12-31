/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as JSX from '@singleware/jsx';
import * as Control from '@singleware/ui-control';

import { Stylesheet } from './stylesheet';

/**
 * Field element.
 */
@JSX.Describe('swe-field')
@Class.Describe()
export class Element extends Control.Element {
  /**
   * Element styles.
   */
  @Class.Private()
  private styles = new Stylesheet();

  /**
   * Current label content.
   */
  @Class.Private()
  private currentLabel: any;

  /**
   * Label slot element.
   */
  @Class.Private()
  private labelSlot = <slot name="label" class="label" /> as HTMLSlotElement;

  /**
   * Prepend slot element.
   */
  @Class.Private()
  private prependSlot = <slot name="prepend" class="prepend" /> as HTMLSlotElement;

  /**
   * Center slot element.
   */
  @Class.Private()
  private centerSlot = <slot name="center" class="center" /> as HTMLSlotElement;

  /**
   * Append slot element.
   */
  @Class.Private()
  private appendSlot = <slot name="append" class="append" /> as HTMLSlotElement;

  /**
   * Field layout element.
   */
  @Class.Private()
  private fieldLayout = (
    <label class="field">
      {this.labelSlot}
      <div class="group">
        {this.prependSlot}
        {this.centerSlot}
        {this.appendSlot}
      </div>
    </label>
  ) as HTMLLabelElement;

  /**
   * Field styles element.
   */
  @Class.Private()
  private fieldStyles = <style type="text/css">{this.styles.toString()}</style> as HTMLStyleElement;

  /**
   * Change event handler.
   */
  @Class.Private()
  private changeHandler(): void {
    this.updatePropertyState('empty', this.empty);
    this.updatePropertyState('checked', this.checked);
    this.updatePropertyState('invalid', !this.empty && !this.checkValidity());
  }

  /**
   * Default constructor.
   */
  constructor() {
    super();
    const shadow = JSX.append(this.attachShadow({ mode: 'closed' }), this.fieldStyles, this.fieldLayout) as ShadowRoot;
    shadow.addEventListener('slotchange', this.changeHandler.bind(this));
    shadow.addEventListener('keyup', this.changeHandler.bind(this));
    shadow.addEventListener('change', this.changeHandler.bind(this));
  }

  /**
   * Determines whether the element is empty or not.
   */
  @Class.Public()
  public get empty(): boolean {
    const child = this.getRequiredChildElement(this.centerSlot) as any;
    if (!('empty' in child)) {
      return child.value === void 0 || ((typeof child.value === 'string' || child.value instanceof Array) && child.value.length === 0);
    }
    return child.empty;
  }

  /**
   * Gets the label.
   */
  @Class.Public()
  public get label(): any {
    return this.currentLabel;
  }

  /**
   * Sets the label.
   */
  public set label(label: any) {
    const child = this.labelSlot.assignedNodes()[0] as HTMLElement;
    if (child) {
      JSX.append(JSX.clear(child), (this.currentLabel = label));
    }
  }

  /**
   * Gets the element type.
   */
  @Class.Public()
  public get type(): string {
    return this.getRequiredChildProperty(this.centerSlot, 'type');
  }

  /**
   * Sets the element type.
   */
  public set type(type: string) {
    this.setRequiredChildProperty(this.centerSlot, 'type', type);
  }

  /**
   * Gets the element name.
   */
  @Class.Public()
  public get name(): string {
    return this.getRequiredChildProperty(this.centerSlot, 'name');
  }

  /**
   * Sets the element name.
   */
  public set name(name: string) {
    this.setRequiredChildProperty(this.centerSlot, 'name', name);
  }

  /**
   * Gets the element value.
   */
  @Class.Public()
  public get value(): any {
    return this.getRequiredChildProperty(this.centerSlot, 'value');
  }

  /**
   * Sets the element value.
   */
  public set value(value: any) {
    this.setRequiredChildProperty(this.centerSlot, 'value', value);
  }

  /**
   * Gets the checked state of the element.
   */
  @Class.Public()
  public get checked(): boolean {
    return Boolean(this.getRequiredChildProperty(this.centerSlot, 'checked'));
  }

  /**
   * Sets the checked state of the element.
   */
  public set checked(value: boolean) {
    this.setRequiredChildProperty(this.centerSlot, 'checked', Boolean(value));
  }

  /**
   * Gets the default value of the element.
   */
  @Class.Public()
  public get defaultValue(): any {
    return this.getRequiredChildProperty(this.centerSlot, 'defaultValue');
  }

  /**
   * Sets the default value of the element.
   */
  public set defaultValue(value: any) {
    this.setRequiredChildProperty(this.centerSlot, 'defaultValue', value);
  }

  /**
   * Gets the default checked state of the element.
   */
  @Class.Public()
  public get defaultChecked(): boolean {
    return Boolean(this.getRequiredChildProperty(this.centerSlot, 'defaultChecked'));
  }

  /**
   * Sets the default checked state of the element.
   */
  public set defaultChecked(value: boolean) {
    this.setRequiredChildProperty(this.centerSlot, 'defaultChecked', Boolean(value));
  }

  /**
   * Gets the required state of the element.
   */
  @Class.Public()
  public get required(): boolean {
    return this.hasAttribute('required');
  }

  /**
   * Sets the required state of the element.
   */
  public set required(state: boolean) {
    this.updatePropertyState('required', this.setRequiredChildProperty(this.centerSlot, 'required', state) && state);
  }

  /**
   * Gets the read-only state of the element.
   */
  @Class.Public()
  public get readOnly(): boolean {
    return this.hasAttribute('readonly');
  }

  /**
   * Sets the read-only state of the element.
   */
  public set readOnly(state: boolean) {
    this.updatePropertyState('readonly', this.setRequiredChildProperty(this.centerSlot, 'readOnly', state) && state);
  }

  /**
   * Gets the disabled state of the element.
   */
  @Class.Public()
  public get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  /**
   * Sets the disabled state of the element.
   */
  public set disabled(state: boolean) {
    this.updatePropertyState('disabled', this.setRequiredChildProperty(this.centerSlot, 'disabled', state) && state);
  }

  /**
   * Gets the element orientation.
   */
  @Class.Public()
  public get orientation(): string {
    return this.getAttribute('orientation') || 'column';
  }

  /**
   * Sets the element orientation.
   */
  public set orientation(orientation: string) {
    this.setAttribute('orientation', orientation);
  }

  /**
   * Move the focus to this element.
   */
  @Class.Public()
  public focus(): void {
    this.callRequiredChildMethod(this.centerSlot, 'focus', []);
  }

  /**
   * Reset the element value to its initial value.
   */
  @Class.Public()
  public reset(): void {
    const child = this.getRequiredChildElement(this.centerSlot) as any;
    if (child.reset instanceof Function) {
      child.reset();
    } else {
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
  @Class.Public()
  public checkValidity(): boolean {
    return this.callRequiredChildMethod(this.centerSlot, 'checkValidity', []) !== false;
  }

  /**
   * Set the element custom validity error message.
   * @param error Custom error message.
   */
  @Class.Public()
  public setCustomValidity(error?: string): void {
    this.callRequiredChildMethod(this.centerSlot, 'setCustomValidity', [error]);
  }
}

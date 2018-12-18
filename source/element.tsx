/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as JSX from '@singleware/jsx';

/**
 * Field element.
 */
@JSX.Describe('swe-field')
@Class.Describe()
export class Element extends HTMLElement {
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
  private fieldStyles = (
    <style>
      {`:host {
  display: block;
}
:host > .field {
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
}`}
    </style>
  ) as HTMLStyleElement;

  /**
   * Gets the first child element from specified slot element.
   * @param slot Slot element.
   * @throws Throws an error when there are no children in the specified slot.
   * @returns Returns the first child element.
   */
  @Class.Private()
  private getChildElement(slot: HTMLSlotElement): HTMLElement {
    const child = slot.assignedNodes()[0];
    if (!child) {
      throw new Error(`There are no children in the '${slot.name}' slot.`);
    }
    return child as HTMLElement;
  }

  /**
   * Sets the property into the first child from specified slot element.
   * @param slot Slot element.
   * @param property Property name.
   * @param value Property value.
   * @throws Throws an error when there are no children in the specified slot.
   * @returns Returns true when the specified property has been assigned, false otherwise.
   */
  @Class.Private()
  private setChildProperty(slot: HTMLSlotElement, property: string, value: any): boolean {
    const child = this.getChildElement(slot) as any;
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
  @Class.Private()
  private getChildProperty(slot: HTMLSlotElement, property: string): any {
    return (this.getChildElement(slot) as any)[property];
  }

  /**
   * Updates the specified state in the element.
   * @param name State name.
   * @param state State value.
   */
  @Class.Private()
  private updateState(name: string, state: boolean): void {
    if (state) {
      this.setAttribute(name, '');
    } else {
      this.removeAttribute(name);
    }
  }

  /**
   * Change event handler.
   */
  @Class.Private()
  private changeHandler(): void {
    this.updateState('empty', this.empty);
    this.updateState('checked', this.checked);
    this.updateState('invalid', !this.empty && !this.checkValidity());
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
    const child = this.getChildElement(this.centerSlot) as any;
    if (!('empty' in child)) {
      return child.value === void 0 || ((typeof child.value === 'string' || child.value instanceof Array) && child.value.length === 0);
    }
    return child.empty;
  }

  /**
   * Gets the element label.
   */
  @Class.Public()
  public get label(): any {
    return this.labelSlot.assignedNodes()[0];
  }

  /**
   * Sets the element label.
   */
  public set label(label: any) {
    if (this.label) {
      this.label.remove();
    }
    JSX.append(this, label);
  }

  /**
   * Gets the element type.
   */
  @Class.Public()
  public get type(): string {
    return this.getChildProperty(this.centerSlot, 'type');
  }

  /**
   * Sets the element type.
   */
  public set type(type: string) {
    this.setChildProperty(this.centerSlot, 'type', type);
  }

  /**
   * Gets the element name.
   */
  @Class.Public()
  public get name(): string {
    return this.getChildProperty(this.centerSlot, 'name');
  }

  /**
   * Sets the element name.
   */
  public set name(name: string) {
    this.setChildProperty(this.centerSlot, 'name', name);
  }

  /**
   * Gets the element value.
   */
  @Class.Public()
  public get value(): any {
    return this.getChildProperty(this.centerSlot, 'value');
  }

  /**
   * Sets the element value.
   */
  public set value(value: any) {
    this.setChildProperty(this.centerSlot, 'value', value);
  }

  /**
   * Gets the checked state of the element.
   */
  @Class.Public()
  public get checked(): boolean {
    return Boolean(this.getChildProperty(this.centerSlot, 'checked'));
  }

  /**
   * Sets the checked state of the element.
   */
  public set checked(value: boolean) {
    this.setChildProperty(this.centerSlot, 'checked', Boolean(value));
  }

  /**
   * Gets the default value of the element.
   */
  @Class.Public()
  public get defaultValue(): any {
    return this.getChildProperty(this.centerSlot, 'defaultValue');
  }

  /**
   * Sets the default value of the element.
   */
  public set defaultValue(value: any) {
    this.setChildProperty(this.centerSlot, 'defaultValue', value);
  }

  /**
   * Gets the default checked state of the element.
   */
  @Class.Public()
  public get defaultChecked(): boolean {
    return Boolean(this.getChildProperty(this.centerSlot, 'defaultChecked'));
  }

  /**
   * Sets the default checked state of the element.
   */
  public set defaultChecked(value: boolean) {
    this.setChildProperty(this.centerSlot, 'defaultChecked', Boolean(value));
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
    this.updateState('required', this.setChildProperty(this.centerSlot, 'required', state) && state);
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
    this.updateState('readonly', this.setChildProperty(this.centerSlot, 'readOnly', state) && state);
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
    this.updateState('disabled', this.setChildProperty(this.centerSlot, 'disabled', state) && state);
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
    const child = this.getChildElement(this.centerSlot) as any;
    if (child.focus instanceof Function) {
      child.focus();
    }
  }

  /**
   * Reset the element value to its initial value.
   */
  @Class.Public()
  public reset(): void {
    const child = this.getChildElement(this.centerSlot) as any;
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
    const child = this.getChildElement(this.centerSlot) as any;
    return !(child.checkValidity instanceof Function) || child.checkValidity();
  }

  /**
   * Set the element custom validity error message.
   * @param error Custom error message.
   */
  @Class.Public()
  public setCustomValidity(error?: string): void {
    const child = this.getChildElement(this.centerSlot) as any;
    if (child.setCustomValidity instanceof Function) {
      child.setCustomValidity(error);
    }
  }
}

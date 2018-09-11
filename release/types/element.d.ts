/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Field element interface.
 */
export interface Element extends HTMLDivElement {
  /**
   * Field label.
   */
  label: any;
  /**
   * Field type.
   */
  type?: string;
  /**
   * Field name.
   */
  name: string;
  /**
   * Determines whether the field values must be unrolled.
   */
  unwind: boolean;
  /**
   * Field value.
   */
  value: any;
  /**
   * Checked state.
   */
  checked: boolean;
  /**
   * Default field value.
   */
  readonly defaultValue: any;
  /**
   * Default checked state.
   */
  readonly defaultChecked: boolean;
  /**
   * Determines whether the field is empty or not.
   */
  readonly empty: boolean;
  /**
   * Required state.
   */
  required: boolean;
  /**
   * Read-only state.
   */
  readOnly: boolean;
  /**
   * Disabled state.
   */
  disabled: boolean;
  /**
   * Orientation mode.
   */
  orientation: string;
  /**
   * Checks the field validity.
   * @returns Returns true when the field is valid, false otherwise.
   */
  checkValidity: () => boolean;
  /**
   * Reports the field validity.
   * @returns Returns true when the field is valid, false otherwise.
   */
  reportValidity: () => boolean;
  /**
   * Set the custom validity error message.
   * @param error Custom error message.
   */
  setCustomValidity: (error?: string) => void;
  /**
   * Reset the field to its initial value and state.
   */
  reset: () => void;
}

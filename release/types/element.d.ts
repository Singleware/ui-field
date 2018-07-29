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
   * Field value.
   */
  value: any;
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
   * Set the custom validity error message.
   * @param error Custom error message.
   */
  setCustomValidity: (error?: string) => void;
}

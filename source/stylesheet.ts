/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as OSS from '@singleware/oss';

/**
 * Field stylesheet class.
 */
@Class.Describe()
export class Stylesheet extends OSS.Stylesheet {
  /**
   * Host styles.
   */
  @Class.Private()
  private host = this.select(':host');

  /**
   * Field styles.
   */
  @Class.Private()
  private field = this.select(':host>.field');

  /**
   * Field group styles.
   */
  @Class.Private()
  private fieldGroup = this.select(':host>.field>.group');

  /**
   * Field sides styles.
   */
  @Class.Private()
  private fieldSides = this.select(':host>.field>.group>.prepend, :host>.field>.group>.append');

  /**
   * Row field styles.
   */
  @Class.Private()
  private rowField = this.select(':host([orientation="row"])>.field');

  /**
   * Row field label styles.
   */
  @Class.Private()
  private rowFieldLabel = this.select(':host([orientation="row"])>.field>.label');

  /**
   * Column field styles.
   */
  @Class.Private()
  private columnField = this.select(':host([orientation="column"])>.field, :host>.field');

  /**
   * Default constructor.
   */
  constructor() {
    super();
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
}

import * as Control from '@singleware/ui-control';
import { Properties } from './properties';
import { Element } from './element';
/**
 * Field component class.
 */
export declare class Component<T extends Properties = Properties> extends Control.Component<T> {
    /**
     * Element instance.
     */
    private skeleton;
    /**
     * Default constructor.
     * @param properties Initial properties.
     * @param children Initial children.
     */
    constructor(properties?: T, children?: any[]);
    /**
     * Gets the element.
     */
    readonly element: Element;
    /**
     * Gets the label.
     */
    /**
    * Sets the label.
    */
    label: any;
    /**
     * Gets the empty state of the element.
     */
    readonly empty: boolean;
    /**
     * Gets the element type.
     */
    /**
    * Sets the element type.
    */
    type: string;
    /**
     * Gets the element name.
     */
    /**
    * Sets the element name.
    */
    name: string;
    /**
     * Gets the element value.
     */
    /**
    * Sets the element value.
    */
    value: any;
    /**
     * Gets the checked state of the element.
     */
    /**
    * Sets the checked state of the element.
    */
    checked: boolean;
    /**
     * Gets the default value of the element.
     */
    /**
    * Sets the default value of the element.
    */
    defaultValue: any;
    /**
     * Gets the default checked state of the element.
     */
    /**
    * Sets the default checked state of the element.
    */
    defaultChecked: boolean;
    /**
     * Gets the required state of the element.
     */
    /**
    * Sets the required state of the element.
    */
    required: boolean;
    /**
     * Gets the read-only state of the element.
     */
    /**
    * Sets the read-only state of the element.
    */
    readOnly: boolean;
    /**
     * Gets the disabled state of the element.
     */
    /**
    * Sets the disabled state of the element.
    */
    disabled: boolean;
    /**
     * Gets the element orientation.
     */
    /**
    * Sets the element orientation.
    */
    orientation: string;
    /**
     * Gets the element data.
     */
    /**
    * Sets the element data.
    */
    data: DOMStringMap;
    /**
     * Move the focus to this element.
     */
    focus(): void;
    /**
     * Reset the element value to its initial value.
     */
    reset(): void;
    /**
     * Checks the element validity.
     * @returns Returns true when the element is valid, false otherwise.
     */
    checkValidity(): boolean;
    /**
     * Set the element custom validity error message.
     * @param error Custom error message.
     */
    setCustomValidity(error?: string): void;
}

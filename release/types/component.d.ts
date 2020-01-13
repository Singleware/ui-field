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
    get element(): Element;
    /**
     * Gets the label.
     */
    get label(): any;
    /**
     * Sets the label.
     */
    set label(label: any);
    /**
     * Gets the empty state of the element.
     */
    get empty(): boolean;
    /**
     * Gets the element type.
     */
    get type(): string;
    /**
     * Sets the element type.
     */
    set type(type: string);
    /**
     * Gets the element name.
     */
    get name(): string;
    /**
     * Sets the element name.
     */
    set name(name: string);
    /**
     * Gets the element value.
     */
    get value(): any;
    /**
     * Sets the element value.
     */
    set value(value: any);
    /**
     * Gets the checked state of the element.
     */
    get checked(): boolean;
    /**
     * Sets the checked state of the element.
     */
    set checked(value: boolean);
    /**
     * Gets the default value of the element.
     */
    get defaultValue(): any;
    /**
     * Sets the default value of the element.
     */
    set defaultValue(value: any);
    /**
     * Gets the default checked state of the element.
     */
    get defaultChecked(): boolean;
    /**
     * Sets the default checked state of the element.
     */
    set defaultChecked(value: boolean);
    /**
     * Gets the required state of the element.
     */
    get required(): boolean;
    /**
     * Sets the required state of the element.
     */
    set required(state: boolean);
    /**
     * Gets the read-only state of the element.
     */
    get readOnly(): boolean;
    /**
     * Sets the read-only state of the element.
     */
    set readOnly(state: boolean);
    /**
     * Gets the disabled state of the element.
     */
    get disabled(): boolean;
    /**
     * Sets the disabled state of the element.
     */
    set disabled(state: boolean);
    /**
     * Gets the element orientation.
     */
    get orientation(): string;
    /**
     * Sets the element orientation.
     */
    set orientation(orientation: string);
    /**
     * Gets the element data.
     */
    get data(): DOMStringMap;
    /**
     * Sets the element data.
     */
    set data(data: DOMStringMap);
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

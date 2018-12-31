import * as Control from '@singleware/ui-control';
/**
 * Field element.
 */
export declare class Element extends Control.Element {
    /**
     * Element styles.
     */
    private styles;
    /**
     * Current label content.
     */
    private currentLabel;
    /**
     * Label slot element.
     */
    private labelSlot;
    /**
     * Prepend slot element.
     */
    private prependSlot;
    /**
     * Center slot element.
     */
    private centerSlot;
    /**
     * Append slot element.
     */
    private appendSlot;
    /**
     * Field layout element.
     */
    private fieldLayout;
    /**
     * Field styles element.
     */
    private fieldStyles;
    /**
     * Change event handler.
     */
    private changeHandler;
    /**
     * Default constructor.
     */
    constructor();
    /**
     * Determines whether the element is empty or not.
     */
    readonly empty: boolean;
    /**
     * Gets the label.
     */
    /**
    * Sets the label.
    */
    label: any;
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

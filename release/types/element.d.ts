/**
 * Field element.
 */
export declare class Element extends HTMLElement {
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
     * Gets the first child element from specified slot element.
     * @param slot Slot element.
     * @throws Throws an error when there are no children in the specified slot.
     * @returns Returns the first child element.
     */
    private getChildElement;
    /**
     * Sets the property into the first child from specified slot element.
     * @param slot Slot element.
     * @param property Property name.
     * @param value Property value.
     * @throws Throws an error when there are no children in the specified slot.
     * @returns Returns true when the specified property has been assigned, false otherwise.
     */
    private setChildProperty;
    /**
     * Gets the property from the first child in the specified slot element.
     * @param slot Slot element.
     * @param property Property name.
     * @returns Returns the property value.
     * @throws Throws an error when there are no children in the specified slot.
     */
    private getChildProperty;
    /**
     * Updates the specified state in the element.
     * @param name State name.
     * @param state State value.
     */
    private updateState;
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
     * Gets the element label.
     */
    /**
    * Sets the element label.
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

import * as Control from '@singleware/ui-control';
import { Properties } from './properties';
import { Element } from './element';
/**
 * Field template class.
 */
export declare class Template extends Control.Component<Properties> {
    /**
     * Prepend element.
     */
    private prependSlot;
    /**
     * Center element.
     */
    private centerSlot;
    /**
     * Append element.
     */
    private appendSlot;
    /**
     * Group element.
     */
    private group;
    /**
     * Label element.
     */
    private labelSlot;
    /**
     * Field element.
     */
    private field;
    /**
     * Field styles.
     */
    private styles;
    /**
     * Field skeleton.
     */
    private skeleton;
    /**
     * Field elements.
     */
    private elements;
    /**
     * Change event handler.
     */
    private changeHandler;
    /**
     * Bind event handlers to update the custom element.
     */
    private bindHandlers;
    /**
     * Bind exposed properties to the custom element.
     */
    private bindProperties;
    /**
     * Assign all element properties.
     */
    private assignProperties;
    /**
     * Default constructor.
     * @param properties Field properties.
     * @param children Field children.
     */
    constructor(properties?: Properties, children?: any[]);
    /**
     * Set the custom validity error message.
     * @param error Custom error message.
     */
    setCustomValidity(error?: string): void;
    /**
     * Get field label.
     */
    /**
    * Set field label.
    */
    label: any;
    /**
     * Get field name.
     */
    /**
    * Set field name.
    */
    name: string;
    /**
     * Get field type.
     */
    /**
    * Set field type.
    */
    type: string;
    /**
     * Get field value.
     */
    /**
    * Set field value.
    */
    value: any;
    /**
     * Get empty state.
     */
    readonly empty: any;
    /**
     * Get required state.
     */
    /**
    * Set required state.
    */
    required: boolean;
    /**
     * Get read-only state.
     */
    /**
    * Set read-only state.
    */
    readOnly: boolean;
    /**
     * Get disabled state.
     */
    /**
    * Set disabled state.
    */
    disabled: boolean;
    /**
     * Get orientation mode.
     */
    /**
    * Set orientation mode.
    */
    orientation: string;
    /**
     * Field element.
     */
    readonly element: Element;
}

/**
 * @ignore
 * @private
 * @param {string} eventName - event name string to create a CustomEvent with
 * @param {CustomEventOptions} customEventOptions - options for creating
 * @returns {CustomEvent} a new CustomEvent
 */
export function createCustomEvent<T = any>(
  eventName: string,
  customEventOptions?: CustomEventInit<T>,
): CustomEvent {
  return new CustomEvent(eventName, customEventOptions)
}

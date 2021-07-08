/**
 * On Loaded
 *
 * @description Verify that no previous instance of the assistant was created
 * or that there is an element in the DOM with the same ID.
 */
export const widgetIsLoaded = (id: string) => {
  const widget = document.getElementById(id)
  const isWidget = Boolean(widget && window.__PF_FONOSTER_ASSISTANT_LOADED__)

  return isWidget
}

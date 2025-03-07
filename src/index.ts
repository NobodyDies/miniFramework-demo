import { Component, Config } from './core/Component';

export function render(config: Config, container: HTMLElement): Component {
  const component = new Component(config);
  container.appendChild(component.getElement());
  return component;
}

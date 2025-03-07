export type Config = {
  tag: string;
  props?: Record<string, any> | { children: Config[] };
};

export class Component {
  private element: HTMLElement | Text;
  private config: Config;

  constructor(config: Config) {
    this.config = config;
    this.element = this.createDOM();
  }

  private createDOM(): HTMLElement | Text {
    if (typeof this.config === 'string') {
      return document.createTextNode(this.config);
    }

    const el = document.createElement(this.config.tag);

    if (this.config.props) {
      Object.entries(this.config.props).forEach(([key, value]) => {
        if (key === 'children') return;
        if (key.startsWith('on') && typeof value === 'function') {
          el.addEventListener(key.slice(2).toLowerCase(), value);
        } else {
          el.setAttribute(key, value);
        }
      });
    }

    if (this.config?.props?.children) {
      this.config.props.children.forEach((child: Config) => {
        const childComponent = new Component(child);
        el.appendChild(childComponent.getElement());
      });
    }

    return el;
  }

  public update(newConfig: Config): void {
    const oldElement = this.element;
    this.config = newConfig;
    this.element = this.createDOM();

    if (oldElement.parentNode) {
      oldElement.parentNode.replaceChild(this.element, oldElement);
    }
  }

  public getElement(): HTMLElement | Text {
    return this.element;
  }
}

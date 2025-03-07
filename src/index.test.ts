import { describe, it, expect } from 'vitest';
import { render } from './index';

describe('Framework Core', () => {
  it('renders basic div', () => {
    const container = document.createElement('div');
    render({ tag: 'div' }, container);
    expect(container.innerHTML).toBe('<div></div>');
  });

  it('updates element attributes', () => {
    const container = document.createElement('div');
    const instance = render({
      tag: 'div',
      props: { class: 'old-class' }
    }, container);

    instance.update({
      tag: 'div',
      props: { class: 'new-class' }
    });

    expect(container.querySelector('div')?.className).toBe('new-class');
  });
});

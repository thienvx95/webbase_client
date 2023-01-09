import { media, sizes } from '../media';
import { css } from 'styled-components/macro';

describe('media', () => {
  it('should return media query in css', () => {
    const mediaQuery = `${media.maxsm}{color:red;}`;
    const cssVersion = css`
      @media (${sizes.maxsm}px) {
        color: red;
      }
    `.join('');
    expect(mediaQuery).toMatch(cssVersion);
  });
});

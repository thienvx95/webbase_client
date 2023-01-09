/*
 * Media queries utility
 */

/*
 * Inspired by https://github.com/DefinitelyTyped/DefinitelyTyped/issues/32914
 */

// Update your breakpoints if you want
export const sizes = {
  maxsm: 'max-width: 576',
  minsm: 'min-width: 576',
  maxmd: 'max-width: 768',
  minmd: 'min-width: 768',
  maxlg: 'max-width: 992',
  minlg: 'min-width: 992',
  maxxl: 'max-width: 1200',
  minxl: 'min-width: 1200',
  maxxxl: 'max-width: 1600',
  minxxl: 'min-width: 1600',
};

// Iterate through the sizes and create min-width media queries
export const media = (Object.keys(sizes) as Array<keyof typeof sizes>).reduce(
  (acc, size) => {
    acc[size] = () => `@media (${sizes[size]}px)`;
    return acc;
  },
  {} as { [key in keyof typeof sizes]: () => string },
);

/* Example
const SomeDiv = styled.div`
  display: flex;
  ....
  ${media.medium} {
    display: block
  }
`;
*/

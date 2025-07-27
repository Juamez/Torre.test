import '@testing-library/jest-dom';
import React from 'react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    query: {},
    pathname: '/',
    asPath: '/',
    route: '/',
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return React.createElement('img', { ...props });
  },
}));

global.fetch = jest.fn();

const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes(
      'Warning: An update to %s inside a test was not wrapped in act(...)'
    )
  ) {
    return;
  }
  originalError.call(console, ...args);
};

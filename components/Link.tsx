import NextLink, { LinkProps } from 'next/link';
import { FC } from 'react';

export const Link: FC<LinkProps> = ({ children, ...rest }) => {
  return (
    <NextLink {...rest}>
      <a className="underline">{children}</a>
    </NextLink>
  );
};

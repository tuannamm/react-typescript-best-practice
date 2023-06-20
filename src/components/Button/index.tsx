import React from 'react';

// case 1
type Button1Props = React.PropsWithChildren<{
  onClick?: () => void;
}>;

const Button1 = ({ children, onClick, ...restProps }: Button1Props) => (
  <button onClick={onClick} {...restProps}>
    {children}
  </button>
);

// case 2
type Button2Props = React.PropsWithChildren<{
  onClick?: () => void;
}>;
const Button2: React.FC<Button2Props> = ({
  children,
  onClick,
  ...restProps
}) => (
  <button onClick={onClick} {...restProps}>
    {children}
  </button>
);

// case 3
interface Button3Props extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  custom?: string;
}
const Button3: React.FC<Button3Props> = ({
  custom,
  children,
  ...restProps
}) => <button {...restProps}>{children}</button>;
interface Search1Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  st?: string;
}
// case 4
export interface Button4Props
  extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  custom?: string;
}
const Button4 = React.forwardRef<HTMLButtonElement, Button4Props>(
  ({ custom, children, ...restProps }, ref) => (
    <button {...restProps} ref={ref}>
      {children}
    </button>
  )
);

Button4.displayName = 'Button4';

export { Button1, Button2, Button3, Button4 };

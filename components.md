## Define component

```jsx
import React from 'react';

type Props = React.PropsWithChildren<{
  onClick: () => void
}>;

const Button = ({ children, onClick }: Props) => {
  return <button onClick={onClick}>{children}</button>;
};
```

```jsx
import React from 'react';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  specialProp: number;
}

const Button = ({ children, onClick, type, specialProp }: Props) => {
  // ...
};
```

```jsx
import React from 'react';

type Props = React.PropsWithChildren<{
  as: 'div' | 'section' | 'aside'
}>;

const Container = ({ as: Component = 'div', children }: Props) => {
  return <Component className={styles.container}>{children}</Component>;
};

<Container as='section'>
  <p>section content</p>
</Container>;
```

```jsx
import React from 'react';

type ForwardedInputProps = {
    placeholder?: string
};

const ForwardedInput = React.forwardRef<HTMLInputElement, ForwardedInputProps>(({ placeholder }, ref) => (
    <input ref={ref} placeholder={placeholder} />
));

const SimpleForwardRef = () => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const selectText = () => {
        inputRef.current?.select();
    }

    return (
        <div>
            <ForwardedInput ref={inputRef} placeholder="Type here"/>
            <button onClick={selectText}>Select text</button>
        </div>
    );
};
```

```jsx
import React, { useRef, forwardRef, useImperativeHandle } from 'react';

type BoxProps = {
    size: string,
    color: string
}

type IncrementedRef = {
    getYLocation: () => number | undefined,
    current: HTMLDivElement | null
}

const Box = forwardRef<IncrementedRef, BoxProps>(({size, color}, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => ({
        getYLocation: () => divRef.current?.getBoundingClientRect().top,
        current: divRef.current
    }));

    return (
        <div style={{
            height: size,
            width: size,
            backgroundColor: color,
            margin: '0 auto'
        }}
        ref={divRef}></div>
    );
});

const ImperativeHandleExample = () => {
    const refs = [useRef<IncrementedRef>(null), useRef<IncrementedRef>(null), useRef<IncrementedRef>(null)];

    const goToBox = (position: number) => {
        console.log('Go to box: ', refs[position].current?.current)
        const boxTop = refs[position].current?.getYLocation();
        window.scrollTo({ top: boxTop, behavior: 'smooth'})
    }

    return (
        <>
        <div>
            <button onClick={() => goToBox(0)}>Go to 1st box</button>
            <button onClick={() => goToBox(1)}>Go to 2nd box</button>
            <button onClick={() => goToBox(2)}>Go to 3rd box</button>
        </div>
        <Box size='500px' color='red' ref={refs[0]} />
        <Box size='500px' color='blue' ref={refs[1]} />
        <Box size='500px' color='green' ref={refs[2]} />
        </>
    );
};
```

```jsx
const Component = React.forwardRef<RefType, PropsType>((props, ref) => {
  return someComponent;
});
const Search = React.forwardRef<HTMLInputElement>((props, ref) => {
  return <input ref={ref} type="search" />;
});
```

```jsx
import * as React from 'react';

const Search =
  React.forwardRef <
  HTMLInputElement >
  ((props, ref) => {
    return <input ref={ref} type='search' />;
  });
Search.displayName = 'Search';

export default function App() {
  const input = React.useRef < HTMLInputElement > null;
  React.useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, []);
  return <Search ref={input} />;
}
```

```jsx
export interface DialogProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /**
   * Message level color (e.g. warning, error...)
   *
   * @default normal
   */
  color?: MessageColor;

  /**
   * Callback when the dialog is closed by outside click or esc key...
   */
  onClose?: () => void;
}

const DialogBase = forwardRef<HTMLDivElement, DialogProps>(
  ({ onClose, color = 'normal', children, ...divProps }: DialogProps, ref) => {
    const ErrorBoundary = getErrorBoundary();

    return (
      <div {...divProps} ref={ref} data-color={color}>
        <div className="dialog-content">
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
        {onClose && (
          <svg
            className="dialog-close-button"
            viewBox="0 0 16 16"
            onClick={onClose}
          >
            <g transform="matrix(1,0,0,1,-953.896,-435.63)">
              <g transform="matrix(0.405863,0.405863,-0.354409,0.354409,674.668,-219.158)">
                <path d="M1152.39,529.839L1187.24,529.839" />
              </g>
              <g transform="matrix(-0.405863,0.405863,-0.354409,-0.354409,1624.24,156.402)">
                <path d="M1152.39,529.839L1187.24,529.839" />
              </g>
            </g>
          </svg>
        )}

        <ScrollLock />
      </div>
    );
  },
);
```

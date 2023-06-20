import * as React from 'react';

interface Search1Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  st?: string;
}

const Search1 = React.forwardRef<HTMLInputElement, Search1Props>(
  ({ value: valueProp, ...restProps }, ref) => {
    const [value, setValue] = React.useState<any>(valueProp);
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (valueProp !== undefined) return;
      const value = event?.target?.value;
      setValue(value);
    };
    // controlled
    React.useEffect(() => {
      setValue(valueProp);
    }, [valueProp]);
    // console.log(value, 'value uncontrolled');
    return (
      <input
        value={value}
        onChange={handleOnChange}
        type='search'
        {...restProps}
      />
    );
  }
);
Search1.displayName = 'Search1';

export default Search1;

import * as React from 'react';

interface SearchProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
  test?: string;
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ ...restProps }, ref) => <input ref={ref} type='search' {...restProps} />
);
Search.displayName = 'Search';

export default Search;

# React Best Practices - Design Pattern

## Prefer to use const instead of let. Prefer to use arrow function instead of function.

  **Bad:**

  ```jsx
  let digiTexRule = "design parttern"
  ```

  **Good:**

  ```jsx
  const digiTexRule = "design parttern"
  ```
  
## Limit the use of any if possible.

  **Bad:**

  ```jsx
  const age: any = 17;
  ```

  **Good:**

  ```jsx
  const age: number = 17;
  ```
## Single function, component, feature
Breaking down components, each component only does exactly one task. Each file is a component. All files related to any one component should be in a single folder.<br/>
Avoid Repetitive Code: If you notice you are writing duplicated code, convert it into components that can be reused.

## Define default prop in component

```jsx
import React from 'react';

// METHOD 1:
// Default Props with destructuring
function ThemedButton(props) {
  const { theme = 'secondary', label = 'Button Text', ...restProps } = props;
  return <button className={`btn btn-${theme}`} {...restProps}>{ label }</button>
}

// METHOD 2:
// More compact destructured props
function ThemedButton({ theme = 'secondary', label = 'Button Text', ...restProps }) {
  return <button className={`btn btn-${theme}`} {...restProps}>{ label }</button>
}

```
## Comment only where necessary and remove Unnecessary Comments from the Code
Attach comments to code only where necessary. This is not only in keeping with React best practices, it also serves two purposes at the same time:

It’ll keep code visually clutter free.
You’ll avoid a potential conflict between comment and code, if you happen to alter the code at some later point in time.
```jsx
if (false) {
  // Compiler warns about unreachable code error
  console.log('hello');
}
```


## Do not define children, className, or style ... in component, they are can extends element default.
```jsx
export interface SecondProps extends React.HtmlHTMLAttributes<HTMLElement> {
  onChange?: (data?: ExtendFieldsData) => void
  config?: ExtendFieldsData
  view?: 'simple' | 'full'
}
const Second: React.FC<SecondProps> = ({ onChange, children, config: configProp, view }) => {}
```
## Extending Native HTML Elements
TypeScript ships with tons of helper types that cut down boilerplate for common React idioms. These types are particularly useful when extending native HTML elements like button or input, where you’ll want to maintain the component's original props to ensure extensibility.

```jsx
import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  specialProp: number;
}

function Button({ children, onClick, type, specialProp }: Props) {
  // ...
}

// Add built-in HTML props to the disjoin union
type Props = React.ComponentPropsWithoutRef<"button"> & Button;

```


## Combine events with into a function when they have the same function , use switch case.
```jsx
switch (expression) {
  case keyDown:
      statement1;
      break;
  case keyUp:
      statement2;
      break;
  case keyInput:
      statement3;
      break;
  default:
      statement;
}
```
## Define constant file for each component.
```jsx
const TYPE_CRON = {
  SECOND: 'SECOND',
  MINUTE: 'MINUTE',
  HOUR: 'HOUR',
  DAY: 'DAY',
  MONTH: 'MONTH',
  YEAR: 'YEAR',
};

```
## Type
## Primitive values
1. Boolean
2. Null
3. Undefined
4. Number
5. BigInt
6. String
7. Symbol

## Objects

### Define data is object use: 
Don’t use object or Object as a type. The object type is currently hard to use (see this issue).
Consider using Record<string, unknown> instead, as it allows you to more easily inspect and use the keys. <br />
**Bad:**

```jsx
const TypeName: object;
```

**Good:**

```jsx
const TypeName: Record<string, unknown>;
```
### The index signature
```jsx
// we’ve had to check if they are strings above before using it.
type NameType = {
  [key: string]: unknown;
}
// If we’re confident that all properties of an object are strings, for example, we can reflect that in our type.
type Dictionary = {
  [key: string]: string | undefined;
}
```
### The limitations of the index signature
The index signatures have a few limitations that we should know of. For example, we can only use strings, numbers, and symbols for keys.

```jsx
type StringDictionary = {
  [key: string]: unknown;
}
 
type NumberDictionary = {
  [key: number]: unknown;
}
 
type SymbolDictionary = {
  [key: symbol]: unknown;
}
```
### The {} type
If we want to define the type for an empty object for some reason, we can use the never type and an index signature.
```jsx

type EmptyObject = {
  [key: string]: never;
}
 
const emptyObject: EmptyObject = {};
```
### The Record type
Instead of the index signatures, we can use the Record utility type. It is generic and accepts two types: the type of the keys and the type of the values.
```jsx
function createStringFromProperties(
  dictionary: Record<string, unknown>,
  properties: string[]
);
```
## Use JSX ShortHand
Try to use JSX shorthand for passing boolean variables. Let\'s say you want to control the title visibility of a Navbar component.

**Bad:**

```jsx
return (
  <Navbar showTitle={true} />
);
```

**Good:**

```jsx
return(
  <Navbar showTitle />  
)
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>


## Don’t use return type any in callbacks whose value will be ignored
```jsx
export function onListFieldKeyUp(onEnter: () => any): (ev: React.KeyboardEvent) => void {
  return (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault();  
      var enterResult = onEnter();
      //do something with enterResult
      }
    }
  };
```
## No Empty Interface
```jsx
interface NameType {}

```

## No Explicit Type Declarations for Variable or Parameters with Literal Values
```jsx
// bad
const foo: number = 10;
// good
const foo = 10;
```
## Use Ternary Operators

Let\'s say you want to show a particular user\'s details based on role.

**Bad:**

```jsx
const { role } = user;

if(role === ADMIN) {
  return <AdminUser />
}else{
  return <NormalUser />
} 
```

**Good:**

```jsx
const { role } = user;

return role === ADMIN ? <AdminUser /> : <NormalUser />
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Use Object Literals

Object literals can help make our code more readable. Let\'s say you want to show three types of users based on their role. You can\'t use ternary because the number of options is greater than two.

**Bad:**

```jsx
const {role} = user

switch(role){
  case ADMIN:
    return <AdminUser />
  case EMPLOYEE:
    return <EmployeeUser />
  case USER:
    return <NormalUser />
}
```

**Good:**

```jsx
const {role} = user

const components = {
  ADMIN: AdminUser,
  EMPLOYEE: EmployeeUser,
  USER: NormalUser
};

const Component = components[role];

return <Componenent />;
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Use Fragments

Always use Fragment over Div. It keeps the code clean and is also beneficial for performance because one less node is created in the virtual DOM.

**Bad:**

```jsx
return (
  <div>
     <Component1 />
     <Component2 />
     <Component3 />
  </div>  
)
```

**Good:**

```jsx
return (
  <>
     <Component1 />
     <Component2 />
     <Component3 />
  </>  
)
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Do not define a function inside Render

Don\'t define a function inside render. Try to keep the logic inside render to an absolute minimum.

**Bad:**

```jsx
return (
    <button onClick={() => dispatch(ACTION_TO_SEND_DATA)}>    // NOTICE HERE
      This is a bad example 
    </button>  
)
```

**Good:**

```jsx
const submitData = () => dispatch(ACTION_TO_SEND_DATA)

return (
  <button onClick={submitData}>  
    This is a good example 
  </button>  
)
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Use Memo

React.PureComponent and Memo can significantly improve the performance of your application. They help us to avoid unnecessary rendering.

**Bad:**

```jsx
import React, { useState } from "react";

export const TestMemo = () => {
  const [userName, setUserName] = useState("faisal");
  const [count, setCount] = useState(0);
  
  const increment = () => setCount((count) => count + 1);
  
  return (
    <>
      <ChildrenComponent userName={userName} />
      <button onClick={increment}> Increment </button>
    </>
  );
};

const ChildrenComponent =({ userName }) => {
  console.log("rendered", userName);
  return <div> {userName} </div>;
};
```

Although the child component should render only once because the value of count has nothing to do with the ChildComponent. But, it renders each time you click on the button.
Output

Let\'s edit the ChildrenComponent to this:

**Good:**

```jsx
import React ,{useState} from "react";

const ChildrenComponent = React.memo(({userName}) => {
    console.log('rendered')
    return <div> {userName}</div>
})
```

Now no matter how many times you click on the button, it will render only when necessary.

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Put CSS in JavaScript

Try to avoid raw JavaScript when you are writing React applications because organizing CSS is far harder than organizing JS.

**Bad:**

```jsx
// CSS FILE

.body {
  height: 10px;
}

//JSX

return <div className='body'>
   
</div>
```

**Good:**

```jsx
const bodyStyle = {
  height: "10px"
}

return <div style={bodyStyle}>

</div>
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Use Object Destructuring

Use object destructuring to your advantage. Let\'s say you need to show a user\'s details.

**Bad:**

```jsx
return (
  <>
    <div> {user.name} </div>
    <div> {user.age} </div>
    <div> {user.profession} </div>
  </>  
)
```

**Good:**

```jsx
const { name, age, profession } = user;

return (
  <>
    <div> {name} </div>
    <div> {age} </div>
    <div> {profession} </div>
  </>  
)
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## String Props do not need Curly Braces

When passing string props to a children component.

**Bad:**

```jsx
return(
  <Navbar title={"My Special App"} />
)
```

**Good:**

```jsx
return(
  <Navbar title="My Special App" />  
)
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Remove JS Code From JSX

Move any JS code out of JSX if that doesn\'t serve any purpose of rendering or UI functionality.

**Bad:**

```jsx
return (
  <ul>
    {posts.map((post) => (
      <li onClick={event => {
        console.log(event.target, 'clicked!'); // <- THIS IS BAD
        }} key={post.id}>{post.title}
      </li>
    ))}
  </ul>
);
```

**Good:**

```jsx
const handleOnClick = (event) => {
   console.log(event.target, 'clicked!'); 
}

return (
  <ul>
    {posts.map((post) => (
      <li onClick={handleOnClick} key={post.id}> {post.title} </li>
    ))}
  </ul>
);
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Use Template Literals

Use template literals to build large strings. Avoid using string concatenation. It\'s nice and clean.

**Bad:**

```jsx
const userDetails = user.name + "'s profession is" + user.proffession

return (
  <div> {userDetails} </div>  
)
```

**Good:**

```jsx
const userDetails = `${user.name}'s profession is ${user.proffession}`

return (
  <div> {userDetails} </div>  
)
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Import in Order

Always try to import things in a certain order. It improves code readability.
If you've already got some experience in React, you might have seen files that are bloated with a lot of import statements. They might also be mixed up with external imports from third-party packages and internal imports like other components, util functions, styles and many more.

**Bad:**

```jsx
import React, { useState, useEffect, useCallback } from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Title from "../components/Title";
import Navigation from "../components/Navigation";
import DialogActions from "@material-ui/core/DialogActions"
import { getServiceURL } from "../../utils/getServiceURL";
import Grid from "@material-ui/core/Grid";
import Paragraph from "../components/Paragprah";
import { sectionTitleEnum } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import axios from 'axios';
import { DatePicker } from "@material-ui/pickers";
import { Formik } from "formik";
import CustomButton from "../components/CustomButton";
```

**Good:**

The rule of thumb is to keep the import order like this:
Built-in
External
Internal
So the example above becomes:

```jsx
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import axios from 'axios';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import { DatePicker } from "@material-ui/pickers";

import { getServiceURL } from "../../utils/getServiceURL";
import { sectionTitleEnum } from "../../constants";
import CustomButton from "../components/CustomButton";
import Title from "../components/Title";
import Navigation from "../components/Navigation";
import Paragraph from "../components/Paragraph";
```

## Export, Import
Use export default
```jsx
//utils/index.js:  

 export { default as DateUtils} from './DateUtils';
 export { default as StringUtils} from './StringUtils';
 export { default as NumberUtils} from './NumberUtils';
 
 export default DateUtils;
 export { StringUtils, NumberUtils }
// import 
 import { DateUtils, NumberUtils} from '../utils ';

 import DateUtils, { DateUtils, NumberUtils } from "./Countdown.tsx";

```
## Define Standard component:
```jsx
interface MinutesProps {
  onChange?: (data?: ExtendFieldsData) => void
  config?: ExtendFieldsData
  view?: 'simple' | 'full'
}
const Minutes: React.FC<MinutesProps> = ({ onChange, config: configProp, view, ...restProp }) => {
  // get data from config or default
  const [config, setConfig] = useState<ExtendFieldsData>(configProp)
  const [type, setType] = useState<string | undefined>(configProp?.type)
  ....
  return (<></>);
}
// use with forwardRef
export type CountdownHandle = {
  start: () => void;
};

type CountdownProps = {};
const Countdown = forwardRef<CountdownHandle, CountdownProps>(({ onChange, config: configProp, view, ...restProp },ref) => {
  useImperativeHandle(ref, () => ({
    // start() has type inference here
    start() {
      alert("Start");
    },
  }));

  return <div>Countdown</div>;
});
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Use Implicit return

Use the JavaScript feature of implicit return to write beautiful code. Let\'s say your function does a simple calculation and returns the result.

**Bad:**

```jsx
const add = (a, b) => {
  return a + b;
}
```

**Good:**

```jsx
const add = (a, b) => a + b;
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Naming convention
1. Use PascalCase in components, interfaces, or type aliases
```jsx
// React component
const LeftGridPanel = () => {
  ...
}

// Typescript interface
interface AdminUser {
  name: string;
  id: number;
  email: string;
}

// Typescript Type Alias
type TodoList = {
	todos: string[];
    id: number;
    name: string;
}
```
2. Use camelCase for JavaScript data types like variables, arrays, objects, functions, and so on

```jsx
const getLastDigit = () => { ... }

const userTypes = [ ... ]
```
eslint: react/jsx-filename-extension. <br/>
Component naming as Folder Component naming. However, for root components of a directory, use index.jsx as the filename.

## Name event
1. Props: handle+Event <br/>
When defining the prop names, I usually prefix with on*, as in onClick. This matches the built-in event handler convention. And by matching it, we declare that these props will house similarly-used event handler functions.
2. Function: on+Event  <br/>
For the function names, I follow the exact same pattern, but I replace on with handle*, as in handleClick. Together, it'd look like:

```jsx
const Foo = ({ onClick }) => {
  const handleClick = (event) => {
    doSomethingElseHere();
    onClick(event);
  }
  
  return (
    <button onClick={handleClick}>Bar</button>
  )
}
```

## Component Naming

Always use PascalCase for components and camelCase for instances.<br/>
eslint: react/jsx-pascal-case

**Bad:**

```jsx
import reservationCard from './ReservationCard';

const ReservationItem = <ReservationCard />;
```

**Good:**

```jsx
import ReservationCard from './ReservationCard';

const reservationItem = <ReservationCard />;
```
## Feature, variable Naming
Feature naming or variable naming is camelCase

**Bad:**

```jsx
const Variable = "camelCase";

const SubtractOne = () => {
  setCounter(counter - 1);
}
```

**Good:**

```jsx
const variable = "camelCase";

const subtractOne = () => {
  setCounter(counter - 1);
}
```

## Type, interface Naming
1. Use PascalCase for interface names.
2. Use camelCase for interface members.
3. Do not use "I" as a prefix for interface names.
4. Use whole words in names when possible.Ex: Window, Document, etc
```jsx
interface Square {

  readonly name: string;

  computePerimeter(aSize: number, bSize: number): number;
  computeArea(aSize: number, bSize: number): number;

  toString(): string;
}
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Reserved Prop Naming
Use camelCase for Prop naming.<br>
Do not use DOM component prop names for passing props between components because others might not expect these names.
Always use camelCase for prop names, or PascalCase if the prop value is a React component.

**Bad:**

```jsx
<MyComponent style="dark" />

<MyComponent className="dark" />
```

**Good:**

```jsx
<MyComponent variant="fancy" />
```

**Bad:**

```jsx
<Foo
  UserName="hello"
  phone_number={12345678}
/>
```

**Good:**

```jsx
<Foo
  userName="hello"
  phoneNumber={12345678}
  Component={SomeComponent}
/>
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Quotes

Use double quotes for JSX attributes and single quotes for all other JS.

**Bad:**

```jsx
<Foo bar='bar' />

<Foo style={{ left: "20px" }} />
```

**Good:**

```jsx
<Foo bar="bar" />

<Foo style={{ left: '20px' }} />
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## JSX in Parentheses

If your component spans more than one line, always wrap it in parentheses.

**Bad:**

```jsx
return <MyComponent variant="long">
           <MyChild />
         </MyComponent>;
```

**Good:**

```jsx
return (
    <MyComponent variant="long">
      <MyChild />
    </MyComponent>
);
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Self-Closing Tags

If your component doesn\'t have any children, then use self-closing tags. It improves readability.

**Bad:**

```jsx
<SomeComponent variant="stuff"></SomeComponent>
```

**Good:**

```jsx
<SomeComponent variant="stuff" />
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Underscore in Method Name

Do not use underscores in any internal React method.

**Bad:**

```jsx
const _handleClickHandler = () => {
  // do stuff
}
```

**Good:**

```jsx
const handleClickHandler = () => {
  // do stuff
}
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Alt Prop

Always include an alt prop in your `<img >` tags. And do not use picture or image in your alt property because the screenreaders already announce img elements as images. No need to include that.

**Bad:**

```jsx
<img src="hello.jpg" />

<img src="hello.jpg" alt="Picture of me rowing a boat" />
```

**Good:**

```jsx
<img src="hello.jpg" alt="Me waving hello" />
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Short-Circuit evaluation in JSX

**Bad:**

```jsx
// Avoid
const sampleComponent = () => {
  return isTrue ? <p>True!</p> : null
};
```

**Good:**

```jsx
// Recommended: short-circuit evaluation
const sampleComponent = () => {
  return isTrue && <p>True!</p>
};

// or
condition ? exprIfTrue : exprIfFalse;
condition && exprIfTrue;
!condition && exprIfFalse;

```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Not use index for key in loop, use Id or uuidv4 to create id auto.
```jsx
{seasonScoresData.map((score, index) => (
  <div key={score.id}>
      <p>{score.oponennt}</p>
      <p>{score.value}</p>
    </div>
))}
```

## Not use too many useState in a Component
```jsx
const CustomersMap = () => {
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [customersData, setCustomersData] = useState([])
  const [hasError, setHasError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hasMapLoaded, setHasMapLoaded] = useState(false)
  const [mapData, setMapData] = useState({})
  const [formData, setFormData] = useState({})
  const [isBtnDisabled, setIsBtnDisabled] = useState(false)
  ....
  return ( ... )
}
```

## Use controlled/uncontrolled in Component
```jsx
 //controlled/uncontrolled
  useEffect(() => {
    setValue(valueProp)
  }, [valueProp])
```


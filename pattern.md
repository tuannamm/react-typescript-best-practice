## 1. Navigating a Directory Structure

## 2. Common Modules

Shareable code in React app should be divided under its own domain. A common module can be reusable custom components, custom hooks, business logic, constants, and utility functions. These reusable pieces are shared across the application to be used on more than one page component. Having a folder for them in your application’s directory structure is a good starting point.

## 3. Add Custom Components in their own folders

```jsx
// /src/components/index.js

import { Button } from './Button/Button';
import { InputField } from './InputField/InputField';
import { Card } from './Card/Card';

export { Button, Card, InputField };
```

## 4. Create Custom Hooks

A reusable React Hook is like a reusable working part. Just like you create custom components, creating a custom hook can help reduce code complexity.

Consider an example. In your React app, you have two different pages representing a login and a signup form. Each of these pages contains text input fields where users can enter their credentials and submit the form using a button. One of the input fields used in both forms is for users to enter their password. The password field contains an icon that allows the app user to toggle between the field’s visibility. Suppose you write the same code to implement this behavior in both login and signup forms. In that case, you will be duplicating the code.

## 5. Use Absolute Imports

By default, a React app that uses the before mentioned directory structure might lead you to use import paths in the following manner:

```jsx
// some file

import { Button } from '../../components';
```

You can configure your React application by adding support for importing modules using absolute paths. In a plain React app, this can be done by creating and configuring a jsconfig.json file at the root of your project.

Here is an example of a simple configuration inside the jsconfig.json file:

```jsx
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

It makes it a lot easier to import components within the project and also, at the same time moving files without the need to change the import statements. If you want to import a module located at /src/components, you can import it as follows:

```jsx
import { Button } from 'components';
```

If you have a custom Webpack configuration inside a file called webpack.config.js. In that case, you can customize this further to use a prefix like @components or ~components.

```jsx
module.exports = {
  resolve: {
    extensions: ['js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components')
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    }
  }
};
```

This will allow you to import using a prefix. For example, a module located at /src/components/Button can be imported as:

```jsx
import { Button } from '@components';
```

## 6. Separate business logic from UI

The /pages directory will contain the UI for most of the application and the structure of each page in the form of React components. These components are naturally coupled with the business logic they represent. It is a common behavior that you will find in any React application. However, avoid unnecessary complexity in a UI component, you can separate the business logic from it.

One way to separate the UI and the logic is to create a custom hook, for example, for making an API request. Here is an example of making an API request to get items from an endpoint:

```jsx
import { useQuery } from 'react-query';

export const moviesApi = {
  nowPlaying: () =>
    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=1`).then(
      (res) => res.json()
    )
};

export const useNowPlayingMovies = () => {
  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    ['movies', 'nowPlaying'],
    moviesApi.nowPlaying
  );

  return {
    nowPlayingLoading,
    nowPlayingData
  };
};
```

In the above snippet, take note that the API request to fetch data from the endpoint /movie/now_playing happens in two parts. The first part is the API request itself using JavaScript’s fetch method that gets the data in JSON format. The second part is where the useQuery hook from React Query library is configured and wrapped inside a custom hook.

You can store or create this custom hook file inside the dedicated /hooks directory or create another directory for API-related hooks such as /api or /services.

## 7. The Utils directory

Having a utils directory is completely optional. If your application tends to have some global utility functions, it could be a good idea to separate them from the UI components. A /utils directory may contain app-wide constants and helper methods. For example, more than one UI component in your application may require some validation logic. Separating this validation business logic in its own file under the /utils directory will help you create separate flows.

## 8. Avoiding creating a single Context for everything

if a Context is used in one of the components, you do not need to wrap the application’s root with that Context’s provider. If a section of the application doesn’t require specific data, you don’t have to share it.

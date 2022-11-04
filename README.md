# hooks-me

## installation

Via NPM

```
npm i hooks-me
```

Via Yarn

```
yarn add hooks-me
```

## useArray

Easy way to manage array as state. You can pass any `Type` you want as `T`.

### usage

```tsx
import { useArray } from "hooks-me";

const Component = () => {
  const { value, push, clear } = useArray<number>(DEFAULT_VALUE);

  return (
    <>
      <div>Value: {value.join(" - ")}</div>
      <button onClick={() => push(7)}>Add 7</button>
      <button onClick={clear}>Clear</button>
    </>
  );
};
```

### API

| name   | description                                               | usage                    |
| ------ | --------------------------------------------------------- | ------------------------ |
| value  | The value as `array` of `T`                               | -                        |
| push   | Push a new value to the end of the current `array` of `T` | `push(7)`                |
| clear  | Clear all items. Value will be `[]`                       | `clear()`                |
| filter | Filter items                                              | `filter((id) => id < 5)` |
| remove | Remove an item with its index                             | `remove(9)`              |
| set    | Set the value of `array`                                  | `set([1, 4, 7])`         |
| update | Replace an item                                           | `update(0, 12)`          |

## useEffectOnce

It's simply an upgraded version of the `useEffect`. You don't have to pass any dependencies as second argument. Only your logic is needed. Voila.

### usage

```tsx
import { useEffectOnce } from "hooks-me";

const Component = () => {
  useEffectOnce(() => {
    doJobOnce();
  });

  return <div>Hooks me, I'm famous.</div>;
};
```

## useToggle

TODO

### usage

```tsx
import { useToggle } from "hooks-me";

const Component = () => {
  const [value, toggleValue] = useToggle();

  return (
    <>
      <div>Hooks me, I'm {value ? "very" : "not"} famous.</div>
      <button onClick={() => toggleValue()}>Toggle</button>
      <button onClick={() => toggleValue(true)}>Set true</button>
      <button onClick={() => toggleValue(false)}>Set false</button>
    </>
  );
};
```

The `toggleValue` event (you can name it like you want btw) accepts:

- `boolean`
- `undefined` (meaning "toggle" the actual value)

## useValidatedState

TODO

### usage

```tsx
import { useValidatedState } from "hooks-me";

const Component = () => {
  const [name, setName, nameIsValid] = useValidatedState<string | undefined>(
    "famous",
    (val) => val !== "famous"
  );

  return (
    <>
      <div>Hooks me, I'm {name}.</div>
      <div>Is valid: {nameIsValid ? "probably" : "not sure"}</div>
      <button onClick={() => setName("famous")}>Famous</button>
      <button onClick={() => setName("very famous")}>Very famous</button>
    </>
  );
};
```

## useDebounce

Simply add debounce feature for each situation. I ~~guess~~ hope. First thing you'll have to do, is to write you logic as first argument. Second argument is the delay in `ms`. Last one is the magic one. It's the list of variable which will trigger the debounce stuff. That's all!

### usage

```tsx
import { useState } from "react";
import { useDebounce } from "hooks-me";

const Component = () => {
  const [count, setCount] = useState(0);
  useDebounce(() => alert("Hooks me, bro."), 1000, [count]);

  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount((old) => old + 1)}>Add</button>
    </>
  );
};
```

## useDebug

Debug your app with this amazing hook. You'll be able to find how many times the wanted component has been updated and see all props that changed during previous rendering.

Let's see following example.

### usage

```tsx
import { useState, type FC } from "react";
import { useDebug } from "hooks-me";

const Component: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <ChildComponent count={count} />
      <button onClick={() => setCount((old) => old + 1)}>Add</button>
    </>
  );
};

const ChildComponent: FC<{ count: number }> = (props) => {
  const output = useDebug("ChildComponent", props);

  return (
    <>
      <div>{props.count}</div>
      <div>{JSON.stringify(output)}</div>
    </>
  );
};
```

The output will be printed in your `devTools` as a console log.

Here's a sample of the output:

```json
{
  "count": 8,
  "changedProps": { "count": { "previous": 5, "current": 6 } },
  "timeSinceLastRender": 200,
  "lastRenderTimestamp": 1666792387890
}
```

## useIsVisible

Get if the given element is visible on screen, or not. The second argument is the possibility to add a positive/negative offset. Perfect for your needs, isn't it?

### usage

```tsx
import { type FC } from "react";
import { useIsVisible } from "hooks-me";

const Component: FC = () => {
  const mainRef = useRef(null);
  const isVisible = useIsVisible(mainRef, "-100px");

  return (
    <>
      <div style={{ height: 2000, backgroundColor: "lightblue" }} />
      <div ref={mainRef}>{isVisible ? "Yep" : "Nope"}</div>
      <div style={{ height: 2000, backgroundColor: "lightblue" }} />
    </>
  );
};
```

## useLocalStorage

### usage

```tsx
import { type FC } from "react";
import { useLocalStorage } from "hooks-me";

const Component: FC = () => {
  const [word, setWord, clearWord] = useLocalStorage("word", "famous");

  return (
    <>
      <div>Hooks me, I'm {word}</div>
      <button onClick={() => setWord("very famous")}>Set another word</button>
      <button onClick={() => clearWord()}>Clear</button>
    </>
  );
};
```

## useSessionStorage

### usage

```tsx
import { type FC } from "react";
import { useSessionStorage } from "hooks-me";

const Component: FC = () => {
  const [word, setWord, clearWord] = useSessionStorage("word", "famous");

  return (
    <>
      <div>Hooks me, I'm {word}</div>
      <button onClick={() => setWord("very famous")}>Set another word</button>
      <button onClick={() => clearWord()}>Clear</button>
    </>
  );
};
```

## useUpdateEffect

Skip the first rendering and trigger the `callback` after.

### usage

```tsx
import { type FC } from "react";
import { useUpdateEffect } from "hooks-me";

const Component: FC = () => {
  const [count, setCount] = useState(0);

  useUpdateEffect(() => alert("Done!"), [count]);

  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount((old) => old + 1)}>Add</button>
    </>
  );
};
```

## useWindowSize

Get the window size.

### usage

```tsx
import { type FC } from "react";
import { useWindowSize } from "hooks-me";

const Component: FC = () => {
  return (
    <>
      <div>Width: {width}</div>
      <div>Height: {height}</div>
    </>
  );
};
```

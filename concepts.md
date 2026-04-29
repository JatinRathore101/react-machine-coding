# React & JS Concepts

---

## 1. useEffect Cleanup Function

Runs when the component unmounts or before the effect re-runs. Used to cancel subscriptions, timers, or event listeners.

```jsx
useEffect(() => {
  const timer = setInterval(() => console.log("tick"), 1000);

  return () => clearInterval(timer); // cleanup
}, []);
```

---

## 2. useRef Hook

Holds a mutable value that persists across renders without causing re-renders. Also used to directly access DOM elements.

```jsx
function Timer() {
  const countRef = useRef(0);

  const increment = () => {
    countRef.current += 1; // no re-render
    console.log(countRef.current);
  };

  return <button onClick={increment}>Increment</button>;
}

// DOM access
function FocusInput() {
  const inputRef = useRef(null);
  return <input ref={inputRef} onFocus={() => inputRef.current.select()} />;
}
```

---

## 3. useMemo Hook

Caches the result of an expensive calculation. Recomputes only when dependencies change.

```jsx
function ProductList({ products, filterText }) {
  const filtered = useMemo(
    () => products.filter((p) => p.name.includes(filterText)),
    [products, filterText]
  );

  return filtered.map((p) => <div key={p.id}>{p.name}</div>);
}
```

---

## 4. useCallback Hook

Caches a function so its reference stays the same across renders. Useful when passing callbacks to memoized child components.

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []); // same reference across renders

  return <Child onClick={handleClick} />;
}

const Child = React.memo(({ onClick }) => <button onClick={onClick}>Click</button>);
```

---

## 5. Array Summation with reduce

```js
const nums = [1, 2, 3, 4, 5];

const sum = nums.reduce((acc, curr) => acc + curr, 0);
// sum = 15

// Sum a field in objects
const cart = [{ price: 10 }, { price: 25 }, { price: 5 }];
const total = cart.reduce((acc, item) => acc + item.price, 0);
// total = 40
```

---

## 6. Handling Concurrency in UI (React)

React 18 introduced concurrent features. Use `useTransition` to mark non-urgent state updates so the UI stays responsive.

```jsx
function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setQuery(e.target.value); // urgent — update input immediately

    startTransition(() => {
      setResults(expensiveSearch(e.target.value)); // non-urgent — can be interrupted
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending ? <p>Loading...</p> : results.map((r) => <div key={r}>{r}</div>)}
    </>
  );
}
```

---

## 7. Stale Closures

A stale closure captures an old value of a variable because the function was created in a previous render.

**Problem:**
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(count); // always logs 0 — stale closure
    }, 1000);
    return () => clearInterval(id);
  }, []); // missing `count` in deps
}
```

**Fix — use functional updater or add to deps:**
```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount((prev) => prev + 1); // uses latest value, no stale closure
  }, 1000);
  return () => clearInterval(id);
}, []);
```

---

## 8. Preventing Unnecessary Re-renders

| Method | When to use |
|---|---|
| `React.memo` | Memoize a component — skips re-render if props didn't change |
| `useMemo` | Memoize expensive computed values |
| `useCallback` | Stable function references passed as props |
| Split state down | Keep state close to where it's used — don't lift unnecessarily |
| Avoid inline objects/arrays in JSX | `style={{ color: 'red' }}` creates a new object every render |
| `key` stability | Avoid using index as key for dynamic lists |

```jsx
// React.memo example
const Card = React.memo(({ title }) => <div>{title}</div>);

// Avoid inline object (causes re-render of Card every time)
// Bad:  <Card style={{ margin: 10 }} />
// Good:
const cardStyle = { margin: 10 };
<Card style={cardStyle} />
```

---

## 9. Proper State Management for Parallel Updates

When multiple state updates happen at once, use a single state object or `useReducer` to batch them and avoid partial/inconsistent state.

**Problem with separate states:**
```jsx
// Each setState triggers a separate render
setLoading(true);
setData(null);
setError(null);
```

**Fix — single state object:**
```jsx
const [state, setState] = useState({ loading: false, data: null, error: null });

// One update, one render
setState({ loading: true, data: null, error: null });
```

**Better — useReducer for complex parallel updates:**
```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START": return { loading: true, data: null, error: null };
    case "FETCH_SUCCESS": return { loading: false, data: action.data, error: null };
    case "FETCH_ERROR": return { loading: false, data: null, error: action.error };
    default: return state;
  }
};

const [state, dispatch] = useReducer(reducer, { loading: false, data: null, error: null });

dispatch({ type: "FETCH_START" }); // single atomic update
```

> React 18 batches all state updates automatically (even in async code), but `useReducer` still gives cleaner logic for parallel state transitions.

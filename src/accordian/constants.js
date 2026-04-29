export const ITEMS = [
  {
    id: 1,
    question: 'What is React?',
    answer:
      'React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces of code called components.',
  },
  {
    id: 2,
    question: 'What is the virtual DOM?',
    answer:
      'The virtual DOM is a lightweight in-memory representation of the real DOM. React diffs the virtual DOM against the previous snapshot and applies only the minimal set of changes needed.',
  },
  {
    id: 3,
    question: 'What are React hooks?',
    answer:
      'Hooks are functions that let you use state and other React features inside function components. Common hooks include useState, useEffect, useRef, and useCallback.',
  },
  {
    id: 4,
    question: 'When should you use useReducer over useState?',
    answer:
      'Prefer useReducer when state logic is complex, involves multiple sub-values, or when the next state depends on the previous one in non-trivial ways.',
  },
];

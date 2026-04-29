export const TASKS = [
  { id: 1, label: 'Task 1', duration: 3000 },
  { id: 2, label: 'Task 2', duration: 6000 },
  { id: 3, label: 'Task 3', duration: 9000 },
  { id: 4, label: 'Task 4', duration: 4500 },
];

export const TICK = 100;

export const makeInitialBars = () =>
  TASKS.map((t) => ({ ...t, progress: 0, status: 'idle' }));

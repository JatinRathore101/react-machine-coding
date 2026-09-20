# SRS — Concurrent Progress Bars

> Scope: Ye document sirf `src/concurrant-progress-bars/` module ke approach aur development ko cover karta hai. Baaki repo ke problems is doc ke dayre me nahi aate.

---

## 1. Problem Statement

Interview ka classic machine coding round question hai: **"Ek page pe multiple progress bars dikhao jo ek saath (concurrently) chalein, aur har bar ka apna independent control ho."**

Isme jo cheezein tricky hoti hain:

- Har bar ka apna **alag duration** hai — Task 1 3 second me complete hoga, Task 3 9 second me. Matlab har bar alag speed pe badhega.
- Saare bars **ek saath chal sakte hain**, par ek dusre ko block nahi karenge. Ek ko pause karo to baaki chalte rahein.
- Har bar ke apne actions: **Start / Pause / Resume / Reset**, plus global **Start All / Reset All**.
- Timer ka kaam React ke render cycle se bahar hota hai (`setInterval`), isliye **stale closure** ka risk hai — timer purane state ko pakad ke baith jata hai aur progress galat calculate hota hai.
- Component unmount ya reset pe timers clear na kiye to **memory leak** aur "setState on unmounted component" type warnings aate hain.

Simple shabdon me: N independent timers ko ek single React state ke andar safely manage karna hai, bina leak aur bina stale data ke.

---

## 2. Objective

Ek self-contained React component banana jo:

1. Config-driven ho — tasks ki list (id, label, duration) ek constants file se aaye, component code chhedna na pade.
2. Har bar ke liye **independent lifecycle** de: `idle → running → paused → running → completed`.
3. Percentage smooth badhe aur **duration ke hisaab se proportionally** badhe, na ki sab bars same speed pe.
4. Pause pe progress **freeze** ho (0 na ho), Resume pe wahin se aage badhe, Reset pe 0 pe wapas aaye.
5. Koi bhi timer leak na ho — pause, reset, complete aur unmount, chaaron cases me interval clear ho.
6. External library (redux, rxjs, timers lib) ka use na ho — sirf React hooks. Interview constraint bhi yahi rehta hai.

---

## 3. Implementation

### 3.1 File Structure

| File | Role |
|---|---|
| [constants.js](constants.js) | Task config (`TASKS`), tick interval (`TICK`), aur `makeInitialBars()` factory |
| [concurrant-progress-bars.jsx](concurrant-progress-bars.jsx) | Container — saara state aur timer logic yahin hai |
| [ProgressBar.jsx](ProgressBar.jsx) | Presentational child — sirf ek bar ka UI aur buttons render karta hai |

Container/Presentational split isliye rakha hai taki bar ka UI dumb rahe — usko pata hi na ho ki timer kaise chal raha hai, wo sirf `bar` object aur 3 callbacks consume kare.

### 3.2 Data Model

Har bar ka shape:

```js
{ id: 1, label: 'Task 1', duration: 3000, progress: 0, status: 'idle' }
```

`status` ki 4 possible values:

| Status | Matlab | Timer chal raha hai? |
|---|---|---|
| `idle` | Kabhi start nahi hua, ya reset ho gaya | Nahi |
| `running` | Abhi badh raha hai | Haan |
| `paused` | Ruka hua, progress preserved | Nahi |
| `completed` | 100% ho chuka | Nahi |

### 3.3 Approach — Key Design Decisions

**(a) Single state array, N timers**

Har bar ke liye alag `useState` banane ke bajaye ek hi array state rakha hai:

```jsx
const [bars, setBars] = useState(makeInitialBars);
const timers = useRef({});
```

Fayda: "Start All" ya "Reset All" jaise bulk operations ek hi update me ho jate hain, aur bars ka order/consistency guaranteed rehta hai.

**(b) Timers `useRef` me, state me nahi**

Interval IDs mutable hain aur inke badalne pe UI ko re-render karne ki zarurat nahi. Isliye `timers.current` ek plain object hai: `{ [barId]: intervalId }`. State me daalte to har timer create/clear pe extra render hota.

**(c) Stale closure se bachne ke liye functional updater**

Ye is problem ka **sabse critical part** hai. `setInterval` ka callback ek hi baar banta hai aur render ke us waqt ka `bars` capture kar leta hai. Agar hum seedha `bars` padhte to progress hamesha 0 se calculate hota.

Fix — `setBars(prev => ...)` ke andar hi latest bar nikalte hain:

```jsx
timers.current[id] = setInterval(() => {
  setBars((prev) => {
    const bar = prev.find((b) => b.id === id);
    if (!bar || bar.status !== "running") {
      clearTimer(id);
      return prev;
    }
    const newProgress = Math.min(bar.progress + (TICK / bar.duration) * 100, 100);
    const completed = newProgress >= 100;
    if (completed) clearTimer(id);
    return prev.map((b) =>
      b.id === id ? { ...b, progress: newProgress, status: completed ? "completed" : "running" } : b
    );
  });
}, TICK);
```

Yahan `prev` hamesha fresh hota hai, isliye stale closure ka issue bilkul khatam ho jata hai.

**(d) Duration-proportional increment**

Sab bars ek hi `TICK` (100ms) pe fire karte hain, par har tick pe kitna badhna hai wo duration decide karta hai:

```
increment per tick = (TICK / duration) * 100
```

Example: `duration = 3000ms` → har tick pe `(100/3000)*100 = 3.33%` → ~30 ticks me 100%.
`duration = 9000ms` → har tick pe `1.11%` → ~90 ticks me 100%.

Isse alag-alag duration wale bars ek hi interval frequency use karte hue bhi alag speed pe complete hote hain. `Math.min(..., 100)` clamp lagaya hai taki floating point rounding se 100% se upar na nikle.

**(e) Guard against double-start**

`startBar` ke andar pehle check hota hai — agar bar already `running` ya `completed` hai to naya interval banaye bina return kar dete hain. Iske bina "Start All" do baar dabane pe ek hi bar pe do intervals lag jate aur speed double ho jati:

```jsx
if (!bar || bar.status === "running" || bar.status === "completed") return prev;
```

### 3.4 Control Flow — Step by Step

**Start / Resume:**
1. Status ko `running` mark karo (agar already running/completed nahi hai).
2. `setInterval` register karo aur uska id `timers.current[id]` me store karo.
3. Har tick pe progress badhao; 100% hote hi timer clear karke status `completed` kar do.

**Pause:**
1. `clearTimer(id)` — interval band aur ref se entry delete.
2. Status `paused` set karo. `progress` ko haath nahi lagate — wahi freeze value resume pe base banti hai.

**Reset (single):**
1. Timer clear karo.
2. Us bar ka `progress = 0`, `status = 'idle'`.

**Reset All:**
1. Saare intervals loop karke clear karo, `timers.current = {}`.
2. `makeInitialBars()` se fresh array set kar do — puri state factory-reset.

**Unmount cleanup:**
```jsx
useEffect(() => {
  return () => Object.values(timers.current).forEach(clearInterval);
}, []);
```

### 3.5 UI Layer

`ProgressBar.jsx` purely presentational hai:

- Outer div fixed-height track hai, inner div ki `width: ${progress}%` — yahi actual fill hai.
- `transition: width 0.1s linear` lagaya hai jo `TICK` ke barabar hai, isse 100ms ke jerky jumps smooth dikhte hain.
- Fill ka color status batata hai: completed → green, paused → yellow, running → blue.
- Button swap logic: `running` me **Pause**, warna **Start** / **Resume** (paused ho to "Resume" label). `completed` pe start disabled, `idle` pe reset disabled.

---

## 4. Impact

**Kya achieve hua:**

- N bars sach me concurrently chalte hain — har ek apne independent timer aur apni speed pe, ek dusre ko block kiye bina.
- Pause/Resume progress-preserving hai; Reset predictable hai; koi timer leak nahi hota (pause, reset, complete, unmount — chaaron covered).
- Naya task add karna ab sirf `TASKS` array me ek entry daalne ka kaam hai — component code me zero change.

**Interview ke liye ye cheezein demonstrate hoti hain:**

| Concept | Kahan dikha |
|---|---|
| Stale closure fix | `setBars(prev => ...)` functional updater inside interval |
| `useRef` for non-render values | `timers.current` map |
| `useEffect` cleanup | Unmount pe saare intervals clear |
| Container/Presentational split | Container me logic, `ProgressBar` me sirf UI |
| Derived math over stored math | Increment duration se derive hota hai, hardcode nahi |

**Known trade-offs / aage kya improve ho sakta hai:**

- `setInterval` drift kar sakta hai agar tab background me chala jaye. Frame-accurate chahiye to `requestAnimationFrame` + `performance.now()` based elapsed-time model behtar rahega.
- Styles abhi inline hain — har render pe naya object banta hai. Scale badhe to CSS module ya constant style objects me shift karna chahiye.
- Sequential/queued mode (ek complete ho to agla start ho) abhi support nahi hai; ye is problem ka common follow-up variant hai.

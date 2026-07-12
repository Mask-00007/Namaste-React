# 🔐 Password Generator (React)

A password generator built with React Hooks, made while following the React series by **Chai aur Code (Hitesh Choudhary)**.

This README breaks down the code line by line — written for beginners who want to actually understand *why* each line exists, not just copy-paste it.

---

## ✨ Features

- Adjustable password length (6–100 characters) via slider
- Optional numbers
- Optional special characters
- Copy to clipboard with a "Password copied!" confirmation
- Auto-regenerates whenever length or character options change

---

## 🛠️ Tech Stack

- React
- Tailwind CSS (for styling classes like `bg-gray-700`, `rounded-lg`, etc.)

---

## 🧠 Code Walkthrough

### 1. Imports

```javascript
import { useState, useCallback, useEffect, useRef } from 'react'
```

Four hooks are imported:
- **useState** — stores data that changes over time (like password length, or the password itself)
- **useCallback** — remembers a function so it isn't recreated on every re-render (performance optimization)
- **useEffect** — runs code automatically in response to something changing
- **useRef** — grabs a direct reference to a DOM element (here, the input box)

---

### 2. State Variables

```javascript
const [length, setLength] = useState(8);
const [numberAllowed, setNumberAllowed] = useState(false);
const [charAllowed, setCharAllowed] = useState(false);
const [password, setPassword] = useState("")
const [copied, setCopied] = useState(false);
```

Each line creates **one piece of state** and **one function to update it**:

| State | Default | Purpose |
|---|---|---|
| `length` | `8` | Current password length |
| `numberAllowed` | `false` | Whether numbers (0-9) are included |
| `charAllowed` | `false` | Whether special characters are included |
| `password` | `""` | The actual generated password |
| `copied` | `false` | Whether to show the "copied" confirmation message |

Whenever `setLength`, `setNumberAllowed`, etc. are called, React re-renders the component with the new value.

---

### 3. The Ref

```javascript
const passwordRef = useRef(null);
```

This creates a "box" that will hold a direct reference to the password `<input>` element once it renders. It's used later to select the input's text before copying.

---

### 4. Generating the Password

```javascript
const passwordGenerator = useCallback(() => {
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  if (numberAllowed) str += "0123456789"
  if (charAllowed) str += "!@#$%^&*()_+[]?"

  for (let i = 1; i <= length; i++) {
    let char = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(char);
  }

  setPassword(pass);

}, [length, numberAllowed, charAllowed, setPassword])
```

Step by step:
1. `pass` starts empty — this will be built up character by character.
2. `str` starts as all uppercase + lowercase letters.
3. If `numberAllowed` is true, digits `0-9` get appended to `str`.
4. If `charAllowed` is true, special characters get appended to `str`.
5. The `for` loop runs once per character of the desired length:
   - `Math.random()` gives a decimal between 0 and 1.
   - Multiplying by `str.length` scales it to the string's size.
   - `Math.floor()` rounds it down to a whole number, giving a random index.
   - `str.charAt(char)` picks the character at that index and adds it to `pass`.
6. Finally, `setPassword(pass)` saves the result into state, which triggers a re-render so the UI shows the new password.

**⚠️ Known issue:** the line `Math.floor(Math.random() * str.length + 1)` adds `+1` *before* flooring, which means the index can occasionally equal `str.length` — one past the last valid character. `charAt()` on an out-of-range index silently returns an empty string, so the password can sometimes be shorter than the length slider says. Fix: `Math.floor(Math.random() * str.length)` (remove the `+1`).

**Why `useCallback` here?** Without it, `passwordGenerator` would be a brand-new function on every render, which would cause the `useEffect` below (which depends on it) to run more often than necessary. Wrapping it in `useCallback` means the function is only recreated when `length`, `numberAllowed`, or `charAllowed` actually change.

---

### 5. Copying to Clipboard

```javascript
const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 999);
  window.navigator.clipboard.writeText(password);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
}, [password])
```

Step by step:
1. `passwordRef.current?.select()` — selects (highlights) the text inside the input box. The `?.` means "only do this if `passwordRef.current` actually exists" (avoids crashing if the ref isn't attached yet).
2. `setSelectionRange(0, 999)` — extra safety net to make sure the *entire* text is selected, even on mobile browsers where `.select()` alone sometimes doesn't select everything.
3. `window.navigator.clipboard.writeText(password)` — the actual browser API call that copies the password to the clipboard.
4. `setCopied(true)` — triggers the "Password copied!" message to appear.
5. `setTimeout(() => setCopied(false), 2000)` — hides that message again after 2 seconds.

---

### 6. Auto-Regenerating the Password

```javascript
useEffect(() => {
  passwordGenerator()
}, [length, numberAllowed, charAllowed, passwordGenerator])
```

This is the "reactive" part of React. Every time `length`, `numberAllowed`, or `charAllowed` changes (e.g. you move the slider or tick a checkbox), this effect runs `passwordGenerator()` again — so the password updates automatically without needing a "Generate" button.

---

### 7. The UI (JSX)

```jsx
<div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
  <h1 className='text-white text-center my-3'>Password Generator</h1>
```
The outer container — a centered card with a dark background, rounded corners, and a title.

```jsx
<div className='flex shadow rounded-lg overflow-hidden mb-4'>
  <input
     type='text'
     value={password}
     className='outline-none w-full py-1 px-3 bg-white text-black'
     placeholder='Passoword'
     ref={passwordRef}
  />
  <button onClick={copyPasswordToClipboard}>copy</button>
  {copied && (<span className='text-green-400 text-sm ml-2'>Password copied!</span>)}
</div>
```
- The `<input>` displays the current `password` state. It's **read-only in practice** (no `onChange`), since its value only comes from `setPassword`.
- `ref={passwordRef}` connects this input to the `passwordRef` created earlier — this is what lets `copyPasswordToClipboard` select its text.
- The button calls `copyPasswordToClipboard` when clicked.
- `{copied && (...)}` is conditional rendering — the "Password copied!" text only renders when `copied` is `true`.

```jsx
<input
 type='range'
 min={6}
 max={100}
 value={length}
 onChange={(e) => {setLength(e.target.value)}}
/>
<label htmlFor="Length">Length: {length}</label>
```
A slider from 6 to 100. Every time it's dragged, `onChange` fires and updates `length` via `setLength`. This change is what triggers the `useEffect` to regenerate the password.

```jsx
<input
  type='checkbox'
  defaultChecked={numberAllowed}
  onChange={() => setNumberAllowed((prev) => !prev)}
/>
<label htmlFor="numberInput">Numbers</label>
```
A checkbox that flips `numberAllowed` between `true`/`false` on every click, using the "previous state" pattern (`(prev) => !prev`) — the safe way to toggle boolean state in React.

The "Characters" checkbox works identically for `charAllowed`.

---

## 🐞 Known Issues / Improvements to Try

- **Off-by-one bug** in `passwordGenerator` (explained above) — occasionally produces a password one character short.
- The checkboxes use `defaultChecked` instead of `checked`. This makes them semi-uncontrolled inputs — React sets the initial checked state but doesn't fully control it afterward. It happens to work here because the toggle logic lives in separate state, but it's worth understanding the controlled-vs-uncontrolled distinction as you go deeper into React forms.
- `htmlFor="Length"` has no matching `id` on the range input — minor accessibility gap.
- `htmlFor="numberInput"` doesn't match the checkbox's actual `id="numberImput"` (typo) — same accessibility fix applies.

---


## 📚 Reference

Built while following the React series by [Hitesh Choudhary — Chai aur Code](https://www.youtube.com/@chaiaurcode).

## 🙋 Author

**Shubham Raj**
- GitHub: [@Mask-00007](https://github.com/Mask-00007)
- LinkedIn: [shubhamraj-dev](https://linkedin.com/in/shubhamraj-dev)
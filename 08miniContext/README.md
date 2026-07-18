# CONETXT API CONCEPT :-

- The React Context API is a built‑in feature that lets you share data across components without manually passing props through every level (avoiding “prop drilling”). It’s ideal for global state like themes, authentication, or user settings.

## 🔑 How Context API Works

- Create a Context: Use createContext() to define a context object.

- Provide a Value: Wrap components in a <Context.Provider> and pass a value.

- Consume the Value: Use the useContext() hook inside any child component to access the value directly.

## PROP DRILLING :-

- Prop drilling happens when you pass data (props) from a parent component down through multiple layers of child components, even if only the deepest child actually needs the data.

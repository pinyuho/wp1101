# HW 9

### Install additional module
```
cd frontend
yarn add styled-components
```

- if unable to run frontend:
```
cd frontend
yarn upgrade
```

### Bugs to be fixed
- Creating new chatbox will query chatBox before created (async problem but still don't know how to fix)
- Message sent: 
```
index.js:1 Missing field 'name' while writing result "messages"
```
- Loading message: 
```
Warning: Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.
```
import { useState } from 'react'
export const Counter = function () {
  const [counter, setCounter] = useState(1)
  const [open, setOpen] = useState(true)
  function handleClick() {
    setCounter((prev) => prev + 1)
  }

  return (
    <div>
      <button onClick={() => setOpen((prev) => !prev)}>{open ? 'закрыть' : 'открыть'}</button>
      {open ? (
        <>
          <button onClick={handleClick}>count</button>
          <h1>{counter}</h1>
        </>
      ) : null}
    </div>
  )
}

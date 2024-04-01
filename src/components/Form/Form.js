import { useState } from 'react'
import './Form.css'

const Form = (props) => {
  const [value, setValue] = useState('')
  console.log(props)
  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault()
        props.putTodo(value)
        setValue('')
      }}
    >
      <input
        type="text"
        placeholder="Введите текст..."
        className="input"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          props.handleChangeError(value)
        }}
      />
    </form>
  )
}
export default Form

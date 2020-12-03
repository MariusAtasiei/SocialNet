import React, { useState } from "react"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faEye } from "@fortawesome/free-solid-svg-icons"

function Input({ type, name, register, errors }) {
  const lowercasedName = name.toLowerCase()
  const [hidden, setHidden] = useState(true)

  return (
    <div className="form-group">
      <label className="text-muted">{name}</label>
      <input
        type={
          hidden === true &&
          ["password", "new password"].includes(lowercasedName)
            ? "password"
            : "text"
        }
        className="form-control"
        name={lowercasedName}
        ref={register({
          required: `${name} is required`,
          minLength: {
            value: 6,
            message: `${name} is too short. Minimum length is 6.`,
          },
          ...pattern(lowercasedName),
        })}
      />
      {type === "password" && <p onClick={() => setHidden(!hidden)}>eye</p>}
      {errors[lowercasedName] && (
        <p style={{ color: "red" }}>{errors[lowercasedName].message}</p>
      )}
    </div>
  )
}

const pattern = (name) => {
  if (name === "email") {
    return {
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Invalid email address.",
      },
    }
  } else
    return {
      maxLength: {
        value: 36,
        message: `${name} is too long. Maximum length is 36.`,
      },
    }
}

export default Input

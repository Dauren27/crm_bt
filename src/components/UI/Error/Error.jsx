import React from 'react'
import "./error.scss"

const Error = ({ children, ...props }) => {
  return (
    <div
      className="error"
      {...props}
    >
      {children}
    </div>
  )
}

export default Error;


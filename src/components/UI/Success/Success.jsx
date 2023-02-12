import React from 'react'
import "./success.scss"

const Success = ({ children, ...props }) => {
  return (
    <div
      className="success"
      {...props}
    >
      {children}
    </div>
  )
}

export default Success;
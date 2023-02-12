import React from 'react'
import "./loading.scss"

const Loading = ({ children, ...props }) => {
  return (
    <div
      className="loading"
      {...props}
    >
      {children}
    </div>
  )
}

export default Loading;
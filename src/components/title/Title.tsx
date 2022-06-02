import React from 'react'

export const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h2 className="mb-8 text-36 font-medium text-yellow-400">{children}</h2>
}

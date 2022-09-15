import React, { useState } from 'react'

const SupabaseIcon = ({ ...props }) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <svg
      className="icon"
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={isHovered || props.isMobile ? { fill: '#3ECF8E' } : {}}
      {...props}
    >
      <title>Supabase</title>
      <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.66z" />
    </svg>
  )
}

export default SupabaseIcon

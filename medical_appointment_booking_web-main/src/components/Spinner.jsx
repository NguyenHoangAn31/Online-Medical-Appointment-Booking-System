import { Spin } from 'antd'
import React from 'react'

function Spinner() {
  return (
    <Spin size='large' style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }} />
  )
}

export default Spinner
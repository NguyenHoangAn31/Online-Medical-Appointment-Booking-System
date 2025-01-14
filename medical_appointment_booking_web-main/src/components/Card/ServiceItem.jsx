import React from 'react'

const ServiceItem = ({ props, isActive, onClick}) => {
  const { id, name, icon } = props
  return (
    <div className={`service__item ${isActive ? 'active' : ''}`} onClick={onClick}>
      <img src="/images/departments/pediatrics.png" alt="" className='service__item-img' />
      <div className='service__item-name'>{name}</div>
    </div>
  )
}

export default ServiceItem
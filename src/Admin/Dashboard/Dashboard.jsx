/* eslint-disable no-unused-vars */
import React from 'react'
import  BarChart  from './Analytics'
import Shipments from './Shipments'
import Header from './Header'

export default function Dashboard() {

  return (
<>
<div className='container'>
<Header/>
<Shipments/>
<BarChart/>
</div>
</>
  )
}

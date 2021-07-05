import React from 'react'
import Link from 'next/link';


const BreadCrums = ({ others} : {others: string[] }) => {
  return (
    <div>
      <Link href="/">Home</Link>
      <div>/</div>
      {others.map(x => (
        <>
        <Link href={'/' + x}>{x}</Link>
        <div>/</div>
        </>
      ))}
    </div>
  )
}

export default BreadCrums;

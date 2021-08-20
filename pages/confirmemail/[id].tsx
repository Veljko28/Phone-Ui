import { useRouter } from 'next/router'
import React from 'react'

const ConfirmEmail = () => {

  const router = useRouter();

  const id = router.query['id'];

  return (
    <div>
      {id}
    </div>
  )
}

export default ConfirmEmail

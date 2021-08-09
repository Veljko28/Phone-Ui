import { useRouter } from 'next/router';
import React from 'react'

const EditUser = () => {

  const router = useRouter();
  const id = router.query['id'];

  return (
    <div>
      User Edit Page {id}
    </div>
  )
}

export default EditUser;

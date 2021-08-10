import { useRouter } from 'next/router';
import React from 'react'
import NotLoggedIn from '../../../constants/NotLoggedIn';

const EditUser = () => {

  const router = useRouter();
  const id = router.query['id'];

  let jwt: string | null = null;

    if (typeof window !== 'undefined') {
      jwt = localStorage.getItem('jwt');
    }


  return (
    <>
    {jwt === null ? <NotLoggedIn/> : (
      <div>
        User Edit Page {id}
      </div>
    )}
    </>
  )
}

export default EditUser;

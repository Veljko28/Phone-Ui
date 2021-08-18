import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';

const UserSearchSkeleton = () => {
  return (
      <div style={{display: 'flex' ,justifyContent: 'space-around', alignItems: 'flex-end', margin: '50px 125px 0 200px'}}>
      <div >
            <Skeleton  width="100px" height="100px" variant="circle"/>
      </div>
      <div>
          <Skeleton height="20px" width="350px" variant="rect" style={{margin: 5}}/>
          <Skeleton height="50px" width="500px" variant="rect" style={{margin: 5}}/>
          <Skeleton height="20px" width="200px" variant="rect" style={{margin: 5}}/>
      </div>
      <div>
          <Skeleton height="20px" width="50px" variant="rect" style={{margin: 5}}/>
        </div>
      </div>
  )
}

export default UserSearchSkeleton

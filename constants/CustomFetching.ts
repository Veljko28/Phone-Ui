export const fetchPostBid = async (url: string, payload: any) => {

    const str = JSON.stringify(payload);

    let jwt: string | null = "";

    if (typeof window !== 'undefined') {
      jwt = localStorage.getItem('jwt');
    }

    const res: any = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: str,
      method: 'POST',
    }).catch((error) => {
      console.log(error);
    })

    const bid = await res.json();
    return bid?.id;
}

export const fetchPost = async (url: string, payload: any) => {
  
    let jwt: string | null = "";

    if (typeof window !== 'undefined') {
      jwt = localStorage.getItem('jwt');
    }


    const str = JSON.stringify(payload);

    const res: any = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: str,
      method: 'POST',
    }).catch((error) => {
      console.log(error);
      return false;
    })

    return res;
}


export const fetchPostForm = async (url: string, payload: any, type: number, id: string) => {

      let jwt: string | null = "";

      if (typeof window !== 'undefined') {
        jwt = localStorage.getItem('jwt');
      }


      const data = new FormData();
      for (const file of payload){
        data.append("Files", file);
      }
      data.append("Type", type.toString());
      data.append("Id", id);


    const res: any = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      },
      body: data,
      method: 'POST',
    }).catch((error) => {
      console.log(error);
      return false;
    })

    return res.ok;
}

export const fetchGet = async (url: string) => {

    let jwt: string | null = "";

      if (typeof window !== 'undefined') {
        jwt = localStorage.getItem('jwt');
      }

  const res = await fetch(url,
     {
       headers: {
        'Authorization': `Bearer ${jwt}`
        },
       method: 'GET'
      })
      .catch(err => console.log('failed to fetch'));
  return  res;
}
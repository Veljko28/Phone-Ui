export const fetchPostBid = async (url: string, payload: any) => {
    console.log(payload);

    const str = JSON.stringify(payload);

    const res: any = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
    const str = JSON.stringify(payload);

    const res: any = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: str,
      method: 'POST',
    }).catch((error) => {
      console.log(error);
      return false;
    })

    const phone = await res.json();
    return phone?.id;
}


export const fetchPostForm = async (url: string, payload: any, type: number, id: string) => {

    // Fix sending files to fetch

      const data = new FormData();
      for (const file of payload){
        data.append("Files", file);
      }
      data.append("Type", type.toString());
      data.append("Id", id);


    const res: any = await fetch(url, {
      body: data,
      method: 'POST',
    }).catch((error) => {
      console.log(error);
      return false;
    })

    return res.ok;
}

export const fetchGet = (url: string) => {
  fetch(url, { method: 'GET',}).then(res => {return res;})
  .catch(err => console.log('failed to fetch'));
}
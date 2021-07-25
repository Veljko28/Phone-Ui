
export const fetchPost = async (url: string, payload: any) => {
    const str = JSON.stringify(payload);

    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: str,
      method: 'POST',
    });

    console.log(res.ok);
    return res.ok;
}


export const fetchGet = (url: string) => {
  fetch(url, { method: 'GET',}).then(res => {return res;})
  .catch(err => console.log('failed to fetch'));
}
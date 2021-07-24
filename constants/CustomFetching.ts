
export const fetchPost = (url: string, payload: any) => {
    const str = JSON.stringify(payload);

    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: str,
      method: 'POST',
    }).then(res => {
      return res;
    }).catch(x => console.log('failed to fetch'));
}


export const fetchGet = (url: string) => {
  fetch(url, { method: 'GET',}).then(res => {return res;})
  .catch(err => console.log('failed to fetch'));
}
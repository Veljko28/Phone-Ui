import { changeLoginStatus } from "../redux/actions/userInfoActions";
import store from "../redux/store";
import { JwtToken } from "./jwtTypes";

const unauthorizedCheck = async () => {

   const expires = localStorage.getItem('exp');
   const token = localStorage.getItem('jwt');
   const refreshToken = localStorage.getItem('refresh');
   
      const res = await fetchPost('http://localhost:10025/api/v1/token/refresh', {token: "1", refreshToken});

      if ((res as Response)?.ok){
        const json: JwtToken = await (res as Response).json();
        localStorage.setItem('jwt', json.token);
        localStorage.setItem('refresh', json.refreshToken);

        // try to fetch again
        return true;
      }

      store.dispatch(changeLoginStatus(false));
      localStorage.clear();
      location.reload();

    return false;
}

export const fetchPostBid: (url: string, payload: any) => any = async (url: string, payload: any) => {

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

    let success = false;

    if (res?.statusText === 'Unauthorized') success = await unauthorizedCheck();

    if (success){
      return fetchPostBid(url, payload);
    }

    const bid = await res.json();
    return bid?.id;
}

export const fetchPost: (url: string, payload: any) => any = async (url: string, payload: any) => {
  
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
    })

    let success = false;

    if (res?.statusText === 'Unauthorized') success = await unauthorizedCheck();

    if (success){
      return fetchPost(url, payload);
    }

    return res;
}

export const fetchForm: (url: string, payload: any) => any = async (url: string, payload: any) => {

      let jwt: string | null = "";

      if (typeof window !== 'undefined') {
        jwt = localStorage.getItem('jwt');
      }

      const data = new FormData();
      data.append("Files", payload);

    const res: any = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      },
      body: data,
      method: 'POST',
    }).catch((error) => {
      console.log(error);
    })

    let success = false;

    if (res?.statusText === 'Unauthorized') success = await unauthorizedCheck();

    if (success){
      return fetchForm(url, payload);
    }

    return res;
}


export const fetchPostForm: (url: string, payload: any, type: number, id: string) => any = 
async (url: string, payload: any, type: number, id: string) => {

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
    })

    let success = false;

    if (res?.statusText === 'Unauthorized') success = await unauthorizedCheck();

    if (success){
      return fetchPostForm(url, payload, type, id);
    }

    return res.ok;
}

export const fetchGet: (url:string) => any = async (url: string) => {

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

  return res;
}


export const fetchDelete: (url: string) => any = async (url: string) => {
  
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
      method: 'DELETE',
    }).catch((error) => {
      console.log(error);
    })

    let success = false;

    if (res?.statusText === 'Unauthorized') success = await unauthorizedCheck();

    if (success){
      return fetchDelete(url);
    }

    return res;
}


export const fetchPatch: (url: string, payload: any) => any = async (url: string, payload: any) => {
  
    let jwt: string | null = "";
    const str = JSON.stringify(payload);

    if (typeof window !== 'undefined') {
      jwt = localStorage.getItem('jwt');
    }

    const res: any = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      method: 'PATCH',
      body: str
    }).catch((error) => {
      console.log(error);
    })

    let success = false;

    if (res?.statusText === 'Unauthorized') success = await unauthorizedCheck();

    if (success){
      return fetchPatch(url, payload);
    }

    return res;
}



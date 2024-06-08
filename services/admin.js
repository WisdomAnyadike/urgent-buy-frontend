import axios from "axios";
const BASEURL = import.meta.env.VITE_ACCESS_URL
const BASEURL_MAIN = import.meta.env.VITE_ACCESS_URL_MAIN

export const admitAdmin = async (payload) => {
  try {
    const res = await axios.post(`${BASEURL_MAIN}/Api/Admin/adminLogin`, payload)
    if (res.data.status == 'okay') {
      return {
        status: 'success', message: res.data.message
      }

    } else {
      // Handle cases where status is not 'okay'
      return {
        status: 'failed',
        message: res.data.message || 'Login failed. Please try again.'
      };
    }


  } catch (error) {
    console.log(error);
    return {
      status: 'failed', message: error.response.data.message
    }
  }

};


 export const fetchApi = async (string) => {
  try {
    const res = await axios.get(`${BASEURL_MAIN}${string}`)
    if (res.data.status === 'okay') {    
      return {
        status: 'success', data: res.data.data
      }
    } else {
      return {
        status: 'failed',
        error: res.data.message || 'failed. Please try again.'
      };
    }
  } catch (error) {
    return {
      status: 'failed', error: error.response.data.message
    }
  }

}



export const createProduct = async(payload)=> {
  try {
    const res = await axios.post(`${BASEURL_MAIN}/Api/Products/createProduct`, payload)
    if (res.data.status == 'okay') {
      return {
        status: 'success', message: res.data.message
      }

    } else {
      // Handle cases where status is not 'okay'
      return {
        status: 'failed',
        message: res.data.message || 'failed. Please try again.'
      };
    }


  } catch (error) {
    
    return {
      status: 'failed', message: error.response.data.message
    }
  }

}







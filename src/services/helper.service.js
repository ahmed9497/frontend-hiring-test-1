import authHeader from './auth.header';
import http from './httpServices';

const API_URL = process.env.REACT_APP_API_BASE_URL;


const signIn = async (req) => {

    return await http.post(API_URL + `/auth/login`,req,
        {
            headers: authHeader(),

        })
}
const fetchCallList=async(offset,limit)=>{
    
    
   
    return await http.get(API_URL + `/calls?offset=${offset}&limit=${limit}`,
    {
        headers: authHeader(),

    }
    )
}
const addNote = async ({id,content}) => {

    return await http.post(API_URL + `/calls/${id}/note`,{content},
        {
            headers: authHeader(),

        })
}





export {
    signIn,
    fetchCallList,
    addNote,
   
  
}
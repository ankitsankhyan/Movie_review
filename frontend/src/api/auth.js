import client from "./client";

export const createUser = async(userInfo)=>{
    try{
        const response = await client.post('/user/create', userInfo);
       
        const data = response.data;
    return data;
      
      
       
    }catch(err){
        if(err.response){
            return err.response.data;
        }else{
            return err.message || err;

        }
    }
   

}
export const verifyEmail = async(userInfo)=>{
    try{
        const response = await client.post('/user/verifyEmail', userInfo);
       
        const data = response.data;
    return data;
      
      
       
    }catch(err){
        if(err.response){
            return err.response.data;
        }else{
            return err.message || err;

        }
    }
   

}


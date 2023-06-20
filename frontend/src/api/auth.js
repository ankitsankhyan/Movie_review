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

export const signin = async(userInfo)=>{
    try{
        const response = await client.post('/user/signin', userInfo);
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

export const getIsAuth = async(token)=>{
   try{
    const {data} = await client.get('/user/is-auth',{
        headers:{ 
            Authorization:'Bearer '+ token,
            accept:'application/json'
        },  
    });
    return data;
   }catch(err){
        const {response} = err;
        if(response?.data) return response.data;

        return {error: err.message || err};

   }
}

import axios from "axios";
import { createContext,useState,useEffect, Children } from "react";
export const companyContext= createContext({})
export function Companycontextprovider({children}){
    const [company,setcompany]=useState(null)
    useEffect(()=>{
        if(!company){
            axios.get("company/getProfile").then(({data})=>{
                setcompany(data)
            })
        }
    },[company])
    //this usercontext refer to the one it declared before function
    return <companyContext.Provider value={{company ,setcompany}}>
        {children} 
    </companyContext.Provider>
}
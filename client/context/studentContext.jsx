import axios from "axios";
import { createContext,useState,useEffect, Children } from "react";
export const studentContext= createContext({})
export function Studentcontextprovider({children}){
    const [student,setstudent]=useState(null)
    useEffect(()=>{
        if(!student){
            axios.get("student/getProfile").then(({data})=>{
                setstudent(data)
            })
        }
    },[student])
    //this usercontext refer to the one it declared before function
    return <studentContext.Provider value={{student ,setstudent}}>
        {children} 
    </studentContext.Provider>
}
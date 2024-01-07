import { allowedOrigins } from "./allowedOrigins"



const corsOptions = {
    
    // need to remove the origin == undefined while using in production
    
    origin:(origin:string | undefined,callback:(error: Error | null, allowed: boolean) => void)=>{
        
        console.log('cors reached')
        
        if(origin && allowedOrigins.indexOf(origin) !== -1 || origin == undefined){
            
            console.log('cors passed')
            
            callback(null,true)
        }
        
        else{
            
            callback(new Error ('Not allowed by Cors'),false)
            
            console.log('cors error')
        }
    },
    
  credentials: true,          // Allow credentials (e.g., cookies)
  optionsSuccessStatus: 204, // Respond 204 No for successful preflight req
}

export default corsOptions
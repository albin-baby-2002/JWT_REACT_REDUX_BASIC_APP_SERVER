
const whiteList = [
    'http://127.0.0.1:3000',
    'http://localhost:3500'
]

const corsOptions = {
    
    // need to remove the origin == undefined while using in production
    
    origin:(origin:string | undefined,callback:(error: Error | null, allowed: boolean) => void)=>{
        
        if(origin && whiteList.indexOf(origin) !== -1 || origin == undefined){
            
            callback(null,true)
        }
        
        else{
            
            callback(new Error ('Not allowed by Cors'),false)
        }
    },
    
  credentials: true,          // Allow credentials (e.g., cookies)
  optionsSuccessStatus: 204, // Respond 204 No for successful preflight req
}

export default corsOptions
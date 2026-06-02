import {
    Request, Response, NextFunction
} from "express"

import jwt from "jsonwebtoken"

const protect=(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    let token 
    if(req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        token=req.headers.authorization.split(" ")[1]
        try{
            const decoded=
                jwt.verify(
                    token,
                    process.env.JWT_SECRET as string
                )
                
            req.user=decoded

            next()
        }
        catch(error){
            return res.status(401).json(
               { message:"Not authorized"}
            )
        }
    }
    if(!token){
        return res.status(401).json({
            message: "No token provided"
        })
    }

}
export default protect
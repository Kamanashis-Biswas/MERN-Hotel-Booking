import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try{
    let token: any = req.headers['authorization'];
    if(token){
      token = token.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET_KEY as string, async (err:any, user: any)=> {
        if(err)  return res.status(401).send("Unauthorized!");
        const usr = await User.findById(user.userId);
        (req as any).user = usr;
        if(!usr) return res.status(401).send("Unauthorized!");
        next();
      });
    }
  }catch(err){
    res.status(500).send("Internal Server Error!");
  }
}

export {AuthMiddleware}

import jwt, { SignOptions } from 'jsonwebtoken'
import { JwtPayload }  from "jsonwebtoken";

export function signJwt(payload:{
    userId: number
}){
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;

    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }

    if (!expiresIn) {
        throw new Error("JWT_EXPIRES_IN is not defined");
    }
    
    return jwt.sign(payload,secret, {
        expiresIn: expiresIn as SignOptions["expiresIn"],
    });
}

export function verifyJwt(token: string){
    const secret = process.env.JWT_SECRET;

    if (!secret){
        throw new Error("JWT_SECRET is not defined")
    }

    const decoded = jwt.verify(token,secret)

    if (typeof decoded === 'string'){
        throw new Error("Invalid token");
    }

    return decoded as JwtPayload &{userId : number}
}
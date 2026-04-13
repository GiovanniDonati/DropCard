import {Request, Response, NextFunction, RequestHandler} from "express"
import { UnauthorizedException } from "../exception/unauthorized"
import { ErrorCode } from "../exception/root"
import jwt from 'jsonwebtoken'
import { prisma } from "../config/prisma"

export const authMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization

  if (!token) {
    return next(new UnauthorizedException('No unauthorized', ErrorCode.UNAUTHORIZED))
  }

  try {
    const payload = jwt.verify(token!, process.env.JWT_SECRET!) as any
    const user = await prisma.user.findFirst({where: {id: payload.userId}})

    if (!user) {
      return next(new UnauthorizedException('No unauthorized', ErrorCode.UNAUTHORIZED))
    }

    req.user = user
    next()

  } catch (error) {
    return next(new UnauthorizedException('No unauthorized', ErrorCode.UNAUTHORIZED))
  }
}

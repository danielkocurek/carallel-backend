import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { expressjwt as jwt, GetVerificationKey } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';

export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    jwt({
      secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      }) as GetVerificationKey,

      audience: `${process.env.AUTH0_DOMAIN}/api/v2/`,
      issuer: `${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256'],
    })(req, res, (err) => this.handleJwtError(err, res, next));
  }

  private handleJwtError(err: any, res: Response, next: NextFunction) {
    if (err) {
      if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      } else if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Unauthorized: Token has expired' });
      } else {
        const status = err.status || 500;
        const message = err.message || 'Sorry, we were unable to process your request.';
        return res.status(status).json({ message });
      }
    }
    next();
  }
}
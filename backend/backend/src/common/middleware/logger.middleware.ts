import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;
    res.on('finish', () => {
      this.logger.log(`${method} ${originalUrl} ${res.statusCode}`);
    });
    next();
  }
}

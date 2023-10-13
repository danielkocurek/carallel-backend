import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response, NextFunction } from 'express';
import { AuthMiddleware } from './auth.middleware';

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware;
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthMiddleware],
    }).compile();

    middleware = module.get<AuthMiddleware>(AuthMiddleware);
    req = {} as Request;
    res = {
      status: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;
    next = jest.fn() as NextFunction;
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });
});

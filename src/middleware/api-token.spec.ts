import { config } from '../config';

import apiToken from './api-token';

describe('apiToken', () => {
  it('returns 401 if no token is provided', () => {
    const req = {
      headers: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    apiToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Unauthorized');
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 401 if the token is not valid', () => {
    const req = {
      headers: {
        'x-api-token': 'invalid-token',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    apiToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Unauthorized');
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next if the token is valid', () => {
    const req = {
      headers: {
        'x-api-token': config.apiToken,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    apiToken(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

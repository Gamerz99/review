import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req, next) {
    const tokenizdReq = req.clone({
      setHeaders: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiNWQzNjhhNzgwZjdlNTYyMjExOTE3NTY3IiwiaWF0IjoxNTYzODU2MTM1fQ.V4selSx5wveMginVySffOUSbST_mzT_FDyiTz3XS4cg`
      }
    });
    return next.handle(tokenizdReq);
  }
}

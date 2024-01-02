import { HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    withCredentials: true
  });
  
  return next(req);
};

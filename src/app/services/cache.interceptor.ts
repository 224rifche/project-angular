import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, { data: any, expiry: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes de cache

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ne pas mettre en cache les requêtes autres que GET
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const currentTime = new Date().getTime();
    const cachedResponse = this.cache.get(req.urlWithParams);

    // Vérifier si la réponse est en cache et toujours valide
    if (cachedResponse && currentTime < cachedResponse.expiry) {
      return of(new HttpResponse({ body: cachedResponse.data }));
    }

    // Si pas en cache ou expiré, faire la requête et mettre en cache
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.urlWithParams, {
            data: event.body,
            expiry: currentTime + this.CACHE_DURATION
          });
        }
      })
    );
  }
}

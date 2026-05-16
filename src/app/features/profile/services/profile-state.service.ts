import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileStateService {
  private articleCountSubject = new BehaviorSubject<number>(0);
  articleCount$: Observable<number> = this.articleCountSubject.asObservable();

  setArticleCount(count: number): void {
    this.articleCountSubject.next(count);
  }

  getArticleCount(): number {
    return this.articleCountSubject.value;
  }
}

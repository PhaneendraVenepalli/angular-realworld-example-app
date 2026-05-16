import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleListComponent } from '../../article/components/article-list.component';
import { ProfileService } from '../services/profile.service';
import { ProfileStateService } from '../services/profile-state.service';
import { Profile } from '../models/profile.model';
import { ArticleListConfig } from '../../article/models/article-list-config.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-articles',
  template: `@if (articlesConfig()) {
    <app-article-list [limit]="10" [config]="articlesConfig()!" (articleCountChange)="onArticleCountChange($event)" />
  }`,
  imports: [ArticleListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProfileArticlesComponent implements OnInit {
  profile = signal<Profile | null>(null);
  articlesConfig = signal<ArticleListConfig | null>(null);
  articleCountChanged = output<number>();
  destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private readonly profileService: ProfileService,
    private readonly profileStateService: ProfileStateService,
  ) {}

  ngOnInit(): void {
    this.profileService
      .get(this.route.snapshot.params['username'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (profile: Profile) => {
          this.profile.set(profile);
          this.articlesConfig.set({
            type: 'all',
            filters: {
              author: profile.username,
            },
          });
        },
      });
  }

  onArticleCountChange(count: number) {
    this.profileStateService.setArticleCount(count);
    this.articleCountChanged.emit(count);
  }
}

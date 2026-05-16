import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-profile-stats',
  templateUrl: './profile-stats.component.html',
  styleUrl: './profile-stats.component.css',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileStatsComponent {
  profile = input<Profile | null>(null);
  articleCount = input(0);

  getMemberSinceMessage(): string {
    // Calculate approximate join date based on username hash for demo purposes
    const chars = (this.profile()?.username || '').split('');
    const hash = chars.reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const daysAgo = 30 + (hash % 365);
    return `Member for ${daysAgo} days`;
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile } from 'src/app/model/services/interfaces/profile';
import { GitHubProfile, HolidayFlags } from '../../models/portfolio.models';

type ProfileVariant = 'desktop' | 'mobile';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [':host { display: contents; }'],
})
export class ProfileCardComponent {
  @Input() profiles: Profile[] = [];
  @Input() githubProfile: GitHubProfile = { name: '', avatar_url: '' };
  @Input() profileImageUrl = '';
  @Input() holidays: HolidayFlags = {
    christmas: false,
    halloween: false,
    newYear: false,
    easter: false,
    birthday: false,
  };
  @Input() variant: ProfileVariant = 'desktop';

  @Output() whatsappRequested = new EventEmitter<string>();
  @Output() emailRequested = new EventEmitter<string>();
  @Output() localRequested = new EventEmitter<string>();

  get isDesktop(): boolean {
    return this.variant === 'desktop';
  }

  get birthdayBackground(): string {
    return this.holidays.birthday ? 'url(./assets/images/birthdayBackground.png)' : 'none';
  }
}

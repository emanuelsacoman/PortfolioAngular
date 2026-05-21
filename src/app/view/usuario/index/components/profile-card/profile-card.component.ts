import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile, ProfileSocialLink } from 'src/app/model/services/interfaces/profile';
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

  getSocialLinks(profile: Profile): ProfileSocialLink[] {
    if (profile.socialLinks?.length) {
      return profile.socialLinks.filter((link) => Boolean(link.value?.trim()));
    }

    return [
      { network: 'instagram', label: 'Instagram', value: profile.instagram },
      { network: 'facebook', label: 'Facebook', value: profile.facebook },
      { network: 'linkedin', label: 'LinkedIn', value: profile.linkedin },
      { network: 'github', label: 'GitHub', value: profile.github },
    ].filter((link) => Boolean(link.value?.trim()));
  }

  getSocialUrl(social: ProfileSocialLink): string {
    const value = social.value.trim();

    if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('mailto:')) {
      return value;
    }

    switch (social.network) {
      case 'instagram':
        return `https://instagram.com/${value.replace(/^@/, '')}`;
      case 'github':
        return `https://github.com/${value.replace(/^@/, '')}`;
      case 'linkedin':
        return value.includes('linkedin.com') ? `https://${value}` : `https://www.linkedin.com/in/${value.replace(/^@/, '')}`;
      case 'facebook':
        return value.includes('facebook.com') ? `https://${value}` : `https://facebook.com/${value.replace(/^@/, '')}`;
      case 'youtube':
        return value.includes('youtube.com') ? `https://${value}` : `https://youtube.com/${value.replace(/^@/, '')}`;
      case 'x':
        return `https://x.com/${value.replace(/^@/, '')}`;
      case 'email':
        return `mailto:${value}`;
      case 'whatsapp':
        return `https://wa.me/${value.replace(/\D/g, '')}`;
      default:
        return value.startsWith('www.') ? `https://${value}` : value;
    }
  }

  getSocialIcon(network: string): string {
    const icons: Record<string, string> = {
      instagram: './assets/images/instagram.png',
      facebook: './assets/images/facebook.png',
      linkedin: './assets/images/linkedin.png',
      github: './assets/images/github.png',
      email: './assets/images/email.png',
      whatsapp: './assets/images/smartphone.png',
      site: './assets/images/pagespeed.png',
      youtube: './assets/images/portfolio.png',
      x: './assets/images/portfolio.png',
    };

    return icons[network] ?? './assets/images/portfolio.png';
  }
}

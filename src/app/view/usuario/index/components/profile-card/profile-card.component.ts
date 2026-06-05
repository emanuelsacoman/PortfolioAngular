import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile, ProfileSocialLink } from 'src/app/model/services/interfaces/profile';
import { GitHubProfile, HolidayFlags } from '../../models/portfolio.models';

type ProfileVariant = 'desktop' | 'mobile';
type SocialLinkRecord = Record<string, unknown>;

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

  private readonly defaultSocialLabels: Record<string, string> = {
    instagram: 'Instagram',
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    buymeacoffee: 'Buy Me a Coffee',
    youtube: 'YouTube',
    x: 'X / Twitter',
    site: 'Site',
    email: 'E-mail',
    whatsapp: 'WhatsApp',
  };

  get isDesktop(): boolean {
    return this.variant === 'desktop';
  }

  get birthdayBackground(): string {
    return this.holidays.birthday ? 'url(./assets/images/birthdayBackground.png)' : 'none';
  }

  getSocialLinks(profile: Profile): ProfileSocialLink[] {
    const socialLinks = this.normalizeSocialLinks(profile.socialLinks);

    if (socialLinks.length) {
      return socialLinks;
    }

    return this.normalizeSocialLinks([
      { network: 'instagram', label: 'Instagram', value: profile.instagram },
      { network: 'facebook', label: 'Facebook', value: profile.facebook },
      { network: 'linkedin', label: 'LinkedIn', value: profile.linkedin },
      { network: 'github', label: 'GitHub', value: profile.github },
    ]);
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
      case 'buymeacoffee':
        return value.includes('buymeacoffee.com') ? `https://${value}` : `https://www.buymeacoffee.com/${value.replace(/^@/, '')}`;
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
      buymeacoffee: './assets/images/buy-me-a-coffee.svg',
      email: './assets/images/email.png',
      whatsapp: './assets/images/smartphone.png',
      site: './assets/images/pagespeed.png',
      youtube: './assets/images/portfolio.png',
      x: './assets/images/portfolio.png',
    };

    return icons[network] ?? './assets/images/portfolio.png';
  }

  private normalizeSocialLinks(value: unknown): ProfileSocialLink[] {
    return this.toSocialLinkItems(value)
      .map((item) => this.normalizeSocialLink(item))
      .filter((link): link is ProfileSocialLink => link !== null);
  }

  private toSocialLinkItems(value: unknown): unknown[] {
    if (Array.isArray(value)) {
      return value;
    }

    const record = this.asRecord(value);

    if (!record) {
      return [];
    }

    return this.isSocialLinkRecord(record) ? [record] : Object.values(record);
  }

  private normalizeSocialLink(value: unknown): ProfileSocialLink | null {
    const record = this.asRecord(value);

    if (!record) {
      return null;
    }

    const rawValue = this.getStringField(record, ['value', 'url', 'link', 'href', 'usuario', 'user', 'username']);

    if (!rawValue) {
      return null;
    }

    const rawNetwork = this.getStringField(record, ['network', 'rede', 'tipo', 'type']);
    const rawLabel = this.getStringField(record, ['label', 'nome', 'name', 'titulo', 'title']);
    const network = this.normalizeNetwork(rawNetwork || rawLabel || this.inferNetworkFromValue(rawValue));
    const label = rawLabel || this.defaultSocialLabels[network] || network;

    return {
      network,
      label,
      value: rawValue,
    };
  }

  private asRecord(value: unknown): SocialLinkRecord | null {
    return value && typeof value === 'object' ? value as SocialLinkRecord : null;
  }

  private isSocialLinkRecord(record: SocialLinkRecord): boolean {
    return [
      'network',
      'rede',
      'tipo',
      'type',
      'value',
      'url',
      'link',
      'href',
      'usuario',
      'user',
      'username',
    ].some((key) => key in record);
  }

  private getStringField(record: SocialLinkRecord, keys: string[]): string {
    for (const key of keys) {
      const value = record[key];

      if (typeof value === 'string' || typeof value === 'number') {
        const normalizedValue = String(value).trim();

        if (normalizedValue) {
          return normalizedValue;
        }
      }
    }

    return '';
  }

  private normalizeNetwork(value: string): string {
    const normalized = value
      .trim()
      .toLowerCase()
      .replace(/^@/, '')
      .replace(/\s+/g, '');

    const aliases: Record<string, string> = {
      twitter: 'x',
      'x/twitter': 'x',
      'x-twitter': 'x',
      website: 'site',
      web: 'site',
      email: 'email',
      'e-mail': 'email',
      mail: 'email',
      whats: 'whatsapp',
      whatsapp: 'whatsapp',
      bmc: 'buymeacoffee',
      buymeacoffee: 'buymeacoffee',
      'buymeacoffee.com': 'buymeacoffee',
    };

    return aliases[normalized] || normalized || 'site';
  }

  private inferNetworkFromValue(value: string): string {
    const normalized = value.toLowerCase();

    if (normalized.includes('instagram.com')) {
      return 'instagram';
    }

    if (normalized.includes('facebook.com')) {
      return 'facebook';
    }

    if (normalized.includes('linkedin.com')) {
      return 'linkedin';
    }

    if (normalized.includes('github.com')) {
      return 'github';
    }

    if (normalized.includes('buymeacoffee.com')) {
      return 'buymeacoffee';
    }

    if (normalized.includes('youtube.com') || normalized.includes('youtu.be')) {
      return 'youtube';
    }

    if (normalized.includes('twitter.com') || normalized.includes('x.com')) {
      return 'x';
    }

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'email';
    }

    return 'site';
  }
}

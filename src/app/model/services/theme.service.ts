import { Injectable } from '@angular/core';
import { SiteTheme } from './interfaces/site-theme';

export const DEFAULT_SITE_THEME: SiteTheme = {
  name: 'Padrao',
  pageBackgroundStart: '#4d4f52',
  pageBackgroundMiddle: '#505050',
  pageBackgroundEnd: '#9a9da1',
  adminBackground: '#f4f6f8',
  sidebarBackground: '#151a21',
  sidebarText: '#f7fafc',
  primary: '#2e86dd',
  primaryStrong: '#1f6fbc',
  secondary: '#1d7a58',
  success: '#15905d',
  warning: '#aa6b00',
  danger: '#ad3542',
  surface: '#ffffff',
  surfaceSoft: '#f8fafc',
  text: '#1f2933',
  textSoft: '#405066',
  muted: '#718096',
  border: '#dce3ea',
  projectTitle: '#e2e2e2',
};

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly defaultTheme = DEFAULT_SITE_THEME;

  applyTheme(theme?: Partial<SiteTheme> | null): void {
    if (typeof document === 'undefined') {
      return;
    }

    const merged = this.mergeWithDefault(theme);
    const root = document.documentElement;

    Object.entries({
      '--site-bg-start': merged.pageBackgroundStart,
      '--site-bg-middle': merged.pageBackgroundMiddle,
      '--site-bg-end': merged.pageBackgroundEnd,
      '--admin-bg': merged.adminBackground,
      '--admin-sidebar-bg': merged.sidebarBackground,
      '--admin-sidebar-text': merged.sidebarText,
      '--color-primary': merged.primary,
      '--color-primary-strong': merged.primaryStrong,
      '--color-secondary': merged.secondary,
      '--color-success': merged.success,
      '--color-warning': merged.warning,
      '--color-danger': merged.danger,
      '--color-surface': merged.surface,
      '--color-surface-soft': merged.surfaceSoft,
      '--color-text': merged.text,
      '--color-text-soft': merged.textSoft,
      '--color-muted': merged.muted,
      '--color-border': merged.border,
      '--project-title-color': merged.projectTitle,
      '--color-primary-soft': this.withAlpha(merged.primary, 0.12),
      '--color-primary-hover': this.withAlpha(merged.primary, 0.18),
      '--color-primary-focus': this.withAlpha(merged.primary, 0.28),
      '--color-secondary-soft': this.withAlpha(merged.secondary, 0.12),
      '--color-success-soft': this.withAlpha(merged.success, 0.12),
      '--color-warning-soft': this.withAlpha(merged.warning, 0.14),
      '--color-danger-soft': this.withAlpha(merged.danger, 0.12),
    }).forEach(([property, value]) => root.style.setProperty(property, value));
  }

  mergeWithDefault(theme?: Partial<SiteTheme> | null): SiteTheme {
    return {
      ...this.defaultTheme,
      ...(theme ?? {}),
    };
  }

  private withAlpha(hex: string, alpha: number): string {
    const normalized = hex.replace('#', '');

    if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
      return hex;
    }

    const red = parseInt(normalized.slice(0, 2), 16);
    const green = parseInt(normalized.slice(2, 4), 16);
    const blue = parseInt(normalized.slice(4, 6), 16);

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }
}

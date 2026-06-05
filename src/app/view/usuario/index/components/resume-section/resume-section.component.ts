import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Chip } from 'src/app/model/services/interfaces/chip';
import { Resumo } from 'src/app/model/services/interfaces/resumo';
import { ResumoL } from 'src/app/model/services/interfaces/resumoL';
import { ResumoR } from 'src/app/model/services/interfaces/resumoR';
import { SkillBar } from '../../models/portfolio.models';

@Component({
  selector: 'app-resume-section',
  templateUrl: './resume-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [':host { display: contents; }'],
})
export class ResumeSectionComponent {
  @Input() resumo: Resumo[] = [];
  @Input() resumol: ResumoL[] = [];
  @Input() resumor: ResumoR[] = [];
  @Input() chipArray: Chip[] = [];
  @Input() skillBars: SkillBar[] = [];

  getEducationMeta(item: ResumoL): string[] {
    return [item.organizationl, item.locationl, item.levell].filter(Boolean);
  }

  getExperienceMeta(item: ResumoR): string[] {
    return [item.companyr, item.locationr, item.roler].filter(Boolean);
  }

  getTags(tags?: string[] | string): string[] {
    if (Array.isArray(tags)) {
      return tags.filter(Boolean);
    }

    if (!tags) {
      return [];
    }

    return tags
      .split(/\r?\n|,/)
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
}

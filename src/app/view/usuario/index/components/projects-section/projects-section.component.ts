import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { Projeto } from 'src/app/model/services/interfaces/projeto';
import { Projetos } from 'src/app/model/services/interfaces/projetos';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [':host { display: contents; }'],
})
export class ProjectsSectionComponent {
  @Input() projeto: Projeto[] = [];
  @Input() projetos: Projetos[] = [];

  selectedProject: Projetos | null = null;

  get title(): string {
    return this.projeto[0]?.titleProjeto ?? 'Projetos';
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.closeProject();
  }

  openProject(project: Projetos): void {
    this.selectedProject = project;
  }

  closeProject(): void {
    this.selectedProject = null;
  }

  getProjectLink(project: Projetos): string | null {
    return project.inProgress && project.link ? project.link : null;
  }

  getPrimaryActionLabel(project: Projetos): string {
    return project.ctaLabel || 'Abrir projeto';
  }

  getProjectSummary(project: Projetos): string {
    return project.subtitulo || project.descricao || 'Detalhes do projeto disponiveis no portfolio.';
  }

  getProjectGallery(project: Projetos): string[] {
    const images = [project.projectImg, ...this.getList(project.galeria)]
      .map((image) => String(image || '').trim())
      .filter(Boolean);

    return [...new Set(images)];
  }

  getList(value?: string[] | string): string[] {
    if (Array.isArray(value)) {
      return value
        .map((item) => String(item).trim())
        .filter(Boolean);
    }

    if (!value) {
      return [];
    }

    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  hasProjectMeta(project: Projetos): boolean {
    return Boolean(project.tipo || project.periodo || project.funcao || project.cliente);
  }
}

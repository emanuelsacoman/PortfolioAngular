import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Projeto } from 'src/app/model/services/interfaces/projeto';
import { Projetos } from 'src/app/model/services/interfaces/projetos';
import { resolveTechnologyIcon } from 'src/app/model/shared/technology-catalog';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [':host { display: contents; }'],
})
export class ProjectsSectionComponent {
  @Input() projeto: Projeto[] = [];
  @Input() projetos: Projetos[] = [];

  @Output() projectClicked = new EventEmitter<Projetos>();

  selectedProject: Projetos | null = null;
  selectedProjectClickCount = 0;
  private projectRowsSource: Projetos[] | null = null;
  private cachedProjectRows: Projetos[][] = [];

  get title(): string {
    return this.projeto[0]?.titleProjeto ?? 'Projetos';
  }

  get projectRows(): Projetos[][] {
    if (this.projectRowsSource === this.projetos) {
      return this.cachedProjectRows;
    }

    this.projectRowsSource = this.projetos;
    this.cachedProjectRows = [];

    for (let index = 0; index < this.projetos.length; index += 2) {
      this.cachedProjectRows.push(this.projetos.slice(index, index + 2));
    }

    return this.cachedProjectRows;
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.closeProject();
  }

  openProject(project: Projetos): void {
    this.selectedProject = project;
    this.selectedProjectClickCount = this.getProjectClickCount(project) + 1;
    this.projectClicked.emit(project);
  }

  closeProject(): void {
    this.selectedProject = null;
    this.selectedProjectClickCount = 0;
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

  shouldShowDescription(project: Projetos): boolean {
    const description = String(project.descricao || '').trim();

    return Boolean(description && description !== this.getProjectSummary(project));
  }

  getProjectGallery(project: Projetos): string[] {
    const images = [project.projectImg, ...this.getList(project.galeria)]
      .map((image) => String(image || '').trim())
      .filter(Boolean);

    return [...new Set(images)];
  }

  getProjectTechnologyIcon(project: Projetos): string {
    return resolveTechnologyIcon(project.technologyIconId, project.badge);
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

  getProjectClickCount(project: Projetos): number {
    return Number(project.clickCount) || 0;
  }

  getProjectClickLabel(count: number): string {
    return count === 1 ? '1 clique' : `${count} cliques`;
  }

  trackProjectRow(index: number, row: Projetos[]): string {
    return row[0]?.id || String(index);
  }

  trackProject(index: number, project: Projetos): string {
    return project.id || String(index);
  }
}

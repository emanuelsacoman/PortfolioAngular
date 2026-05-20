import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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

  get title(): string {
    return this.projeto[0]?.titleProjeto ?? 'Projetos';
  }

  getProjectLink(project: Projetos): string | null {
    return project.inProgress ? project.link : null;
  }

  preventUnavailableProject(event: MouseEvent, project: Projetos): void {
    if (!project.inProgress) {
      event.preventDefault();
    }
  }
}

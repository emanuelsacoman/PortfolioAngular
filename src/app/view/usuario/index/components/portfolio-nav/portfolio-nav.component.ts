import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Contato } from 'src/app/model/services/interfaces/contato';
import { Projeto } from 'src/app/model/services/interfaces/projeto';
import { Resumo } from 'src/app/model/services/interfaces/resumo';
import { Sobre } from 'src/app/model/services/interfaces/sobre';
import { AdminNavigationData, PortfolioSection } from '../../models/portfolio.models';

@Component({
  selector: 'app-portfolio-nav',
  templateUrl: './portfolio-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [':host { display: contents; }'],
})
export class PortfolioNavComponent {
  @Input() selectedSection: PortfolioSection = 'sobre';
  @Input() sobre: Sobre[] = [];
  @Input() resumo: Resumo[] = [];
  @Input() projeto: Projeto[] = [];
  @Input() contato: Contato[] = [];
  @Input() responsive = false;
  @Input() isLoggedIn = false;
  @Input() adminData: AdminNavigationData | null = null;

  @Output() sectionSelected = new EventEmitter<PortfolioSection>();
  @Output() adminSelected = new EventEmitter<AdminNavigationData>();

  get aboutLabel(): string {
    return this.sobre[0]?.title ?? 'Sobre';
  }

  get resumeLabel(): string {
    return this.resumo[0]?.titleArea ?? 'Resumo';
  }

  get projectsLabel(): string {
    return this.projeto[0]?.titleProjeto ?? 'Projetos';
  }

  get contactLabel(): string {
    return this.contato[0]?.titleContato ?? 'Contato';
  }

  select(section: PortfolioSection): void {
    this.sectionSelected.emit(section);
  }

  selectAdmin(): void {
    if (this.adminData) {
      this.adminSelected.emit(this.adminData);
    }
  }

  isSelected(section: PortfolioSection): boolean {
    return this.selectedSection === section;
  }
}

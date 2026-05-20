import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-portfolio-footer',
  templateUrl: './portfolio-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [':host { display: contents; }'],
})
export class PortfolioFooterComponent {
  @Input() year!: number;
  @Input() ownerName = '';
}

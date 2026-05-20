import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Slider } from 'src/app/model/services/interfaces/slider';
import { Sobre } from 'src/app/model/services/interfaces/sobre';
import { Sobrearea } from 'src/app/model/services/interfaces/sobrearea';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [':host { display: contents; }'],
})
export class AboutSectionComponent {
  @Input() sobre: Sobre[] = [];
  @Input() sobrearea: Sobrearea[] = [];
  @Input() slider: Slider[] = [];
}

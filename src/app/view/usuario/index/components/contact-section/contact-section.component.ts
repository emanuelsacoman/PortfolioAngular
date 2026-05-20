import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Contato } from 'src/app/model/services/interfaces/contato';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [':host { display: contents; }'],
})
export class ContactSectionComponent {
  @Input() contato: Contato[] = [];
  @Input() contactForm!: FormGroup;
  @Input() mensagemEnviada = false;

  @Output() formSubmitted = new EventEmitter<void>();

  get title(): string {
    return this.contato[0]?.titleContato ?? 'Contato';
  }

  isInvalidControl(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return Boolean(control && control.invalid && (control.dirty || control.touched));
  }
}

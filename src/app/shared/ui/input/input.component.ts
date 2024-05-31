import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'w-input',
  templateUrl: 'input.component.html',
  styleUrl: 'input.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, {skipSelf: true})
  }],
})
export class WInput implements OnInit {
  @Input({ required: true}) controlKey: string = '';
  @Input() label: string = '';
  @Input() inputType: string = '';
  @Input() error: string = '';
  @Input() pattern: string = '';
  @Input() required: boolean = false;
  @Input() minLength?: number;
  @Input() maxLength?: number;

  @Input() placeholder?: string = '';
  @Input() patternDate?: string = '';
  @Output() digitInput = new EventEmitter<any>();


  parentContainer = inject(ControlContainer);

  get parentFormGroup(){
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(this.controlKey, new FormControl('', this.getValidators()));
  }

  private getValidators(): ValidatorFn | ValidatorFn[] | null{
    const validators: ValidatorFn[] = [];

    if(this.required) {
      validators.push(Validators.required);
    }
    if(this.inputType == "email"){
      validators.push(Validators.email);
    }
    if(this.pattern){
      validators.push(Validators.pattern(this.pattern));
    }
    if (this.minLength) {
      validators.push(Validators.minLength(this.minLength));
    }
    if (this.maxLength) {
      validators.push(Validators.maxLength(this.maxLength));
    }

    return validators.length > 0 ? validators : null;
  }

  onDigitInput(event: any) {
    const value = event.target.value;
    let next = event.target.nextElementSibling;
    const keyCode = event.key;
    const currentValue = event.target.value;
    if ((!/^[0-9]$/.test(keyCode)) || currentValue.length >= 1) {
      event.preventDefault();
      return;
    }

    this.digitInput.emit({ event });

  }

}

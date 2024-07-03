import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-input-component',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  standalone: true
})
export class InputComponent {
  @Input() label: string = '';
  @Input() labelPlacement: 'floating' | 'fixed' | 'stacked' = 'floating';
  @Input() counter: boolean = true;
  @Input() maxlength: number = 20;
  @Input() value: string = '';
  @Input() typeInput: string = '';
  @Input() helperText: string = '';
  @Input() errorText: string = '';
  @Input() regexPattern: string ='';
  @Input() colorText: string = '';
  @Input() fill: 'solid' | 'outline' = 'outline';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  isError : Boolean = false;

  onChange(value: string) {
    this.valueChange.emit(value);
  }
}
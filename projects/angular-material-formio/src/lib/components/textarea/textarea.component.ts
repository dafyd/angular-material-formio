import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import TextAreaComponent from 'formiojs/components/textarea/TextArea.js';
import _ from 'lodash';

@Component({
  selector: 'mat-formio-textarea',
  template: `
    <mat-form-field class="mat-formio-textarea" [ngClass]="{'editor-enabled': !!instance.component.editor}" fxFill>
      <mat-label fxFill>{{ instance.component.label }}</mat-label>
      <textarea matInput
          [required]="instance.component.validate?.required"
          [placeholder]="instance.component.placeholder"
          [formControl]="control"
          [rows]="(instance.component.rows || 3)"
          (input)="onChange()" #textarea>
      </textarea>
      <mat-icon *ngIf="instance.component.tooltip" matSuffix matTooltip="{{ instance.component.tooltip }}">info</mat-icon>
      <mat-hint *ngIf="instance.component.description">{{ instance.component.description }}</mat-hint>
      <mat-error *ngIf="instance.error">{{ instance.error.message }}</mat-error>
    </mat-form-field>
  `
})
export class MaterialTextareaComponent extends MaterialComponent implements AfterViewInit {
  @ViewChild('textarea', {static: true}) textarea: ElementRef;
  ngAfterViewInit() {
    // Attach the element so the wysiwyg will work.
    this.instance.attachElement(this.textarea.nativeElement);
  }

  getValue() {
    return _.isNil(this.control.value) ? '' : this.control.value;
  }
}
TextAreaComponent.MaterialComponent = MaterialTextareaComponent;
export { TextAreaComponent };

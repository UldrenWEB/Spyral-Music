import {ChangeDetectionStrategy, Component, Input, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
    selector: 'app-dialog',
    templateUrl: 'dialog.component.html',
    standalone: true,
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
    ],
  })
export class DialogComponent {

    readonly dialogRef = inject(MatDialogRef<DialogComponent>);
    readonly data = inject<DialogData>(MAT_DIALOG_DATA);
    readonly playlist = model(this.data.playlist);
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }

interface DialogData {
    playlist: string;
    name: string;
    question: string;
}
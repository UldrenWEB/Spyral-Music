import { Component, ChangeDetectionStrategy, inject, model, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog-component/dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesPage {

  constructor() {}

  readonly playlist = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {name: this.name(), playlist: this.playlist()},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.playlist.set(result);
      }
      this.playlist.set('');
    });
  }

}

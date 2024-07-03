import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";


@Component({
    selector: 'app-message-bar',
    templateUrl: 'message-bar.component.html',
    styleUrls: ['message-bar.component.scss'],
    imports: [CommonModule],
    standalone: true
})
export class MessageBarComponent {
    @Input() alertMessage: string = '';
    private _showAlert: boolean = false;
    visible: boolean = false;

    @Input()
    set showAlert(value: boolean) {
        this._showAlert = value;
        this.visible = value;
        if (value) {
            setTimeout(() => this.visible = false, 3000);
        }
    }

    get showAlert(): boolean {
        return this._showAlert;
    }

    @Input() alertCode: number = 0;
} 
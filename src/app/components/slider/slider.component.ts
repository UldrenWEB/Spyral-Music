import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import {register} from 'swiper/element/bundle';


register();

@Component({
    selector: 'app-slider',
    templateUrl: 'slider.component.html',
    styleUrls: ['slider.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SliderComponent{

}
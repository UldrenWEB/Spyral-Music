import { Injectable } from "@angular/core";
import { MessageBarComponent } from "../components/message-bar/message-bar.component";
import { LoaderService } from "./LoaderService";
import { EndPoints, RequestMethod } from "../types";
import { AuthStorageService } from "./AuthStorage";
import { base_url } from "../constants/URL";
import endpoints  from '../config/endpoints.json'

@Injectable({
    providedIn: 'root'
})
export class CallService {
    constructor(private loaderService: LoaderService, private authStorageService: AuthStorageService){}

    call =  async ({method, body = null, isToken = false, endPoint} : {method: RequestMethod, body: Object | null, isToken : Boolean, endPoint: EndPoints }) => {
        this.loaderService.show();

        try {
            // Aquí iría tu lógica de fetch real, por ejemplo:
            const token = isToken ? await this.authStorageService.getToken() : null;
            const auth = { Authorization: `Bearer ${token}` };
            const response = await fetch(`${base_url}${endpoints[endPoint]}`, {
                method: method.toUpperCase(),
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && auth)
                },
                body: body ? JSON.stringify(body) : null
            });

            const result = await response.json();

            console.log(`Aqui resultado del fetch ->${result}`)
            return result;

        } catch (error) {

            console.error('Error en la llamada a la API', error);
            return {message: {description: 'Hubo un error al hacer fetch', code: 1}}
        
        } finally {
            this.loaderService.hide();
        }
    }
}

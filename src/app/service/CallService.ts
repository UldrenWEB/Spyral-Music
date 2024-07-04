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

    call = async ({ method, body = null, isToken = false, endPoint } : { method: RequestMethod, body: Object | null , isToken: Boolean, endPoint: EndPoints}) => {
        this.loaderService.show();
    
        try {
            const token = isToken ? await this.authStorageService.getToken() : null;
            const auth = { Authorization: `Bearer ${token}` };
    
            let url = `${base_url}${endpoints[endPoint]}`;
            if (method.toUpperCase() === 'GET' && body && Object.keys(body).length > 0) {
                console.log('Entro aqui')
                const queryParams = Object.entries(body)
                    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                    .join('&');
                url = `${url}${queryParams}`;
            }
            console.log(url)
            const fetchOptions: RequestInit = {
                method: method.toUpperCase(),
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && auth)
                }
            };
    
            if (method.toUpperCase() !== 'GET' && body) {
                fetchOptions.body = JSON.stringify(body);
            }
    
            const response = await fetch(url, fetchOptions);
    
            const result = await response.json();
            console.log(`Resultado del fetch ->`, result);
            return result;
    
        } catch (error) {
            console.error('Error en la llamada a la API', error);
            return { message: { description: 'Hubo un error al hacer fetch', code: 1 } };
    
        } finally {
            this.loaderService.hide();
        }
    };
}

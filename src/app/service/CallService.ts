import { Injectable } from "@angular/core";
import { MessageBarComponent } from "../components/message-bar/message-bar.component";
import { LoaderService } from "./LoaderService";
import { EndPoints, RequestMethod } from "../types";

import { base_url } from "../constants/URL";
import endpoints  from '../config/endpoints.json'
import { StorageService } from "./StorageService";

@Injectable({
    providedIn: 'root'
})
export class CallService {
    constructor(private loaderService: LoaderService, private storageService: StorageService){}

    call = async ({ method, body = null, isToken = false, endPoint, id = null } : { method: RequestMethod, body: object | null  , isToken: Boolean, endPoint: EndPoints, id?: string | null}) => {
        this.loaderService.show();
    
        try {
            const token = isToken ? await this.storageService.get('token') : null;
            const auth = { Authorization: `Bearer ${token}` };
    
            let url;
            if(endPoint === 'songById') {
                url = `${base_url}${endpoints[endPoint]}${id}`;
            }else{
                url = `${base_url}${endpoints[endPoint]}`;
            }
            if (method.toUpperCase() === 'GET' && body && Object.keys(body).length > 0) {
                console.log('Entro aqui')
                const queryParams = Object.entries(body)
                    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                    .join('&');
                url = `${url}${queryParams}`;
            }

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
            return result;
            
        } catch (error) {
            console.error('Error en la llamada a la API', error);
            return { message: { description: 'Hubo un error al hacer fetch', code: 1 } };
    
        } finally {
            this.loaderService.hide();
        }
    };

    callToFormData = async ({formData, endPoint}:{formData: FormData, endPoint: EndPoints}) : Promise<any> => {
        this.loaderService.show();
        try{    
            const token = await this.storageService.get('token')
            console.log(`Aqui el token ${token}`);
            const url = `${base_url}${endpoints[endPoint]}`;

            const fetchOptions: RequestInit = {
                method: 'POST',
                headers: {
                    ...(token ? {Authorization: `Bearer ${token}`} : {} )
                },
                body: formData
            };
            const response = await fetch(url, fetchOptions);
            const result = await response.json();
            return result;
        }catch(error : any){
            console.log('Error al enviar formData', error.message);
            return {message: {description: 'Hubo un error al enviar el formdata', code: 1}}
        } finally {
            this.loaderService.hide();
        }
    }
}

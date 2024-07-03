import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private userRole: number = 2;


    getUserRole(): number {
      return this.userRole;
    }

    setUserRole(userRole: number): void{
        this.userRole = userRole;
    }
}
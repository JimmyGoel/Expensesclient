import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  /**
   *
   */
  
  constructor(private service: AuthService, private router: Router) {
  }
  canActivate() {
    debugger;
    const token = localStorage.getItem("token_Value");
    const exptDate = new Date(localStorage.getItem("exptDate"));
    const currentDate=new Date();
    
    if (this.service.getisAuthicated && exptDate >=currentDate) {
      return true;
    }
    // else {
    //   this.router.navigate(['/user-login']);
    //   return false;
    // }
debugger;
    const isRefreshSuccess = this.refreshingTokens(token);
    if (!isRefreshSuccess) {
      this.router.navigate(["/user-login"]);
    }

    return isRefreshSuccess;


  }
  private async refreshingTokens(token: string | null): Promise<boolean> {
    const refreshToken: string | null = localStorage.getItem("Saverefreshtokene");
debugger;
    if (!token && !refreshToken) {
      return false;
    }
  const  tokenRefreshVM ={ 
      Token: localStorage.getItem('token_Value'),
      RefreshToke: localStorage.getItem('Saverefreshtokene')
  }
    // const tokenModel = JSON.stringify({ accessToken: token, refreshToken: refreshToken });

    let isRefreshSuccess: boolean;
    try {

     this.service.refreshtoken(tokenRefreshVM).subscribe((data:any)=>{
      debugger;
      const newToken = (<any>data).token;
      const newRefreshToken = (<any>data).refreshtoken;

      localStorage.removeItem("token_Value");
      localStorage.removeItem("Saverefreshtokene");
      
      localStorage.setItem("token_Value", newToken);
      localStorage.setItem("Saverefreshtokene", newRefreshToken);
      //this.notification.showSuccess("Token renewed successfully", "Success")
      isRefreshSuccess = true;

     })
      
    }
    catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }
}

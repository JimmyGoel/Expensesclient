import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './auth/guard.guard';
import { DeleteEntryComponent } from './delete-entry/delete-entry.component';

//component
import { EntriesComponent } from './entries/entries.component';
import { LoginComponent } from './login/login.component';
import {NewEntryComponent} from './new-entry/new-entry.component';
import { RegisterComponent } from './register/register.component';
//routes

const routes:Routes=[
    {path:'',component:LoginComponent},
    {path:'entries',component:EntriesComponent,canActivate:[GuardGuard]},
    {path:'new-entry',component:NewEntryComponent,canActivate:[GuardGuard]},
    {path:'delete-entry/:id',component:DeleteEntryComponent,canActivate:[GuardGuard]},
    {path:'user-register',component:RegisterComponent},
    {path:'user-login',component:LoginComponent},
]
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRouterModule{
    
}
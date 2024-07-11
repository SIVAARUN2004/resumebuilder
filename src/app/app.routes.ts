import { Routes } from '@angular/router';
import { Home1Component } from './home1/home1.component';
import { Home2Component } from './home2/home2.component';
import { Home3Component } from './home3/home3.component';
import { LoginComponent } from './login/login.component';
import { ResumePreviewComponent } from './resume-preview/resume-preview.component';
import { RregisterComponent } from './rregister/rregister.component';
import { UregisterComponent } from './uregister/uregister.component';
import { ResumeFormComponent } from './resume-form/resume-form.component';

export const routes: Routes = [
    {path:'',redirectTo:'/home' ,pathMatch:'full'},
    { path: 'home', component: Home1Component },
    { path: 'login', component: LoginComponent },
    { path: 'user-register', component: UregisterComponent },
    { path: 'rec-register', component: RregisterComponent },
    { path: 'resume-prev', component: ResumePreviewComponent },
    { path: 'user-home', component: Home2Component },
    { path: 'rec-home', component: Home3Component },
    { path: 'res-form', component: ResumeFormComponent },
    { path: 'res-preview', component: ResumePreviewComponent },
];

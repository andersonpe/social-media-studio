import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { ImageEditorComponent } from '../pages/editor/editor.component';
import { LinkedInComponent } from '../pages/linkedin/linkedin.component';

export const routes: Routes = [
    { 
        path: '', 
        component: HomeComponent, 
        pathMatch: 'full' 
    }, 
    { 
        path: 'dashboard', 
        component: ImageEditorComponent
    },
    {
        path: 'sites/linkedin', 
        component: LinkedInComponent
    }
];

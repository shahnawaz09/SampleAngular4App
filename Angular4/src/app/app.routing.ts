import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { ExportComponent } from './components/export/export.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { ImageListComponent } from './components/image-list/image-list.component';

const appRoutes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'trainings', component: TrainingsComponent },
    { path: 'analytics', component: AnalyticsComponent },
    { path: 'export', component: ExportComponent },
    { path: 'addEmployee', component: AddEmployeeComponent },
     {path: 'searchImages', component: ImageListComponent}
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


import {IssueComponent} from './components/issue/issue.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ModulosComponent} from './components/modulos/modulos.component';
import {ScriptsComponent} from './components/scripts/scripts.component';

const routes: Routes = [
    {path: 'issues', component: IssueComponent},
    {path: 'modulos', component: ModulosComponent},
    {path: 'scripts', component: ScriptsComponent},
    {path: '**', redirectTo: '/issues'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetalhesCriancaComponent } from './pages/detalhes-crianca/detalhes-crianca.component';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { VacinacaoService } from './services/vacinacao.service';

// Guarda de Rota (Security Guard)
const authGuard = () => {
    const router = inject(Router);
    const service = inject(VacinacaoService);
    if (service.isLogado()) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
};

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'detalhes/:id', component: DetalhesCriancaComponent, canActivate: [authGuard] }
];
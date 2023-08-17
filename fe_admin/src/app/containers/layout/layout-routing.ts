import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from '../guards/role.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'center-management',
        loadChildren: () => import('../../pages/center-management/center-management.module').then((m) => m.SchoolModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'schools',
        loadChildren: () => import('../../pages/organization-management/organizations.module').then((m) => m.OrganizationsModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'centers',
        loadChildren: () => import('../../pages/organization-management/organizations.module').then((m) => m.OrganizationsModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'teaching-plan',
        loadChildren: () => import('../../pages/teaching-plan/teaching-plan.module').then((m) => m.TeachingPlanModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'student-management',
        loadChildren: () => import('../../pages/student-management/student-management.module').then((m) => m.StudentManagementModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'lessons',
        loadChildren: () => import('../../pages/lesson-management/lessons.module').then((m) => m.LessonsModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'programs',
        loadChildren: () => import('../../pages/program-management/programs.module').then((m) => m.ProgramsModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'topics',
        loadChildren: () => import('../../pages/topic-management/topics.module').then((m) => m.TopicsModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'structures',
        loadChildren: () => import('../../pages/structure-management/structure.module').then((m) => m.StructureModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'users',
        loadChildren: () => import('../../pages/user-management/users.module').then((m) => m.UsersModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'games',
        loadChildren: () => import('../../pages/game-studio/games.module').then((m) => m.GameModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'new-management',
        loadChildren: () => import('../../pages/new-management/news.module').then((m) => m.NewsModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'news',
        loadChildren: () => import('../../pages/news/news.module').then((m) => m.NewModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'feedbacks',
        loadChildren: () => import('../../pages/feedbacks/feedbacks.module').then((m) => m.FeedbacksModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'notifications',
        loadChildren: () => import('../../pages/notification-management/notifications.module').then((m) => m.NotificationsModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'send-feedback',
        loadChildren: () => import('../../pages/send-fb/send-fb.module').then((m) => m.SendFBModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'request-support-list',
        loadChildren: () => import('../../pages/request-support/request-support.module').then((m) => m.RequestSupportModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'request-support',
        loadChildren: () => import('../../pages/send-rs/send-rs.module').then((m) => m.SendRSModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'document-library',
        loadChildren: () => import('../../pages/document-library/document-library.module').then((m) => m.DocumentLibraryModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'statistical',
        loadChildren: () => import('../../pages/statistical/statistical.module').then((m) => m.StatisticalModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'students',
        loadChildren: () => import('../../pages/student-store/student.module').then((m) => m.StudentModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'roles',
        loadChildren: () => import('../../pages/settings/set-role/role.module').then((m) => m.RoleModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'contacts',
        loadChildren: () => import('../../pages/settings/contacts/contact.module').then((m) => m.ContactModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'permissions',
        loadChildren: () => import('../../pages/settings/permissions/permission.module').then((m) => m.PermissionModule),
        canActivate: [RoleGuard],
      },
      {
        path: '',
        loadChildren: () => import('../../pages/index/index.module').then((m) => m.IndexModule),
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }

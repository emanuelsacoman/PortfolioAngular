import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { PortfolioFooterComponent } from './components/portfolio-footer/portfolio-footer.component';
import { PortfolioNavComponent } from './components/portfolio-nav/portfolio-nav.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';
import { ResumeSectionComponent } from './components/resume-section/resume-section.component';
import { IndexComponent } from './index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
];

@NgModule({
  declarations: [
    IndexComponent,
    LoadingScreenComponent,
    ProfileCardComponent,
    PortfolioNavComponent,
    AboutSectionComponent,
    ResumeSectionComponent,
    ProjectsSectionComponent,
    ContactSectionComponent,
    PortfolioFooterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class IndexModule {}

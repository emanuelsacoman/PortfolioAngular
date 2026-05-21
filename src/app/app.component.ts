import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FirebaseService } from './model/services/firebase.service';
import { ThemeService } from './model/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Portfolio';

  private readonly destroy$ = new Subject<void>();

  constructor(
    private firebaseService: FirebaseService,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.themeService.applyTheme();
    this.firebaseService.obterTemaSite()
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme) => this.themeService.applyTheme(theme));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

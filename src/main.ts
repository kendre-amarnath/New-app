import { bootstrapApplication } from '@angular/platform-browser';
import { SearchComponent } from './app/search/search.component';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

// bootstrapApplication(SearchComponent, appConfig)
//   .catch((err) => console.error(err));


bootstrapApplication(SearchComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations()
  ]
});
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(BrowserAnimationsModule,ToastrModule.forRoot({
  positionClass: 'toast-custom-top-right',
  
})),
  ],
};

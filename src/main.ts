import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Component } from '@angular/core';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  // bootstrapApplication(AppComponent, appConfig, {
  //   providers: [provideAnimationsAsync()],
  //   }).catch((err) => console.error(err));

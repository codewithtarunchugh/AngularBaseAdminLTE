import { Component, OnInit } from '@angular/core';
import { LoadingService } from './core/services/loading/loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'partnerAPP';
  constructor(public loadingService: LoadingService) {}

  ngOnInit(): void {
    this.initializeColorModeToggler();
  }

  private initializeColorModeToggler() {
    (() => {
      'use strict';
      const storedTheme = localStorage.getItem('theme');

      const getPreferredTheme = () => {
        if (storedTheme) {
          return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
      };

      const setTheme = (theme: string) => {
        if (
          theme === 'auto' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
          document.documentElement.setAttribute('data-bs-theme', 'dark');
        } else {
          document.documentElement.setAttribute('data-bs-theme', theme);
        }
      };

      setTheme(getPreferredTheme());

      const showActiveTheme = (theme: string, focus = false) => {
        const themeSwitcher = document.querySelector('#bd-theme');
        if (!themeSwitcher) return;

        const themeSwitcherText = document.querySelector('#bd-theme-text');
        const activeThemeIcon = document.querySelector('.theme-icon-active i');
        const btnToActive = document.querySelector(
          `[data-bs-theme-value="${theme}"]`
        );

        if (!btnToActive || !activeThemeIcon || !themeSwitcherText) return;

        const svgOfActiveBtn =
          btnToActive.querySelector('i')?.getAttribute('class') ?? '';

        for (const element of Array.from(
          document.querySelectorAll('[data-bs-theme-value]')
        )) {
          element.classList.remove('active');
          element.setAttribute('aria-pressed', 'false');
        }

        btnToActive.classList.add('active');
        btnToActive.setAttribute('aria-pressed', 'true');
        activeThemeIcon.setAttribute('class', svgOfActiveBtn);
        const themeSwitcherLabel = `${
          themeSwitcherText.textContent
        } (${btnToActive.getAttribute('data-bs-theme-value')})`;
        themeSwitcher.setAttribute('aria-label', themeSwitcherLabel);

        if (focus && themeSwitcher instanceof HTMLElement)
          themeSwitcher.focus();
      };

      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => {
          if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme());
          }
        });

      window.addEventListener('DOMContentLoaded', () => {
        showActiveTheme(getPreferredTheme());

        const toggles = Array.from(
          document.querySelectorAll('[data-bs-theme-value]')
        );
        for (const toggle of toggles) {
          toggle.addEventListener('click', () => {
            const theme = toggle.getAttribute('data-bs-theme-value');
            if (theme) {
              localStorage.setItem('theme', theme);
              setTheme(theme);
              showActiveTheme(theme, true);
            }
          });
        }
      });
    })();
  }
}

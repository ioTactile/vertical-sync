import { LucideProps } from 'lucide-react';
import { Route } from 'next';
import { ComponentType } from 'react';

export type NavigationItem<T extends string> = {
  title: string;
  url: Route<T> | URL;
  icon?: ComponentType<LucideProps>;
};

export type FooterLink = {
  title: string;
  links: NavigationItem<string>[];
};

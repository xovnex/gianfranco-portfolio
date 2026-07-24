import type { BentoItem } from '../types';

export const bentoItems: BentoItem[] = [
  { id: 'intro', colSpan: 'col-span-2 sm:col-span-2' },
  { id: 'photo', colSpan: 'col-span-1', bgImage: "/profile.png" },
  { id: 'socials', colSpan: 'col-span-1' },
  { id: 'stack', colSpan: 'col-span-2 sm:col-span-2', rowSpan: 'row-span-1', hasArrow: true, onClickModal: 'stack' },
  { id: 'about', colSpan: 'col-span-1', hasArrow: true, onClickModal: 'about' },
  { id: 'experience', colSpan: 'col-span-1' },
  { id: 'projects', colSpan: 'col-span-2 sm:col-span-2', rowSpan: 'row-span-1', hasArrow: true, onClickModal: 'projects' },
  { id: 'education', colSpan: 'col-span-1', hasArrow: true, onClickModal: 'education' },
  { id: 'map', colSpan: 'col-span-1', noPadding: true },
];

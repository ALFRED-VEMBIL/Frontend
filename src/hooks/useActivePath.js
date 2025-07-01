'use client';

import { usePathname } from 'next/navigation';

export function useActivePath(href, exact = true) {
  const pathname = usePathname();
  if (exact) {
    return pathname === href;
  }
  return pathname.startsWith(href);
}

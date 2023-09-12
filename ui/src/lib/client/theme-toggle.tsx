'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Moon, SunMedium } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return 'Loading';
  }

  return (
    <div>
      {theme === 'light' ? (
        <Moon
          className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 cursor-pointer"
          onClick={() => setTheme('dark')}
        />
      ) : (
        <SunMedium
          className=" rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 cursor-pointer"
          onClick={() => setTheme('light')}
        />
      )}
    </div>
  );
}

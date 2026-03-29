'use client';

import type { WebApp } from './types';
import { createContext } from 'react';

export const webAppContext = createContext<WebApp | null>(null);

'use client';
import { useContext } from 'react';
import { webAppContext } from '../context';

export const useWebApp = () => {
  return useContext(webAppContext);
};

export default useWebApp;

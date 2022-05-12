import { toast } from 'react-toastify';

export const toastErrorDark = (message: string) => toast.error(message, { theme: 'dark' });
export const toastWarnDark = (message: string) => toast.warn(message, { theme: 'dark' });
export const toastSuccessDark = (message: string) => toast.success(message, { theme: 'dark' });

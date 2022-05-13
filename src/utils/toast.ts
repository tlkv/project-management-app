import { toast } from 'react-toastify';

export const toastErrorDark = (message: string) => toast.error(message, { theme: 'dark' });
export const toastWarnDark = (message: string) => toast.warn(message, { theme: 'dark' });
export const toastSuccessDark = (message: string) => toast.success(message, { theme: 'dark' });
export const toastInfoDark = (message: string) => toast.info(message, { theme: 'dark' });

export const toastErrorColored = (message: string) => toast.error(message, { theme: 'colored' });
export const toastWarnColored = (message: string) => toast.warn(message, { theme: 'colored' });
export const toastSuccessColored = (message: string) =>
  toast.success(message, { theme: 'colored' });
export const toastInfoColored = (message: string) => toast.info(message, { theme: 'colored' });

export const toastErrorDef = (message: string) => toast.error(message);
export const toastWarnDef = (message: string) => toast.warn(message);
export const toastSuccessDef = (message: string) => toast.success(message);
export const toastInfoDef = (message: string) => toast.info(message);

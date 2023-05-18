export const isProduction = process.env.RUNNING_ENV === 'production';

export const getEnv = () => process.env.RUNNING_ENV || 'local';

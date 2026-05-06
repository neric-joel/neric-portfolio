export const isVercel = Boolean(process.env.VERCEL);
export const runtimeMode = isVercel ? 'cloud' : 'local';

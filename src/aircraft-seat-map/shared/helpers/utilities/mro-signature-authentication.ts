import { environment } from '@app/environments/environment';
import { enc, SHA512 } from 'crypto-js';

/**
 * Get MrOrange API Signature Authorization Header
 */
export const getMROSignatureAuthentication = (): string => {
  const { apiKey, secret } = environment.mrOrange;
  const timestamp = Math.round(new Date().getTime() / 1000);
  const hash = SHA512(apiKey + secret + timestamp).toString(enc.Hex);

  const authHeaderValue = 'MRO APIKey=' + apiKey + ',Signature=' + hash + ',timestamp=' + timestamp;

  return authHeaderValue;
};

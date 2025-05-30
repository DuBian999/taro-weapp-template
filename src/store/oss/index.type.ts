export interface IOssConfig {
  policy: string;
  'x-oss-signature-version': string;
  'x-oss-credential': string;
  'x-oss-date': string;
  'x-oss-signature': string;
  'x-oss-security-token': string;
  success_action_status: string;
  expiration: string;
}

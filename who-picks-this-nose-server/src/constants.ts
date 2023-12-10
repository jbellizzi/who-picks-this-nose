import "dotenv/config";

export const PORT: number = parseInt(process.env.PORT || "4000");
export const SHEET_ID: string = process.env.SHEET_ID || "";
export const CREDENTIAL_TYPE: string = process.env.CREDENTIAL_TYPE || "";
export const CREDENTIAL_PROJECT_ID: string = process.env.CREDENTIAL_PROJECT_ID || "";
export const CREDENTIAL_PRIVATE_KEY_ID: string = process.env.CREDENTIAL_PRIVATE_KEY_ID || "";
export const CREDENTIAL_PRIVATE_KEY: string = process.env.CREDENTIAL_PRIVATE_KEY || "";
export const CREDENTIAL_CLIENT_EMAIL: string = process.env.CREDENTIAL_CLIENT_EMAIL || "";
export const CREDENTIAL_CLIENT_ID: string = process.env.CREDENTIAL_CLIENT_ID || "";
export const CREDENTIAL_AUTH_URI: string = process.env.CREDENTIAL_AUTH_URI || "";
export const CREDENTIAL_TOKEN_URI: string = process.env.CREDENTIAL_TOKEN_URI || "";
export const CREDENTIAL_AUTH_PROVIDER_X509_CERT_URL: string = process.env.CREDENTIAL_AUTH_PROVIDER_X509_CERT_URL || "";
export const CREDENTIAL_CLIENT_X509_CERT_URL: string = process.env.CREDENTIAL_CLIENT_X509_CERT_URL || "";
export const CREDENTIAL_UNIVERSE_DOMAIN: string = process.env.CREDENTIAL_UNIVERSE_DOMAIN || "";

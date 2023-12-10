"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleCredentials = exports.CREDENTIAL_UNIVERSE_DOMAIN = exports.CREDENTIAL_CLIENT_X509_CERT_URL = exports.CREDENTIAL_AUTH_PROVIDER_X509_CERT_URL = exports.CREDENTIAL_TOKEN_URI = exports.CREDENTIAL_AUTH_URI = exports.CREDENTIAL_CLIENT_ID = exports.CREDENTIAL_CLIENT_EMAIL = exports.CREDENTIAL_PRIVATE_KEY = exports.CREDENTIAL_PRIVATE_KEY_ID = exports.CREDENTIAL_PROJECT_ID = exports.CREDENTIAL_TYPE = exports.SHEET_ID = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = parseInt(process.env.PORT || "4000");
exports.SHEET_ID = process.env.SHEET_ID || "";
exports.CREDENTIAL_TYPE = process.env.CREDENTIAL_TYPE || "";
exports.CREDENTIAL_PROJECT_ID = process.env.CREDENTIAL_PROJECT_ID || "";
exports.CREDENTIAL_PRIVATE_KEY_ID = process.env.CREDENTIAL_PRIVATE_KEY_ID || "";
exports.CREDENTIAL_PRIVATE_KEY = process.env.CREDENTIAL_PRIVATE_KEY || "";
exports.CREDENTIAL_CLIENT_EMAIL = process.env.CREDENTIAL_CLIENT_EMAIL || "";
exports.CREDENTIAL_CLIENT_ID = process.env.CREDENTIAL_CLIENT_ID || "";
exports.CREDENTIAL_AUTH_URI = process.env.CREDENTIAL_AUTH_URI || "";
exports.CREDENTIAL_TOKEN_URI = process.env.CREDENTIAL_TOKEN_URI || "";
exports.CREDENTIAL_AUTH_PROVIDER_X509_CERT_URL = process.env.CREDENTIAL_AUTH_PROVIDER_X509_CERT_URL || "";
exports.CREDENTIAL_CLIENT_X509_CERT_URL = process.env.CREDENTIAL_CLIENT_X509_CERT_URL || "";
exports.CREDENTIAL_UNIVERSE_DOMAIN = process.env.CREDENTIAL_UNIVERSE_DOMAIN || "";
exports.googleCredentials = {
    type: exports.CREDENTIAL_TYPE,
    project_id: exports.CREDENTIAL_PROJECT_ID,
    private_key: exports.CREDENTIAL_PRIVATE_KEY,
    client_email: exports.CREDENTIAL_CLIENT_EMAIL,
    client_id: exports.CREDENTIAL_CLIENT_ID,
    universe_domain: exports.CREDENTIAL_UNIVERSE_DOMAIN,
};

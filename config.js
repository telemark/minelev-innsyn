module.exports = {
  // 'common' (multi-tenant gateway) or Azure AD Tenant ID
  tenant: process.env.VUE_APP_TENANT_ID || '<guid>',

  // Application ID
  clientId: process.env.VUE_APP_CLIENT_ID || '<guid>',

  // Host URI
  redirectUri: process.env.VUE_APP_REDIRECT_URL || '<host addr>',

  cacheLocation: 'localStorage'
}

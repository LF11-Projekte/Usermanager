export const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : "very very secret...";
export const LDAP_URLs = process.env.LDAP_URL ? [process.env.LDAP_URL] : ["ldap://10.100.0.171:389"];
//export const LDAP_URLs = process.env.LDAP_URL ? [process.env.LDAP_URL] : ["ldap://127.0.0.1:389"];
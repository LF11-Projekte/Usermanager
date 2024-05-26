# Usermanager

## Umgebungsvariablen

| Variable   | Beschreibung                                                      |
|------------|-------------------------------------------------------------------|
| JWT_SECRET | (Optional) wird für die signierung der JWT-Tokens verwendet.      |
| LDAP_URL   | (Optional) Adresse des LDAP Servers im Format: `ldap://HOST:PORT` |

## SSO

Für jede Anfrage wird ein BearerToken angefordert, außer beim login. Wenn dieser ungültig ist wird ein 401 Statuscode zurückgegeben.

Header implementierung: `headers["authorization] = "Bearer <Token>";`

### API Login

*POST http://localhost:3000/auth/login*

#### Body
```
{
    "username": "test",
    "password": "13v8iG7DmLho",
    "redirect": "http://localhost:8080/token"
}
```

#### Response

wenn redirect ist die URL: `redirect + "?token=" + signedToken`  
wenn kein redirect kommt der Token als String
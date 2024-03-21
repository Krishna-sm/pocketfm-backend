const ojb = {
  id: "115601446809264142776",
  displayName: "Krishna Agrawal",
  name: {
    familyName: "Agrawal",
    givenName: "Krishna",
  },
  emails: [
    {
      value: "kana.sonkh@gmail.com",
      verified: true,
    },
  ],
  photos: [
    {
      value:
        "https://lh3.googleusercontent.com/a/ACg8ocIz6eB6iE_tcejWKj8_NqUXILanQcKTpONfmbtSzsrjx_0=s96-c",
    },
  ],
  provider: "google",
  _raw:
    '{\n  "sub": "115601446809264142776",\n  "name": "Krishna Agrawal",\n  "given_name": "Krishna",\n  "family_name": "Agrawal",\n  "picture": "https://lh3.googleusercontent.com/a/ACg8ocIz6eB6iE_tcejWKj8_NqUXILanQcKTpONfmbtSzsrjx_0\\u003ds96-c",\n  "email": "kana.sonkh@gmail.com",\n  "email_verified": true,\n  "locale": "en"\n}',
  _json: {
    sub: "115601446809264142776",
    name: "Krishna Agrawal",
    given_name: "Krishna",
    family_name: "Agrawal",
    picture:
      "https://lh3.googleusercontent.com/a/ACg8ocIz6eB6iE_tcejWKj8_NqUXILanQcKTpONfmbtSzsrjx_0=s96-c",
    email: "kana.sonkh@gmail.com",
    email_verified: true,
    locale: "en",
  },
};


console.log(ojb._json.email);
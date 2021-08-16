<p align="center">
   <br/>
   <a href="https://blueauth.io" target="_blank"><img width="150px" src="https://cdn.kacdn.org/file/kacdn1/blueauth/logo.png" /></a>
   <h3 align="center"><a href="https://github.com/key-lab/blueauth">BlueAuth</a> React Library</h3>
</p>

<details open="open">
<summary>Table of Contents</summary>

- [Installation](#installation)
- [Features](#features)
- [Quick Start](#quick-start)
- [Configuration](#configuration)

</details>

# Installation
```
npm install --save blueauth-react
```

# Features
- Sync user authentication across all tabs
- Get a React provider / context to access the authenticated user anywhere in the app
- Comes with an optimized built-in [BlueAuth client](https://github.com/key-lab/blueauth-client), making this the only BlueAuth client library you need.

# Quick Start

Wrap you React root with the `BlueAuthProvider`
```javascript
// pages/_app.jsx
import React from 'react';
import { BlueAuthProvider } from 'blueauth-react';

export default function MyApp({ Component, pageProps }) {
  return (
    <BlueAuthProvider config={{ url: '/api/blueauthEndpoint' }}>
      <Component {...pageProps} />
    </BlueAuthProvider>
  );
}

```

You can use the context elsewhere in your app:
```javascript
import React, { useContext, useState } from 'react';
import { userContext } from 'blueauth-react';

export default function Page() {
  const { identity, loading, client } = useContext(userContext);
  const [email, setEmail] = useState('example@example.com');

  if (loading) return <div>Loading...</div>;

  if (!identity) {
    return (
      <div>
        <h1>You are not signed in!</h1>
        <input
          placeholder="your@email.com"
          type="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <button
          onClick={() => client.startEmailSignIn({ identity: { email } })}
          type="button"
        >
          Send Sign In Email
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome! Your email is {identity.email}!</h1>
      <button
        onClick={() => client.signOut()}
        type="button"
      >
        Sign Out
      </button>
    </div>
  );
}
```

# Configuration

You can pass a [BlueAuth client](https://github.com/key-lab/blueauth-client#documentation) configuration object to the `config` attribute.

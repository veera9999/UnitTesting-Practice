![Antra-logo](https://github.com/user-attachments/assets/9db2d170-9512-4225-b245-e2a71c13f171)

# Assignment - 3

===========================================================================

## What are middleware functions in Express.js and How do they work?

Middleware functions in Express.js are essential components that facilitate the handling of HTTP requests and responses within an application. They act as intermediaries that can modify request and response objects, terminate the request-response cycle, or pass control to the next middleware function in the stack. This modular approach allows developers to incorporate custom logic and operations at different stages of the request-response process.

Middleware functions in Express.js are executed sequentially in the order they are added to the application. Each middleware function has access to three main objects:

- Request Object (req): Contains information about the HTTP request.
- Response Object (res): Used to send back the desired HTTP response.
- Next Function (next): A function that, when invoked, passes control to the next middleware function in the stack

## Whata is JWT, and how does it work?

JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object, which is then digitally signed using a cryptographic algorithm to ensure the token's integrity and authenticity.

How JWT Works:
Structure of a JWT:
A JWT consists of three parts separated by dots (.):

- Header: The header typically consists of two parts: the type of token (JWT) and the signing algorithm being used (e.g., HS256).
- Payload: The payload contains the claims, which are statements about an entity (typically, the user) and additional metadata.
- Signature: The signature is used to verify that the sender of the JWT is who it says it is and that the message wasn't changed along the way.

## How do you securely store JWT on the client-side?

Storing JWTs securely on the client side is crucial to prevent security vulnerabilities like token theft, which could lead to unauthorized access to resources. Here are some best practices for securely storing JWTs:

1. Use Secure Storage Mechanisms:
   Local Storage: While local storage is easy to use, it's vulnerable to XSS (Cross-Site Scripting) attacks because JavaScript can access it. Avoid storing JWTs in local storage if possible.
   Session Storage: Similar to local storage but more ephemeral, as data is cleared when the page session ends (e.g., when the browser tab is closed). However, it's also vulnerable to XSS attacks.
   HTTP-Only Cookies: This is generally the most secure option. Storing JWTs in HTTP-only cookies ensures that the token is not accessible via JavaScript, mitigating the risk of XSS attacks. However, ensure that the cookies are also marked as Secure (sent only over HTTPS) and SameSite (restrict cross-site requests).
2. Use Secure Cookies:
   HTTP-Only Flag: This prevents the JWT from being accessed by JavaScript running on the client, reducing the risk of XSS attacks.
   Secure Flag: Ensures that cookies are only sent over HTTPS, which protects against man-in-the-middle attacks.
   SameSite Attribute: Configuring the cookie with SameSite=Lax or SameSite=Strict helps protect against CSRF (Cross-Site Request Forgery) attacks by limiting the situations in which the browser sends cookies with cross-site requests.
3. Use Short-Lived JWTs with Refresh Tokens:
   Short-Lived JWTs: Set a short expiration time (exp claim) for the JWT to limit the time window in which a stolen token can be used.
   Refresh Tokens: Instead of allowing the JWT to be long-lived, use a short-lived access token and a refresh token stored in a more secure manner (e.g., HTTP-only cookies). The refresh token can be used to obtain a new JWT without forcing the user to log in again.
4. Implement XSS Protection:
   Content Security Policy (CSP): Implementing a strong CSP can help mitigate the risk of XSS by controlling the sources from which scripts can be loaded and executed.
   Sanitize Inputs: Always sanitize and validate user inputs to prevent the injection of malicious scripts.
   Use Trusted Libraries: Use well-maintained libraries that follow security best practices to reduce the risk of vulnerabilities in your code.
5. Avoid Storing Sensitive Information in JWTs:
   JWTs are base64 encoded, not encrypted, which means anyone with the token can decode and read its contents. Avoid storing sensitive information (like passwords or personal identifiers) in the payload.
6. Monitor and Invalidate Tokens:
   Token Revocation: Implement a strategy for revoking tokens, especially if a token is compromised. This can be done by maintaining a blacklist on the server-side or by tracking token versions.
   Logout Mechanism: Ensure that when a user logs out, the token is invalidated server-side, making it useless for subsequent requests.
7. Use HTTPS:
   Always serve your application over HTTPS to ensure that tokens are transmitted securely over the network, protecting them from man-in-the-middle attacks.
   By following these practices, you can reduce the risk of exposing your JWTs to potential attackers and ensure secure client-side storage.

## How does token expiration work in JWT?

In JSON Web Tokens (JWT), token expiration is managed through the "exp" (expiration) claim, which specifies a Unix timestamp indicating when the token becomes invalid. This claim helps ensure tokens have a limited lifespan, reducing the risk of unauthorized access if compromised. Typically, access tokens expire within minutes to hours, while refresh tokens may last longer, allowing users to obtain new access tokens without re-authentication. Proper handling of expired tokens, often through refresh tokens, balances security and user convenience.

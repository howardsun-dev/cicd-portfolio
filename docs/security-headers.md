# Security Headers

The portfolio is a static React/Vite app deployed to S3/CloudFront. Configure these headers with a CloudFront Response Headers Policy attached to the behavior serving `howardsun.me`.

Recommended policy values:

```text
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
```

Notes:

- `style-src 'unsafe-inline'` is currently included because the static app and bundled CSS may rely on Vite/runtime-injected styles. Tighten this later if styles are fully externalized and tested.
- If analytics, fonts, or external APIs are added later, update `script-src`, `connect-src`, `img-src`, and `font-src` explicitly.
- Keep S3 private behind CloudFront if possible; serve HTTPS only through CloudFront.

# Deploy — gen-images (@nino-tools/image-gen)

## Host
- **Not a deployed app.** This is a CLI tool consumed by other projects (forge-signal chain, signal-dispatch-blog image generation).

## "Deploy" / publish trigger
- **npm publish**: TODO — confirm whether this is published to npm or consumed via local file:// path
- **CI**: `.github/workflows/ci.yml` runs on PR (test only — TODO confirm no publish step)

## Database
- None

## Environment variables (for local use)
- OpenRouter API key, Gemini API key, DALL-E API key — whichever providers used
- Playwright browser deps for HTML-to-PNG rendering

## Authority limits
- Cannot npm publish without npm auth (`npm login`)

## Notes
- Consumed by forge-signal and signal-dispatch-blog
- See README for CLI usage
- Not a deployable web app — this manifest exists for completeness

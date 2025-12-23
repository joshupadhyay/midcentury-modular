# MidCentury Modern

A great way to quickly prove out a few ideas, scaffolded in Lovable, deployed with Vercel, tracked with PostHog.

## Tracking and Proxies

Adblockers are wonderful, but block analytics traffic from POST-ing to PostHog! The solution is a proxy:

We use `vercel.json` to capture the Posthog domain paths, and we define an internal route. The requests go through our internal route to Posthog. From the user perspective, the Adblocker thinks it's an internal request, allowing us to track analytics.

```[md]
# thanks Claude
❌ https://us.i.posthog.com/e/ (blocked by ad blocker)
✅ https://midcentury-modular.vercel.app/ingest/e/ (allowed - it's your domain!)
```

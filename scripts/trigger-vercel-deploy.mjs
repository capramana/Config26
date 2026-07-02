const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;

if (!hookUrl) {
  console.error(`
Missing VERCEL_DEPLOY_HOOK_URL in .env.local

Create a Deploy Hook in Vercel → Config26 → Settings → Git → Deploy Hooks (branch: main),
then add the URL to .env.local:

  VERCEL_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/...
`);
  process.exit(1);
}

const response = await fetch(hookUrl, { method: "POST" });

if (!response.ok) {
  console.error(`Deploy hook failed: ${response.status} ${response.statusText}`);
  process.exit(1);
}

let payload;
try {
  payload = await response.json();
} catch {
  payload = null;
}

console.log("Deploy triggered.");
if (payload?.job?.id) console.log(`Job: ${payload.job.id}`);

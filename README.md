# Kusk Gateway Dashboard

![Github Build Workflow](https://github.com/kubeshop/kusk-gateway-dashboard/actions/workflows/build.yml/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/b449965f-92a9-4233-b189-e4064c745793/deploy-status)](https://app.netlify.com/sites/gallant-edison-9baea8/deploys)

Browser-based dashboard for inspecting deploying APIs, EnvoyFleets and StaticRoutes.

## Quick start

In order to start the dashboard locally, run the following:

```bash
git clone https://github.com/kubeshop/kusk-gateway-dashboard.git && cd kusk-gateway-dashboard
npm install
npm run start
```

Then access it on [http://localhost:3000](http://localhost:3000).

### API server endpoint

The default endpoint is **_/api/_** which most likely is not applicable when running the dashboard locally. It can be
easily changed by going to **Settings** page and entering a new absolute URL.

## Documentation

Read more about the dashboard at
[https://docs.kusk.io/reference/dashboard/overview](https://docs.kusk.io/reference/dashboard/overview).

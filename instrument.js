import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://fe556ea6bf5e185ca07ce734fd67f12f@o4510651463172096.ingest.us.sentry.io/4510651476344832",
  sendDefaultPii: true,
});
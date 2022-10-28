import { Notifier } from '@airbrake/browser';
// Set environment variables
const airbrake = new Notifier({
  projectId: +process.env.AIRBRAKE_PROJECT_ID!,
  projectKey: process.env.AIRBRAKE_PROJECT_KEY!,
  environment: process.env.AIRBRAKE_PROJECT_ENV!,
});
export default airbrake;

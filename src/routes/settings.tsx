import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({ component: Page });
function Page() {
  return (
    <div className="min-h-screen grid place-items-center p-8 text-center">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Settings</div>
        <h1 className="text-3xl font-semibold neon-text mb-3">Personalize LIMEX</h1>
        <p className="text-muted-foreground mb-6">Theme, alerts, and API keys.</p>
        <Link to="/" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold neon-glow-sm">Back to dashboard</Link>
      </div>
    </div>
  );
}

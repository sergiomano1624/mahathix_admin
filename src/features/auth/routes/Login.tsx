import { createMemo, createSignal, For, type JSX } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { toast } from "@/shared/toast/toast";
import { Button, Select, type SelectOption } from "@/shared/components";
import "../Login.css";

const mailIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.4" y="5.2" width="17.2" height="13.6" rx="2.2"/><path d="m4.4 6.4 7.6 5.4 7.6-5.4"/></svg>`;
const lockIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4.4" y="10.4" width="15.2" height="10.2" rx="2.2"/><path d="M7.6 10.4V8a4.4 4.4 0 0 1 8.8 0v2.4"/></svg>`;
const eyeIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.6 12s3.4-6.6 9.4-6.6S21.4 12 21.4 12 18 18.6 12 18.6 2.6 12 2.6 12Z"/><circle cx="12" cy="12" r="3"/></svg>`;
const eyeOffIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.6 3.6 20.4 20.4"/><path d="M10.4 10.4a2.2 2.2 0 0 0 3 3"/><path d="M5.6 6.8C4 8.2 2.6 12 2.6 12s3.4 6.6 9.4 6.6a9.4 9.4 0 0 0 4.6-1.2"/><path d="M8.8 5.6A9.4 9.4 0 0 1 12 5.4c6 0 9.4 6.6 9.4 6.6a16 16 0 0 1-3 4"/></svg>`;
const checkIcon = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;
const sparkleIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="m12 2 2 5.4L19.4 10 14 12l-2 5.4L10 12 4.6 10 10 7.4Z"/></svg>`;
const arrowIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>`;

interface Project {
  id: string;
  name: string;
  subtitle: string;
  initials: string;
  accent: string;
  demoEmail: string;
  demoPassword: string;
}

const PROJECTS: Project[] = [
  { id: "vibe-mode", name: "Vibe Mode", subtitle: "Streetwear · AI studio", initials: "V", accent: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)", demoEmail: "admin@vibemode.in", demoPassword: "vibe@2026" },
  { id: "storez55", name: "Storez55 Shop", subtitle: "Retail · multi-channel", initials: "S", accent: "linear-gradient(135deg, #f472b6 0%, #be185d 100%)", demoEmail: "admin@storez55.com", demoPassword: "storez@2026" },
  { id: "launchpad", name: "Launchpad Studio", subtitle: "Agency · creators", initials: "L", accent: "linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 100%)", demoEmail: "admin@launchpad.studio", demoPassword: "launch@2026" },
  { id: "dusshera", name: "Dusshera Campaigns", subtitle: "Seasonal · festive", initials: "D", accent: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)", demoEmail: "admin@dusshera.in", demoPassword: "dusshera@2026" },
];

const PROJECT_OPTIONS: SelectOption[] = PROJECTS.map((p) => ({
  value: p.id,
  label: p.name,
  sub: p.subtitle,
  accent: p.accent,
}));

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);
  const [remember, setRemember] = createSignal(true);
  const [submitting, setSubmitting] = createSignal(false);
  const [projectId, setProjectId] = createSignal<string>(PROJECTS[0]!.id);

  const project = createMemo(() => PROJECTS.find((p) => p.id === projectId()) ?? PROJECTS[0]!);

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!email() || !password()) {
      toast.info("Enter your email and password to continue.", "Missing details");
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      toast.success(`Welcome back to ${project().name}, ${email().split("@")[0]}!`, "Signed in");
      navigate("/");
    }, 700);
  };

  return (
    <main class="auth">
      <section class="auth__panel auth__panel--brand" aria-hidden="true">
        <div class="auth__panel-inner">
          <a class="auth__brand" href="/">
            <span class="auth__brand-mark">
              <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
                <defs>
                  <linearGradient id="auth-brand-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#ffffff" stop-opacity="0.9"/>
                    <stop offset="1" stop-color="#ffffff" stop-opacity="0.65"/>
                  </linearGradient>
                </defs>
                <rect width="28" height="28" rx="8" fill="url(#auth-brand-grad)"/>
                <path d="M10 8 L19 14 L10 20 Z" fill="#5b21b6"/>
              </svg>
            </span>
            <span class="auth__brand-text">
              <strong>Mahathix Admin</strong>
              <em>Social Media Feed Manager</em>
            </span>
          </a>

          <div class="auth__hero">
            <span class="auth__chip">
              <span innerHTML={sparkleIcon} />
              <span>Super admin access</span>
            </span>
            <h1>
              Welcome back, operator.
              <br /> The console is yours.
            </h1>
            <p>
              Pick a project and sign in to manage every channel, every campaign, every creator — from one place.
            </p>

            <ul class="auth__features">
              <li>
                <span class="auth__feature-dot" innerHTML={checkIcon} />
                One console for every project you run
              </li>
              <li>
                <span class="auth__feature-dot" innerHTML={checkIcon} />
                Full audit log and role control
              </li>
              <li>
                <span class="auth__feature-dot" innerHTML={checkIcon} />
                Two-factor secured sign-in
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="auth__panel auth__panel--form">
        <div class="auth__form-wrap">
          <header class="auth__form-head">
            <h2>Super admin sign-in</h2>
            <p>Pick the project you're managing and sign in.</p>
          </header>

          <form class="auth__form" onSubmit={onSubmit} novalidate>
            <div class="auth__field">
              <span class="auth__field-label">Project</span>
              <Select
                value={projectId()}
                onChange={(v) => v && setProjectId(v)}
                options={PROJECT_OPTIONS}
                align="left"
                class="auth__project-select"
                minWidth={260}
                menuMinWidth={300}
              />
            </div>

            <label class="auth__field">
              <span class="auth__field-label">Email address</span>
              <span class="auth__input">
                <span class="auth__input-icon" innerHTML={mailIcon} />
                <input
                  type="email"
                  autocomplete="email"
                  placeholder="you@company.com"
                  value={email()}
                  onInput={(e) => setEmail(e.currentTarget.value)}
                  required
                />
              </span>
            </label>

            <label class="auth__field">
              <span class="auth__field-label-row">
                <span class="auth__field-label">Password</span>
                <a class="auth__forgot" href="#forgot">Forgot password?</a>
              </span>
              <span class="auth__input">
                <span class="auth__input-icon" innerHTML={lockIcon} />
                <input
                  type={showPassword() ? "text" : "password"}
                  autocomplete="current-password"
                  placeholder="Enter your password"
                  value={password()}
                  onInput={(e) => setPassword(e.currentTarget.value)}
                  required
                />
                <button
                  type="button"
                  class="auth__input-toggle"
                  aria-label={showPassword() ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  innerHTML={showPassword() ? eyeOffIcon : eyeIcon}
                />
              </span>
            </label>

            <label class="auth__remember">
              <span class="auth__checkbox" classList={{ "is-checked": remember() }}>
                <input
                  type="checkbox"
                  checked={remember()}
                  onChange={(e) => setRemember(e.currentTarget.checked)}
                />
                <span class="auth__checkbox-mark" innerHTML={checkIcon} />
              </span>
              <span>Remember me on this device</span>
            </label>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              block
              iconEnd={arrowIcon}
              disabled={submitting()}
              class="auth__submit"
            >
              {submitting() ? "Signing in…" : "Sign In"}
            </Button>

            <div class="auth__demo">
              <div class="auth__demo-head">
                <span class="auth__demo-chip">
                  <span innerHTML={sparkleIcon} />
                  Demo credentials
                </span>
                <span class="auth__demo-hint">Click any to autofill</span>
              </div>
              <div class="auth__demo-grid">
                <For each={PROJECTS}>
                  {(p) => (
                    <button
                      type="button"
                      class="auth__demo-card"
                      classList={{ "is-active": p.id === projectId() }}
                      onClick={() => {
                        setProjectId(p.id);
                        setEmail(p.demoEmail);
                        setPassword(p.demoPassword);
                        toast.info(`${p.name} credentials filled in.`, "Ready to sign in");
                      }}
                      title={`${p.demoEmail} / ${p.demoPassword}`}
                    >
                      <span
                        class="auth__demo-avatar"
                        style={{ background: p.accent }}
                      >
                        {p.initials}
                      </span>
                      <span class="auth__demo-meta">
                        <strong>{p.name}</strong>
                        <em>{p.demoEmail}</em>
                      </span>
                    </button>
                  )}
                </For>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

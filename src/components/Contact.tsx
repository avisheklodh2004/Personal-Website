import { useState, type FormEvent } from "react";
import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

const EMAIL = "alodh2@asu.edu";

// Web3Forms access key. It only lets visitors send messages to the inbox it was
// created for, so it is safe to ship in the client. Without it the form opens
// the visitor's mail app with the message filled in.
const WEB3FORMS_ACCESS_KEY = "";

type State = { kind: "idle" | "sending" | "sent" | "error" | "mailto"; message?: string };

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<State>({ kind: "idle" });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);
    if (data.get("botcheck")) return;

    if (!WEB3FORMS_ACCESS_KEY) {
      const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        `Message from ${form.name}`
      )}&body=${encodeURIComponent(body)}`;
      setState({ kind: "mailto", message: "Your mail app should open with the message ready to send." });
      return;
    }

    setState({ kind: "sending" });
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New message from ${form.name} via avisheklodh.com`,
          from_name: "avisheklodh.com",
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error(json.message);
      setForm({ name: "", email: "", message: "" });
      setState({ kind: "sent", message: "Thanks. Your message is on its way and I'll reply soon." });
    } catch {
      setState({ kind: "error", message: `That didn't go through. You can email me directly at ${EMAIL}.` });
    }
  };

  const field = (key: keyof typeof form) => ({
    id: `contact-${key}`,
    name: key,
    value: form[key],
    onChange: (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value })),
    required: true,
  });

  return (
    <section className="section" id="contact">
      <div className="container">
        <SectionHead piece="Q" move="1-0" title="Contact" />
        <Reveal className="contact">
          <div className="contact__intro">
            <p className="contact__lead">Let's build something together.</p>
            <p>
              I'm always open to talking about new projects, internships, or collaborations in software engineering and
              AI.
            </p>
            <ul className="contact__list">
              <li>
                <Mail size={16} strokeWidth={1.75} />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <MapPin size={16} strokeWidth={1.75} />
                <span>Tempe, Arizona</span>
              </li>
              <li>
                <Github size={16} strokeWidth={1.75} />
                <a href="https://github.com/avisheklodh2004" target="_blank" rel="noopener noreferrer">
                  github.com/avisheklodh2004
                </a>
              </li>
              <li>
                <Linkedin size={16} strokeWidth={1.75} />
                <a href="https://www.linkedin.com/in/avisheklodh/" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/avisheklodh
                </a>
              </li>
            </ul>
            <p className="status-pill">
              <span className="status-pill__dot" aria-hidden="true" />
              Open to internship opportunities
            </p>
          </div>

          <form className="form" onSubmit={submit} noValidate={false}>
            <input type="checkbox" name="botcheck" className="form__botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="form__field">
              <label htmlFor="contact-name">Name</label>
              <input type="text" autoComplete="name" {...field("name")} />
            </div>
            <div className="form__field">
              <label htmlFor="contact-email">Email</label>
              <input type="email" autoComplete="email" {...field("email")} />
            </div>
            <div className="form__field">
              <label htmlFor="contact-message">Message</label>
              <textarea rows={5} {...field("message")} />
              <p className="form__help">A line or two about what you have in mind is plenty.</p>
            </div>
            <button className="btn btn--primary form__submit" type="submit" disabled={state.kind === "sending"}>
              {state.kind === "sending" ? "Sending" : "Send message"} <ArrowRight size={15} strokeWidth={1.75} />
            </button>
            {state.message && (
              <p className={`form__status ${state.kind === "error" ? "is-error" : ""}`} role="status">
                {state.message}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

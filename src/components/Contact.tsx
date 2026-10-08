import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

const EMAIL = "alodh2@asu.edu";

// Set these in a .env file to send messages through EmailJS. Without them the
// form opens the visitor's mail app with the message filled in.
const EMAILJS = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined,
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined,
};

type State = { kind: "idle" | "sending" | "sent" | "error" | "mailto"; message?: string };

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<State>({ kind: "idle" });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const { publicKey, serviceId, templateId } = EMAILJS;

    if (!publicKey || !serviceId || !templateId) {
      const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        `Message from ${form.name}`
      )}&body=${encodeURIComponent(body)}`;
      setState({ kind: "mailto", message: "Your mail app should open with the message ready to send." });
      return;
    }

    setState({ kind: "sending" });
    try {
      await emailjs.send(
        serviceId,
        templateId,
        { from_name: form.name, from_email: form.email, message: form.message, to_email: EMAIL },
        { publicKey }
      );
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
        <SectionHead piece="Q" move="Qxh7#" title="Contact" />
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

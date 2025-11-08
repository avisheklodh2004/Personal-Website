import { motion } from "motion/react";
import { Mail, MapPin, Github, Linkedin, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { SpaceBackground } from "./SpaceBackground";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
    const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
    const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

    const isEmailJSConfigured =
      EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY" &&
      EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID" &&
      EMAILJS_TEMPLATE_ID !== "YOUR_TEMPLATE_ID";

    if (!isEmailJSConfigured) {

      toast.error(
        "EmailJS not configured. Please email me directly at alodh2@asu.edu",
        { duration: 5000 }
      );

      window.location.href = `mailto:alodh2@asu.edu?subject=Message from ${formData.name}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      return;
    }

    setIsLoading(true);

    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "alodh2@asu.edu",
        }
      );

      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again or email me directly at alodh2@asu.edu");
    } finally {
      setIsLoading(false);
    }
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/avisheklodh2004", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/avisheklodh/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:alodh2@asu.edu", label: "Email" },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden" id="contact">
      <SpaceBackground />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="h-8 w-8 text-primary" />
              <h2 className="text-primary">Get In Touch</h2>
            </div>
            <p className="text-muted-foreground">
              Let's build something amazing together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Left Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-primary mb-4">Let's Connect</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm passionate about creating innovative solutions and always open to discussing new projects, internship opportunities, or collaborative ventures in software engineering and AI.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-foreground/80">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Tempe, Arizona</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/80">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>alodh2@asu.edu</span>
                </div>
              </div>

              {/* Follow Me */}
              <div>
                <h4 className="mb-4 text-foreground/90">Follow Me</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-card via-card to-primary/5 border-2 border-primary/30 rounded-lg hover:border-primary transition-all shadow-md hover:shadow-xl hover:shadow-primary/40 backdrop-blur-sm"
                      aria-label={social.label}
                      whileHover={{
                        scale: 1.15,
                        rotate: index % 2 === 0 ? 5 : -5,
                        y: -5
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      style={{
                        transform: 'perspective(1000px) translateZ(0)',
                      }}
                    >
                      <social.icon className="h-5 w-5 text-primary" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div className="bg-card border border-primary/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse"
                    style={{
                      boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)',
                    }}
                  />
                  <span className="text-primary">Available to Work</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Currently open for internship opportunities
                </p>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label htmlFor="name" className="text-foreground/90">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-card border-primary/30 focus:border-primary transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-foreground/90">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-card border-primary/30 focus:border-primary transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-foreground/90">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project or opportunity..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-card border-primary/30 focus:border-primary transition-colors resize-none"
                  required
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-br from-primary via-primary to-purple-600 hover:from-purple-600 hover:via-primary hover:to-primary text-primary-foreground shadow-lg hover:shadow-2xl hover:shadow-primary/60 transition-all duration-500 border-0 relative overflow-hidden group"
                  disabled={isLoading}
                  style={{
                    transform: 'perspective(1000px) translateZ(0)',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: isLoading ? '-100%' : '100%' }}
                    transition={{ duration: 0.6, repeat: isLoading ? Infinity : 0 }}
                  />
                  <span className="relative z-10">{isLoading ? "Sending..." : "Send Message"}</span>
                  <Send className="ml-2 h-4 w-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                </Button>
              </motion.div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

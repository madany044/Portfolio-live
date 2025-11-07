"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { HiArrowLongRight } from "react-icons/hi2";

const initialForm = {
  name: "",
  email: "",
  company: "",
  message: "",
};

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string>("");
  const qrRef = useRef<HTMLDivElement>(null);

  const isDisabled = useMemo(() => {
    return (
      !form.name.trim() ||
      !form.email.trim() ||
      !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(form.email) ||
      form.message.trim().length < 12
    );
  }, [form]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isDisabled) {
      setFeedback("Please fill all fields with a valid email and message.");
      return;
    }

    try {
      setStatus("loading");
      setFeedback("");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Unable to send message right now.");
      }

      setStatus("success");
      setFeedback("Message received! I will reply within 48 hours.");
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setFeedback("Something went wrong. Please email hi@alexmorgan.dev instead.");
    }
  };

  const downloadQr = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "alex-morgan-portfolio-qr.png";
    link.click();
  };

  return (
    <section id="contact" className="relative mx-auto w-full max-w-6xl px-6 py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            Connect
          </span>
          <h2 className="font-display text-3xl text-white sm:text-4xl">
            Let’s collaborate on the next flagship experience.
          </h2>
          <p className="text-base text-white/70">
            I’m partnering with ambitious teams on immersive products, design
            systems, and AI-driven platforms. Drop a note with context, and I’ll
            share availability along with a bespoke point-of-view deck.
          </p>
          <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                Response time
              </p>
              <p className="mt-1 text-base text-white">Typically within 24–48 hours</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                Quick links
              </p>
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-white/70">
                <a
                  href="mailto:madanmadany2004@gmail.com"
                  className="rounded-full border border-white/15 px-3 py-1 transition hover:border-white/40 hover:text-white"
                >
                  madanmadany2004@gmail.com
                </a>
                <a
                  href="https://github.com/madany044"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 px-3 py-1 transition hover:border-white/40 hover:text-white"
                >
                  GitHub Profile
                </a>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}

            className="glass-panel flex flex-col items-center gap-4 rounded-3xl p-6 text-center"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">
              Scan & save
            </p>
            <div ref={qrRef} className="rounded-3xl bg-white p-4 shadow-2xl shadow-purple-500/30">
              <QRCodeCanvas
                value="https://github.com/madany044"
                size={144}
                bgColor="#ffffff"
                fgColor="#2d186d"
                level="H"
                includeMargin
              />
            </div>
            <p className="text-sm text-white/70">
              Drop this QR on event cards or pitch decks to provide a frictionless
              handoff to the portfolio.
            </p>
            <button
              type="button"
              onClick={downloadQr}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-white/40 hover:text-white"
            >
              Download PNG
              <HiArrowLongRight className="text-lg" />
            </button>
          </motion.div>
        </div>

        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-panel relative grid gap-6 rounded-3xl p-8 text-white"
        >
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/40">
              Name
            </label>
            <input
              required
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
              placeholder="Alex Morgan"
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/40">
                Work email
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/40">
                Company / Studio
              </label>
              <input
                value={form.company}
                onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                placeholder="Illuminate Labs"
              />
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/40">
              What are we building?
            </label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
              placeholder="We’re launching a multi-device experience and need a partner on strategy, system design, and immersive interactions..."
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading" || isDisabled}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_65px_rgba(129,140,248,0.35)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Send message"}
            <HiArrowLongRight className="text-lg" />
          </button>
          {feedback && (
            <p
              className={`text-sm ${status === "success" ? "text-emerald-300" : "text-rose-300"}`}
            >
              {feedback}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}


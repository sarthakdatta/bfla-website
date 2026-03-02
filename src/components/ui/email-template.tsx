"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Send } from "lucide-react";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { from_email: email, message },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        setSuccess(true);
        setEmail("");
        setMessage("");
      })
      .catch((err) => setError(err.text))
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] min-w-[180vh] "> {/* Center the form vertically and take up most of the page */}
      <Card className="w-full max-w-2xl p-8 shadow-lg border border-gray-200 rounded-xl"> {/* Adjusted width and padding */}
        <h2 className="text-5xl font-bold text-center mb-10 text-primary-foreground">Contact Us</h2>
        <form onSubmit={sendEmail} className="space-y-6"> {/* Increased spacing between form elements */}
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-14 text-xl text-primary-foreground"
          />
          <Textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="h-60 text-lg text-primary-foreground" 
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Send Message"}
            <Send className="ml-2" />
          </Button>
          {success && <p className="text-green-600 text-center">Message sent successfully!</p>}
          {error && <p className="text-red-600 text-center">Error: {error}</p>}
        </form>
      </Card>
    </div>
  );
};

export default ContactForm;
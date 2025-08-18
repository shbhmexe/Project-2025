"use client"; 
import NewsLatterBox from "./NewsLatterBox";
import { useState } from "react";

const Contact = () => {
  // State variables for form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // For showing success/error messages
  const [showStatus, setShowStatus] = useState(false); // Step 4: Frontend Success Message

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    // Check if all fields are filled
    if (!name || !email || !message) {
      setStatus("All fields are required.");
      setShowStatus(true);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      if (response.status === 201) {
        setStatus("Form submitted successfully! We will reach out to you soon.");
        setShowStatus(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus(data.message || "Something went wrong!");
        setShowStatus(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Internal Server Error.");
      setShowStatus(true);
    }
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28 bg-background">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="wow fadeInUp card mb-12 px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s"
            >
              <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl lg:text-2xl xl:text-3xl">
                Need Help? Open a Ticket
              </h2>
              <p className="mb-12 text-base font-medium text-muted-foreground">
                Our support team will get back to you ASAP via email.
              </p>

              {/* Form starts */}
              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label className="mb-3 block text-sm font-medium text-foreground">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full rounded-md border border-border bg-card px-6 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-ring"
                      />
                    </div>
                  </div>

                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label className="mb-3 block text-sm font-medium text-foreground">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full rounded-md border border-border bg-card px-6 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-ring"
                      />
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label className="mb-3 block text-sm font-medium text-foreground">
                        Your Message
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        placeholder="Enter your Message"
                        className="w-full resize-none rounded-md border border-border bg-card px-6 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-ring"
                      ></textarea>
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <button
                      type="submit"
                      className="button-primary px-9 py-4 text-base"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
              {/* Form ends */}

              {/* Status Message */}
              {showStatus && status && (
                <p className="mt-4 text-center font-semibold text-3xl text-blue-500 drop-shadow-md tracking-wide">
                  {status}
                </p>
              )}
            </div>
          </div>

          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

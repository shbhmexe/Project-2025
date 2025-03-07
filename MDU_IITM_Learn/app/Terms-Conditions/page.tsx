import Head from "next/head";

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms and Conditions - https://mduiitmlearn.vercel.app</title>
        <meta name="description" content="Terms and Conditions of Your Website" />
      </Head>

      <div className="max-w-4xl mx-auto px-6 py-12 mt-36 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-300 dark:border-gray-700 transition-all duration-300 mb-10">
        <h1 className="text-3xl font-bold text-center mb-6">Terms and Conditions</h1>

        <div className="mb-4">
          Welcome to <strong> https://mduiitmlearn.vercel.app </strong> By using our website, you agree to comply with the following terms and conditions. Please read them carefully.
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
          <div className="mb-4">
            By accessing or using our website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">2. Use of Our Website</h2>
          <div className="mb-4">
            You agree to use our website for lawful purposes only. You must not engage in activities that:
            <ul className="list-disc ml-6">
              <li>Violate any laws or regulations.</li>
              <li>Infringe on the rights of others.</li>
              <li>Disrupt or interfere with our websites operation.</li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">3. Intellectual Property</h2>
          <div className="mb-4">
            All content on this website, including text, images, logos, and trademarks, is the property of <strong>https://mduiitmlearn.vercel.app </strong> and is protected by copyright laws. You may not reproduce, distribute, or use our content without permission.
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">4. User Accounts</h2>
          <div className="mb-4">
            If you create an account on our website, you are responsible for maintaining the confidentiality of your login information. You agree to notify us immediately if your account is compromised.
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">5. Limitation of Liability</h2>
          <div className="mb-4">
            We are not responsible for any direct, indirect, or incidental damages resulting from your use of our website.
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">6. Third-Party Links</h2>
          <div className="mb-4">
            Our website may contain links to third-party sites. We are not responsible for the content or practices of these external websites.
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">7. Changes to Terms</h2>
          <div className="mb-4">
            We may update these Terms and Conditions from time to time. Please check back regularly to stay informed.
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">8. Contact Us</h2>
          <div className="mb-4">
            If you have any questions, feel free to contact us at{" "}
            <a href="mailto: mduiitmnotes@gmail.com" className="text-blue-500">support@mduiitmlearn.com</a>.
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

export default function OpenInBrowserPage() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 className="text-primary-950">Open in Browser</h1>
      <p className="text-primary-950">
        It looks like youre trying to access this page from Instagrams in-app
        browser, which might block secure login.
      </p>
      <p className="text-primary-950">
        To continue, please open this link in your system browser:
      </p>
      <ol className="text-primary-950">
        <li className="text-primary-950">
          Tap the three dots (<b>⋮</b>) in the top-right corner (or the share
          icon).
        </li>
        <li className="text-primary-950">
          Select <b>&quot;Open in Browser&quot;</b> from the menu.
        </li>
      </ol>
      <p className="text-primary-950">
        After that, youll be able to log in securely.
      </p>
      <a href="https://nail-website-demo.vercel.app">
        <button
          className="text-primary-950"
          style={{ padding: "10px 20px", fontSize: "16px", marginTop: "20px" }}
        >
          Open in Browser
        </button>
      </a>
    </div>
  );
}

"use client";

export default function OpenInBrowserPage() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Open in Browser</h1>
      <p>
        It looks like you're trying to access this page from Instagram's in-app
        browser, which might block secure login.
      </p>
      <p>To continue, please open this link in your system browser:</p>
      <ol>
        <li>
          Tap the three dots (<b>⋮</b>) in the top-right corner (or the share
          icon).
        </li>
        <li>
          Select <b>"Open in Browser"</b> from the menu.
        </li>
      </ol>
      <p>After that, you’ll be able to log in securely.</p>
      <a href="https://nail-website-demo.vercel.app">
        <button
          style={{ padding: "10px 20px", fontSize: "16px", marginTop: "20px" }}
        >
          Open in Browser
        </button>
      </a>
    </div>
  );
}

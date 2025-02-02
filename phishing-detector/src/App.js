import React, { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const checkWhois = async () => {
    if (!url) {
      setResult("❌ Please enter a URL.");
      return;
    }

    setLoading(true);
    setResult(""); // Clear previous result

    try {
      const response = await fetch(`http://localhost:8000/api/whois?url=${encodeURIComponent(url)}`);

      if (!response.ok) {
        setResult("❌ Server error. Please try again.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data.error) {
        setResult(`❌ Error: ${data.error}`);
        setLoading(false);
        return;
      }

      // Extract Whois data
      const domain = data.WhoisRecord?.domainName || "Unknown";
      const createdDate = data.WhoisRecord?.createdDate || "Unknown";
      const registrar = data.WhoisRecord?.registrarName || "Unknown";
      const organization = data.WhoisRecord?.registrant?.organization || "Hidden";
      const country = data.WhoisRecord?.registrant?.country || "Unknown";

      // Flagging logic for malicious sites
      let safetyMessage = "✅ This domain appears safe.";
      if (new Date(createdDate) > new Date(Date.now() - 1000 * 60 * 60 * 24 * 365)) {
        safetyMessage = "⚠️ Warning: This domain is recently registered. Be cautious.";
      }
      if (organization === "Hidden") {
        safetyMessage = "🚨 Suspicious: The owner has hidden their identity.";
      }

      setResult(`
        🌐 Domain: ${domain}
        📅 Created On: ${createdDate}
        🏢 Registrar: ${registrar}
        🏛️ Organization: ${organization}
        🌍 Country: ${country}
        
        ${safetyMessage}
      `);
    } catch (error) {
      setResult("❌ Error connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">IITK Hackathon PS2</h1>
      <h2>Malicious URL checker</h2>
      <input
        type="text"
        placeholder="Enter URL here..."
        className="input-field"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={loading} // Disable input during loading
      />
      <button onClick={checkWhois} className="check-button" disabled={loading}>
        {loading ? "Checking..." : "Check Domain"}
      </button>
      <pre className="result-text">{result}</pre>
    </div>
  );
}

export default App;

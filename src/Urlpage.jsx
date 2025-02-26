import React, { useState } from "react";
import styles from "./Urlpage.module.css";

const Urlpage = () => {
  const [input, setInput] = useState("");
  const [uniqueUrls, setUniqueUrls] = useState([]);
  const [message, setMessage] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const handleDeduplicate = () => {
    setLoading(true); // Show loading animation
    setTimeout(() => {
      const urls = input
        .split(/\r?\n|,/)
        .map(url => url.trim())
        .filter(url => url);

      const uniqueSet = new Set(urls);
      setUniqueUrls([...uniqueSet]);
      setMessage(`Duplicates removed! ${uniqueSet.size} unique URLs found.`);
      setShowResults(true);
      setLoading(false); // Hide loading animation
    }, 1000); // Simulate processing delay
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInput(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>URL Deduplication Tool</h2>

      {!showResults ? (
        <>
          <textarea
            className={styles.textarea}
            placeholder="Paste URLs here (one per line)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>

          <input
            type="file"
            accept=".txt,.csv"
            className={styles.fileInput}
            onChange={handleFileUpload}
          />

          <button className={styles.button} onClick={handleDeduplicate} disabled={loading}>
            {loading ? "Processing..." : "Remove Duplicates"}
          </button>

          {loading && <div className={styles.loader}></div>} {/* Loader animation */}
        </>
      ) : (
        <>
          {message && <p className={styles.message}>{message}</p>}
          <div className={styles.resultContainer}>
            <h3 className={styles.resultTitle}>Unique URLs:</h3>
            <textarea
              className={styles.resultTextarea}
              readOnly
              value={uniqueUrls.join("\n")}
            ></textarea>
          </div>

          <button className={styles.button} onClick={() => setShowResults(false)}>
            Back
          </button>
        </>
      )}
    </div>
  );
};

export default Urlpage;

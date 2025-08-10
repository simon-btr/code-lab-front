import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("signupEmail") || "");
  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/auth/verify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, verificationCode }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid or expired code");
      }

      localStorage.removeItem("signupEmail");

      window.alert("Account verified successfully!");

      navigate("/login");
    } catch (err) {
      window.alert(err.message);
    }
  };

  const handleResend = async () => {
    if (!email) {
      window.alert("Please enter your email to resend the code.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/auth/resend`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) throw new Error("Failed to resend code");

      window.alert("Verification code resent successfully!");
    } catch (err) {
      window.alert(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Account verification</h2>
      <p>Enter the code you received by email</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
        <button type="submit">Vérifier</button>
      </form>
      <div className="link-text">
        <button onClick={handleResend}>Resend Code</button>
      </div>
    </div>
  );
}

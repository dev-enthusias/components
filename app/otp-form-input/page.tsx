"use client";

import { useRef, useState } from "react";

const OTP_LENGTH = 4;

export default function Page() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(OTP_LENGTH).fill(null)
  );

  console.log(otp);
  const focusNextInput = (idx: number) => {
    if (idx < inputRefs.current.length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const focusPrevInput = (idx: number) => {
    if (idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "ArrowRight") focusNextInput(idx);
    if (e.key === "ArrowLeft") focusPrevInput(idx);
    if (e.key === "Backspace" && !(e.target as HTMLInputElement).value)
      focusPrevInput(idx);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const value = e.target.value;

    if (isNaN(+value)) return;

    // Update the otp state array values
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[idx] = value;
      return newOtp;
    });

    // Focus on next input
    value.trim() && focusNextInput(idx);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const value = e.clipboardData.getData("text");
    console.log(value);
    console.log(isNaN(+value));

    if (isNaN(+value)) return;

    const updatedValue = value.split("").slice(0, OTP_LENGTH);
    setOtp(updatedValue);

    inputRefs.current.forEach((input) => input?.blur());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Handle form submission logic here

    // Display the otp code
    alert(otp.join(""));
  };

  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <article className="border rounded-xl max-w-2xl border-gray-500 px-10 py-8 text-center">
        <section className="mb-10">
          <h2 className="font-bold text-2xl mb-1">Verify your email</h2>
          <p className="text-sm opacity-90">
            A notification email has been sent to{" "}
            <span className="opacity-60 italic">becomingadev@gmail.com</span>
          </p>
        </section>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-x-4 w-fit mx-auto mb-6">
            {otp.map((input: string, idx: number) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                value={input}
                maxLength={1}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onPaste={(e) => handlePaste(e)}
                className="bg-transparent border-gray-500 border rounded h-16 w-20 text-center"
              />
            ))}
          </div>

          <button className="bg-white text-black font-semibold rounded-lg px-10 py-3 transition-color hover:bg-transparent border border-transparent hover:border-white hover:text-white duration-150">
            Verify
          </button>
        </form>
      </article>
    </main>
  );
}

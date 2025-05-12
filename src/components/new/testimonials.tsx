"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "It is great to be able to easily access, share and track my post-secondary transcripts and graduation awards through one online credential wallet. As someone who's studied at more than one school and is now looking for a job, MyCred is a great option to support my job search process.",
    author: "Graduate",
  },
  {
    quote:
      "It is very difficult for students to get to campus and yet, waiting for documents in the mail is not longer the way to go. I think MyCred is the right answer for the times. We have very little time, can't always take time off work, and need better access to our transcripts.",
    author: "Alumna",
  },
  {
    quote:
      "It was such a challenge to figure out how to get the right letter and to know where to go to get it sent in on time for my admission to my graduate diploma program. It would have been so great to have MyCred available when I was going through this process last year. It would have saved me so much time and a lot less anxiety wondering if documents arrived at their final destination.",
    author: "Postgraduate diploma student",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (current) => (current - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          What people think about MyCred
        </h2>

        <div className="relative mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-lg bg-blue-50 p-8 shadow-lg">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-opacity duration-500 ${
                  index === activeIndex
                    ? "opacity-100"
                    : "absolute inset-0 opacity-0"
                }`}
              >
                <blockquote className="text-center">
                  <p className="mb-6 text-lg text-gray-700 md:text-xl">
                    "{testimonial.quote}"
                  </p>
                  <footer className="font-medium text-blue-600">
                    {testimonial.author}
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-3 w-3 rounded-full ${index === activeIndex ? "bg-blue-600" : "bg-gray-300"}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-blue-600" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white p-2 shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-blue-600" />
          </button>
        </div>
      </div>
    </section>
  );
}

import { Suspense } from "react";
import HeroBanner from "~/components/new/hero-banner";
import AccordionPanel from "~/components/new/accordion-panel";
import FeaturedContent from "~/components/new/featured-content";
import Testimonials from "~/components/new/testimonials";
// import LogoSlider from "~/components/new/logo-slider";
import CtaPanel from "~/components/new/cta-panel";

export default function Homepage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />

      <AccordionPanel />

      <section className="py-12">
        <FeaturedContent
          title="Secure 24/7 document access and sharing – anytime, anywhere"
          alignment="right"
          backgroundColor="bg-blue-100"
          heading="Students and Graduates"
          content={[
            "One stop credential wallet for all your post-secondary documents, transcripts and graduation credentials and awards",
            "Secure 24/7 document access and sharing – anytime, anywhere",
            "Service when you want and where you want",
            "Viewing and ordering capabilities at your fingertips resulting in faster service from employers and Canadian colleges and universities",
          ]}
          imageSrc="/images/McGill_University_campus-9823_copy.jpg"
          imageAlt="Students outside at McGill University Campus"
          imageCaption="McGill University Campus"
        />

        <FeaturedContent
          alignment="left"
          backgroundColor="bg-white"
          heading="Employers, Government and Other Third Parties"
          content={[
            "One stop verification environment – graduation, enrolment and more",
            "Confidence and trust",
            "Speed and efficiency",
            "Faster decision making",
            "Reduced fraud",
          ]}
          imageSrc="/images/iStock-1135346384-1024x683.jpg"
          imageAlt="People sitting with laptop"
        />

        <FeaturedContent
          alignment="right"
          backgroundColor="bg-blue-100"
          heading="Colleges, CEGEPs and Universities"
          content={[
            "Better learner supports",
            "Faster and more efficient work processes and decision making",
            "Trust and reduced fraud",
            "Protection for the Canadian higher education brand",
            "Seamless access to verified documents and machine-readable data",
            "Digitally certified official credentials and documents – individually or in bulk",
          ]}
          imageSrc="/images/Waterloo_1-1024x1038.jpg"
          imageAlt="University of Waterloo Outdoor sign"
          imageCaption="University of Waterloo"
        />
      </section>

      <Suspense fallback={<div>Loading testimonials...</div>}>
        <Testimonials />
      </Suspense>

      {/* <Suspense fallback={<div>Loading partner logos...</div>}>
        <LogoSlider />
      </Suspense> */}

      <CtaPanel />
    </main>
  );
}

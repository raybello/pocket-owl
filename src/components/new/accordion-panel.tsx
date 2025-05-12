"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export default function AccordionPanel() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          24/7 access – anytime, anywhere
        </h2>

        <div className="overflow-hidden rounded-lg bg-blue-100">
          <div className="grid gap-8 p-8 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <Accordion type="multiple" defaultValue={["item-1"]}>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xl font-medium">
                    Are you a current or former student?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      MyCred provides fast and easy access to request and sends
                      your transcripts, graduation awards, credentials, badges
                      and other academic documents to employers, government
                      offices and others. Designed by leaders from Canadian
                      colleges, institutes, and universities, MyCred is
                      convenient, official, and recognized as the official
                      platform for document and credential verification. With
                      MyCred, you get access to a secure, password-protected
                      learner credential wallet that allows you to share your
                      credentials anytime, anywhere.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-xl font-medium">
                    Do you represent an employer, regulatory body, government or
                    international organization?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      MyCred provides fast and easy access for students and
                      graduates to request and send their transcripts,
                      graduation awards, credentials, badges and other academic
                      documents to employers, government and others all over the
                      world. Designed by leaders from Canadian colleges,
                      institutes, and universities and experts in data systems
                      architecture, MyCred is convenient, official, and
                      recognized as the official platform for document and
                      credential verification. If you receive a document through
                      MyCred, no further verification is required.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-xl font-medium">
                    Are you a representative from a university, college, CEGEP,
                    credential evaluation firm or application centre?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4 text-gray-700">
                      MyCred provides fast and easy access for you to receive
                      official transcripts, graduation awards, credentials and
                      other academic documents from around the world to aid
                      admissions assessment. You can maximize its capabilities,
                      modernize your infrastructure and ramp up your supports
                      for students and graduates at a time when providing fast,
                      high quality, cloud services and using innovative
                      technology have become baseline expectations. By joining
                      MyCred, you will help your students and graduates move
                      their official documents, transcripts, badges and
                      micro-credentials where they need them to go without
                      having to come to campus. Designed by leaders from
                      Canadian colleges and universities, and international data
                      systems architects, MyCred is convenient, official, and
                      recognized as the official Canadian platform for document
                      and credential verification and exchange.
                    </p>
                    <p className="text-gray-700">
                      With MyCred, you get a secure document highway and
                      students and graduates get a secure, password protected
                      credential wallet that allows them to share their
                      credentials anytime, anywhere.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="order-1 md:order-2">
              <div className="h-full min-h-[400px] overflow-hidden rounded-lg">
                <img
                  src="/images/iStock-478781132-1024x1534.jpg"
                  alt="Students Sitting With Tablet"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FooterSection = () => {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Section – Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2">M-Learning</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Empowering students with modern learning solutions. We provide affordable,
            accessible, and quality education powered by technology.
          </p>
          <div className="mt-4 space-y-1 text-sm text-gray-700 dark:text-gray-400">
            <p>Email: support@mlearning.com</p>
            <p>Phone: +91-9773012650</p>
            <p>Location: Ahmedabad, Gujarat</p>
          </div>
        </div>

        {/* Right Section – FAQs Accordion */}
        <div>
          <h2 className="text-xl font-semibold mb-4">FAQs</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I contact support?</AccordionTrigger>
              <AccordionContent>
                You can reach us via email at support@mlearning.com or call our helpline.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I refund a course?</AccordionTrigger>
              <AccordionContent>
                Refunds are subject to our refund policy. Please refer to our terms and conditions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

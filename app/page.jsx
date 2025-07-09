import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { faqItems, recruiterFaqItems } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ImageGrid from "@/components/image-grid";
import Banner from "@/components/banner";
import { getJobs } from "@/actions/server";
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import SmartLink from "@/components/SmartLink";

export default async function HomePage() {
  const jobs = await getJobs();
  const isAdmin = false;

  

  return (
   <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen">

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-white dark:bg-black text-center">
  <div className="max-w-5xl mx-auto px-4">
  <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight 
  text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 
  dark:[background-image:linear-gradient(to_right,#22c55e,#3b82f6)]">
  Discover Your Dream <br /> Job & Internship
</h1>

    <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-400 mt-6 font-light">
      Powering careers with cutting-edge opportunities and intuitive navigation.
    </p>

    <div className="flex flex-wrap justify-center items-center gap-6 mt-10">
  <SmartLink href="/jobsss">
    <Button className="h-14 w-44 text-lg text-white shadow-lg hover:scale-105 transition
      bg-gradient-to-r from-red-500 to-pink-500
      dark:[background-image:linear-gradient(to_right,#ef4444,#ec4899)]">
      Explore Jobs
    </Button>
  </SmartLink>
  <SmartLink href="/internship">
    <Button className="h-14 w-44 text-lg text-white shadow-lg hover:scale-105 transition
      bg-gradient-to-r from-green-500 to-teal-400
      dark:[background-image:linear-gradient(to_right,#22c55e,#14b8a6)]">
      Internships
    </Button>
  </SmartLink>
</div>

  </div>
</section>


      {/* Popular Companies */}
      <section className=" ">
        <div className="  mx-8 ">
          <div className="flex justify-between items-center mb-10">
           <h2 className="text-3xl font-bold text-transparent bg-clip-text 
  bg-gradient-to-r from-yellow-400 to-orange-500 
  dark:[background-image:linear-gradient(to_right,#facc15,#f97316)]">
  Popular Companies
</h2>

          </div>
          <ImageGrid />
        </div>
      </section>

    

      {/* FAQ Section */}
      {!isAdmin && (
      <section className="py-16 bg-gray-100 dark:bg-zinc-900">

          <div className="mx-2 px-4">
            <h2 className="text-3xl font-semibold text-center mb-10 text-white">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      

      <footer className="bg-gray-100 text-gray-700 dark:bg-zinc-900 dark:text-gray-300 py-10 mt-20 border-t border-gray-300 dark:border-zinc-800">

            <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
              {/* Left side */}
              <div className="text-center sm:text-left space-y-1">
                <h4 className="text-lg font-semibold">Sourav Singhal</h4>
                <p className="text-sm">© {new Date().getFullYear()} All rights reserved.</p>
                <p className="text-sm">Made with ❤️ by Sourav Singhal</p>
              </div>
      
              {/* Middle: Message instead of just "Contact" */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Let’s connect and build something amazing together.
                </p>
                <p className="text-sm">
                  <a
                    href="mailto:contactsouravsinghal@gmail.com"
                    className="text-blue-400 hover:underline"
                    title="Send an Email"
                  >
                    contactsouravsinghal@gmail.com
                  </a>
                </p>
              </div>
      
              {/* Right: Enhanced social icons */}
              <div className="flex gap-6 text-sm">
                <a
                  href="https://github.com/souravsinghal2004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center hover:text-blue-400 transition"
                  title="GitHub"
                >
                  <FaGithub className="text-2xl" />
                  <span className="text-xs mt-1">GitHub</span>
                </a>
      
                <a
                  href="https://www.linkedin.com/in/sourav-singhal-a860b5259/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center hover:text-blue-400 transition"
                  title="LinkedIn"
                >
                  <FaLinkedin className="text-2xl text-blue-500" />
                  <span className="text-xs mt-1">LinkedIn</span>
                </a>
      
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=contactsouravsinghal@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center hover:text-blue-400 transition"
                  title="Send Email"
                >
                  <FaEnvelope className="text-2xl text-red-400" />
                  <span className="text-xs mt-1">Email</span>
                </a>
              </div>
            </div>
          </footer>
    </div>
  );
}

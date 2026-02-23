import TextReveal from "../animations/TextReveal";
import Footer from "../dan-max/Footer";
import Herosection from "./Herosection";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";



export default function YukiSatoPage({ serverData }: { serverData: any }) {

   const yuki = serverData?.pageBy?.yuki;

   if (!yuki) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-800">
        <p className="text-white text-xl">No data found</p>
      </div>
    );
  }


  return (
    <div className="danmax-section full-body-container">
      {/* Hero Section — renders immediately, hero image starts loading ASAP */}
      <Herosection data={yuki} />

      {/* Section 2 */}
      <div className="danmax-section2 section2">
        {/* Quote Section */}
        <div className="Quote-Section">
          <TextReveal className="danmax-textreveal">
            <h3>
              {yuki.section2Paragraph}
            </h3>
            <div className="Quote-Section-para">
              <p>
                - {yuki.photographerName}
              </p>
            </div>
          </TextReveal>
        </div>

        {/* Portfolio Grid */}
        <Section2 data={yuki} />

        {/* Button */}
        <div className="danmax-btn-section ">
          <div className="danmax-btn">
            <p className="color-transition-text">
              {yuki.section2Button}
            </p>
          </div>
        </div>

        {/* About */}
        <Section3 data={yuki} />

        {/* Testimonials */}
        <Section4 data={yuki} />
      </div>

      {/* CTA */}
      <Section5 />



      <Footer />
    </div>
  )

}
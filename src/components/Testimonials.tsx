import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Radhey Raman Steel Suppliers provides exceptional quality steel products. Their RINL/SAIL inventory is always well-stocked and delivered on time.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Rajesh Kumar",
    role: "Construction Manager",
  },
  {
    text: "Working with Radhey Raman for the past 5 years. Reliable service, competitive pricing, and authentic products. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Priya Singh",
    role: "Manufacturing Director",
  },
  {
    text: "The best authorized dealer in UP. Their expertise in steel sourcing and customer support is unmatched. Trust them completely.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Vikram Patel",
    role: "Building Contractor",
  },
  {
    text: "Outstanding quality assurance and consistent supply. Radhey Raman Steel Suppliers is our go-to partner for all steel requirements.",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Anita Gupta",
    role: "Procurement Officer",
  },
  {
    text: "Excellent customer service and genuine RINL/SAIL products. They understand the construction industry and deliver accordingly.",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Arjun Malhotra",
    role: "Project Engineer",
  },
  {
    text: "Since 1979, they've been the trusted name for quality steel. Their commitment to excellence is evident in every transaction.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Meera Sharma",
    role: "Supply Chain Manager",
  },
  {
    text: "Fast delivery, authentic products, and fair pricing. Radhey Raman Steel Suppliers sets the industry standard.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Sanjay Verma",
    role: "Industrial Buyer",
  },
  {
    text: "Professional team with deep knowledge of steel products. They've helped us optimize our construction projects significantly.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Divya Nair",
    role: "Project Manager",
  },
  {
    text: "Building our factory was made easier thanks to their reliable steel supply. Radhey Raman is the foundation of our success.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Nikhil Sharma",
    role: "Factory Owner",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function Testimonials() {
  return (
    <section className="bg-white py-24 px-4 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-blue-300/30 py-1 px-4 rounded-lg text-blue-600">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-darkGray">
            What our customers say
          </h2>
          <p className="text-center mt-5 opacity-75 text-gray-600">
            See what our valued clients have to say about Radhey Raman Steel Suppliers.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Radhey Raman Steel Suppliers provides exceptional quality steel products. Their RINL/SAIL inventory is always well-stocked and delivered on time.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    name: "Rajesh Kumar",
    role: "Construction Manager",
  },
  {
    text: "Working with Radhey Raman for the past 5 years. Reliable service, competitive pricing, and authentic products. Highly recommended!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    name: "Priya Singh",
    role: "Manufacturing Director",
  },
  {
    text: "The best authorized dealer in UP. Their expertise in steel sourcing and customer support is unmatched. Trust them completely.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
    name: "Vikram Patel",
    role: "Building Contractor",
  },
  {
    text: "Outstanding quality assurance and consistent supply. Radhey Raman Steel Suppliers is our go-to partner for all steel requirements.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
    name: "Anita Gupta",
    role: "Procurement Officer",
  },
  {
    text: "Excellent customer service and genuine RINL/SAIL products. They understand the construction industry and deliver accordingly.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop",
    name: "Arjun Malhotra",
    role: "Project Engineer",
  },
  {
    text: "Since 1979, they've been the trusted name for quality steel. Their commitment to excellence is evident in every transaction.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    name: "Meera Sharma",
    role: "Supply Chain Manager",
  },
  {
    text: "Fast delivery, authentic products, and fair pricing. Radhey Raman Steel Suppliers sets the industry standard.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop",
    name: "Sanjay Verma",
    role: "Industrial Buyer",
  },
  {
    text: "Professional team with deep knowledge of steel products. They've helped us optimize our construction projects significantly.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
    name: "Divya Nair",
    role: "Project Manager",
  },
  {
    text: "Building our factory was made easier thanks to their reliable steel supply. Radhey Raman is the foundation of our success.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
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
            <div className="border border-orange-300/30 py-1 px-4 rounded-lg text-orange-500">Testimonials</div>
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

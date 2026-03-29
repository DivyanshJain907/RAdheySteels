'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface TimelineEntry {
  _id: string;
  heading: string;
  description: string;
  image?: string;
  year: number;
}

export function Timeline() {
  const [timelineEntries, setTimelineEntries] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimeline();
  }, []);

  const fetchTimeline = async () => {
    try {
      const response = await fetch('/api/timeline');
      if (response.ok) {
        const data = await response.json();
        // Sort by year descending (newest first)
        const sorted = data.sort((a: TimelineEntry, b: TimelineEntry) => b.year - a.year);
        setTimelineEntries(sorted);
      }
    } catch (error) {
      console.error('Error fetching timeline:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 md:py-24 px-4 bg-white text-center">
        <div className="animate-spin text-orange-500 text-3xl">⟳</div>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-orange-500 font-semibold text-sm md:text-base uppercase tracking-wider"
          >
            Our Journey
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-700 mt-2">Our Contributions</h2>
          <p className="text-slate-700 text-base md:text-lg">
            Discover the milestones and achievements that define our success as Radhey Raman Steel Suppliers.
          </p>
        </motion.div>

        {timelineEntries.length > 0 ? (
          <>
            {/* Mobile Carousel View */}
            <div className="md:hidden">
              <div className="relative w-full overflow-hidden px-2">
                <div className="animate-scroll-timeline flex gap-6">
                  {[...timelineEntries, ...timelineEntries].map((entry, index) => (
                    <div
                      key={`${entry._id}-${index}`}
                      className="flex-shrink-0 w-72"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-slate-50 p-6 rounded-lg border-l-4 border-orange-500 h-full flex flex-col hover:shadow-lg transition"
                      >
                        <div className="text-orange-500 font-bold text-2xl mb-2">{entry.year}</div>
                        <h3 className="text-lg font-bold text-gray-700 mb-3">{entry.heading}</h3>
                        {entry.image && (
                          <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-lg mt-auto">
                            <Image
                              src={entry.image}
                              alt={entry.heading}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Timeline View */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-transparent"></div>

                <div className="space-y-12 md:space-y-16">
                  {timelineEntries.map((entry, index) => (
                    <motion.div
                      key={entry._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex flex-col md:flex-row gap-6 md:gap-8 ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Content */}
                      <div className="w-full md:w-1/2">
                        <div className="bg-slate-50 p-6 md:p-8 rounded-lg border-l-4 border-orange-500 hover:shadow-lg transition">
                          <div className="text-orange-500 font-bold text-2xl md:text-3xl mb-2">{entry.year}</div>
                          <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-3">{entry.heading}</h3>
                        </div>
                      </div>

                      {/* Image & Timeline dot */}
                      <div className="w-full md:w-1/2 flex flex-col items-center justify-start">
                        {/* Timeline dot */}
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-orange-500 rounded-full border-4 border-white shadow-lg z-10"
                        ></motion.div>

                        {/* Image */}
                        {entry.image && (
                          <div className="relative w-full h-64 md:h-72 rounded-lg overflow-hidden shadow-lg">
                            <Image
                              src={entry.image}
                              alt={entry.heading}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <style>{`
              @keyframes scroll-timeline {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }

              .animate-scroll-timeline {
                animation: scroll-timeline 40s linear infinite;
                width: fit-content;
              }

              .animate-scroll-timeline:hover {
                animation-play-state: paused;
              }
            `}</style>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-700">No timeline entries yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}

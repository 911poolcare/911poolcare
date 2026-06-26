export type Testimonial = {
  name: string;
  quote: string;
  highlight?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Alejandro Alderete",
    quote:
      "I had 5 pool companies look at my pool and couldn't get it working. Chris diagnosed the issue right away and had my pool running in no time. He even walked me through maintaining the pool. Highly recommend!",
    highlight: "Diagnosed the issue right away",
  },
  {
    name: "Ben Griffith",
    quote:
      "Top notch services all around. Their team has successfully detected pool leaks on many properties we service. Great communication, fair prices, and an overall great experience.",
    highlight: "Great communication, fair prices",
  },
  {
    name: "N R",
    quote:
      "Chris was extremely personable on the phone and immediately put me on their schedule. Reasonable estimate, work completed as soon as parts arrived. Beyond delighted with the professionalism and quality.",
    highlight: "Immediately put me on their schedule",
  },
];

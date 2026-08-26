/**
 * ============================================================
 *  PRIME LOGO HUB — SITE CONFIGURATION
 * ============================================================
 *  Edit everything in THIS file to update the live website.
 *  You do not need to touch index.html, style.css or main.js
 *  for any of the changes listed below.
 * ============================================================
 */

const SITE_CONFIG = {

  // --------------------------------------------------------
  // BRAND
  // --------------------------------------------------------
  brand: "Prime Logo Hub",
  tagline: "Creative Design. Smart Marketing. Digital Growth.",

  // --------------------------------------------------------
  // CONTACT — WhatsApp number
  // --------------------------------------------------------
  // Enter the number in ANY readable format (spaces/dashes are
  // fine). It is automatically converted to the international
  // Pakistan WhatsApp format (92XXXXXXXXXX) by js/main.js.
  whatsappNumberRaw: "0346-10-44-21",

  // Optional business email. Leave as "" to hide it on the site.
  email: "",

  // Physical address shown in the Contact section & footer.
  address: "Street 3, House 212, Lahore, Pakistan",
  location: "Lahore, Pakistan",

  // --------------------------------------------------------
  // SOCIAL LINKS
  // --------------------------------------------------------
  // Leave a value as "" to hide that icon instead of linking
  // to a fake / placeholder profile.
  socials: {
    instagram: "",
    facebook: "",
    linkedin: ""
  },

  // --------------------------------------------------------
  // SERVICES (shown in the Services section)
  // --------------------------------------------------------
  services: [
    {
      icon: "video",
      title: "Video Editing",
      description: "Reels, Shorts, YouTube videos, promotional videos, motion graphics and professional business videos.",
      featured: true
    },
    {
      icon: "palette",
      title: "Graphic Designing",
      description: "Logo design, brand identity, social media posts, advertisements, banners, presentations and marketing creatives.",
      featured: true
    },
    {
      icon: "megaphone",
      title: "Social Media Marketing",
      description: "Social media management, content strategy, content creation, posting, audience growth and paid advertising.",
      featured: true
    },
    {
      icon: "cpu",
      title: "AI Automation",
      description: "AI workflows, business automation, lead automation, customer support automation, WhatsApp automation and AI-powered business solutions.",
      featured: true
    },
    {
      icon: "code",
      title: "Website Development",
      description: "Business websites, landing pages, portfolio websites, e-commerce websites and responsive websites.",
      featured: true
    },
    {
      icon: "target",
      title: "Digital Marketing",
      description: "Complete digital marketing solutions designed to improve online visibility, leads and business growth.",
      featured: false
    },
    {
      icon: "briefcase",
      title: "Branding",
      description: "Complete brand identity systems built to make a business look consistent, credible and memorable.",
      featured: false
    },
    {
      icon: "camera",
      title: "Social Media Content Creation",
      description: "Scroll-stopping graphics, reels and captions created specifically for your brand's platforms and audience.",
      featured: false
    }
  ],

  // --------------------------------------------------------
  // TEAM — replace "placeholder: true" with your real details
  // --------------------------------------------------------
  team: [
    { role: "Graphic Designer",          name: "Add Name", placeholder: true },
    { role: "Video Editor",              name: "Add Name", placeholder: true },
    { role: "Social Media Manager",      name: "Add Name", placeholder: true },
    { role: "Digital Marketer",          name: "Add Name", placeholder: true },
    { role: "AI Automation Specialist",  name: "Add Name", placeholder: true },
    { role: "Web Developer",             name: "Add Name", placeholder: true }
  ],

  // --------------------------------------------------------
  // PORTFOLIO — add real projects with { title, category, image }
  // category must be one of: graphic-design, video-editing,
  // social-media, branding, websites, marketing
  // --------------------------------------------------------
  portfolio: [
    { title: "Add your project title", category: "graphic-design", image: "", placeholder: true },
    { title: "Add your project title", category: "video-editing",   image: "", placeholder: true },
    { title: "Add your project title", category: "social-media",    image: "", placeholder: true },
    { title: "Add your project title", category: "branding",        image: "", placeholder: true },
    { title: "Add your project title", category: "websites",        image: "", placeholder: true },
    { title: "Add your project title", category: "marketing",       image: "", placeholder: true }
  ],

  // --------------------------------------------------------
  // TESTIMONIALS — add { quote, name, business } once you have
  // real client feedback. Nothing is shown until you add it.
  // --------------------------------------------------------
  testimonials: [
    // Example — uncomment and edit once you have a real review:
    // { quote: "Client feedback goes here.", name: "Client Name", business: "Business Name" }
  ]

};

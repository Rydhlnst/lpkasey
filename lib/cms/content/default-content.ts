import { NAVBAR_CTA, NAVIGATION_ITEMS } from "@/constants/navigation";
import { COMPANY_LINKS, PROGRAMME_SUMMARY_LINKS, SOCIAL_LINKS } from "@/constants/links";
import { SITE_CONFIG } from "@/constants/site";
import { SERVICES, getServiceBySlug, getServiceDetailFallback } from "@/constants/services";
import { KAUAE_RARO_VALUES, KAUAE_RUNGA_VALUES } from "@/constants/values";

const LEADERSHIP_PILLARS_DEFAULT = [
  { slug: "ariki", name: "Ariki", meta: "Blue - Water", meaning: "Te Wai - Leader", cta: "Explore Pillar", media: { url: "", altText: "Ariki pillar image" } },
  { slug: "tohunga", name: "Tohunga", meta: "Red - Fire", meaning: "Te Ahi - Learner", cta: "Explore Pillar", media: { url: "", altText: "Tohunga pillar image" } },
  { slug: "mangotoa", name: "Mangotoa", meta: "Yellow - Air", meaning: "Te Haa - Leverager", cta: "Explore Pillar", media: { url: "", altText: "Mangotoa pillar image" } },
  { slug: "aronui", name: "Aronui", meta: "Green - Earth", meaning: "Papatuanuku - Lover / Nurturer", cta: "Explore Pillar", media: { url: "", altText: "Aronui pillar image" } },
];

const LEADERSHIP_FAQ_DEFAULT = [
  {
    question: "What are the four leadership styles?",
    answer: "Ariki, Tohunga, Mangotoa, and Aronui represent distinct ways of leading, learning, leveraging opportunity, and nurturing others.",
  },
  {
    question: "How do these styles support group growth?",
    answer: "They help people understand how they show up, communicate better, and contribute in ways that strengthen the collective.",
  },
  {
    question: "Can someone carry more than one style?",
    answer: "Yes. These are not fixed labels. People can grow across styles and use different strengths in different contexts.",
  },
  {
    question: "Why are these linked with Te Wai, Te Ahi, Te Haa, and Papatuanuku?",
    answer: "The elements provide cultural language and symbolism that make each leadership expression easier to understand and apply.",
  },
  {
    question: "How can I start applying these leadership styles?",
    answer: "Start by identifying your strongest style, then consciously develop the others to balance vision, learning, action, and care.",
  },
];

const FEATURED_CATEGORIES_DEFAULT = [
  { label: "ARIKI", title: "Tumuakitanga", description: "Blue / Te Wai: leadership that gives direction, clarity, and identity." },
  { label: "TOHUNGA", title: "Awatea", description: "Red / Te Ahi: the learner's path through knowledge, growth, and discipline." },
  { label: "MANGOTOA", title: "Tautika", description: "Yellow / Te Haa: practical courage, action, and leverage in everyday life." },
  { label: "ARONUI", title: "Rauemi", description: "Green / Papatuanuku: nurturing resources, care, and collective wellbeing." },
];

export function getDefaultCmsContentBySlug(slug: string): Record<string, unknown> {
  if (slug === "home") {
    return {
      hero: {
        sectionLabel: "Hero Section",
        mobileHint: "Swipe to explore ->",
        title: SITE_CONFIG.heroTitle,
        subtitle: SITE_CONFIG.heroSubtitle,
        intro: SITE_CONFIG.heroIntro,
        mediaImage: {
          url: "",
          altText: "Hero image",
        },
        mediaVideo: {
          url: "",
          altText: "Hero video",
        },
      },
      links: {
        brandLogo: { label: "Home", href: "/" },
        navbarItems: NAVIGATION_ITEMS,
        navbarCta: NAVBAR_CTA,
        socialLinks: SOCIAL_LINKS,
        companyLinks: COMPANY_LINKS,
        programmeSummaryLinks: PROGRAMME_SUMMARY_LINKS,
      },
      site: {
        name: SITE_CONFIG.name,
        tagline: SITE_CONFIG.tagline,
      },
      home: {
        hero: {
          sectionLabel: "Hero Section",
          mobileHint: "Swipe to explore ->",
          title: SITE_CONFIG.heroTitle,
          subtitle: SITE_CONFIG.heroSubtitle,
          intro: SITE_CONFIG.heroIntro,
        },
        heroPillars: [
          {
            label: "Te Wai",
            title: "Tumuakitanga",
            description: "Leadership that gives direction, clarity, and identity.",
            cta: "Explore",
            ctaLink: { label: "Explore", href: "/about/ariki" },
            cardLink: { label: "Open ARIKI pillar", href: "/about/ariki" },
          },
          {
            label: "Te Ahi",
            title: "Awatea",
            description: "The learner's path through knowledge, growth, and discipline.",
            cta: "Explore",
            ctaLink: { label: "Explore", href: "/about/tohunga" },
            cardLink: { label: "Open TOHUNGA pillar", href: "/about/tohunga" },
          },
          {
            label: "Te Haa",
            title: "Tautika",
            description: "Practical courage, action, and leverage in everyday life.",
            cta: "Explore",
            ctaLink: { label: "Explore", href: "/about/mangotoa" },
            cardLink: { label: "Open MANGOTOA pillar", href: "/about/mangotoa" },
          },
          {
            label: "Papatuanuku",
            title: "Rauemi",
            description: "Nurturing resources, care, and collective wellbeing.",
            cta: "Explore",
            ctaLink: { label: "Explore", href: "/about/aronui" },
            cardLink: { label: "Open ARONUI pillar", href: "/about/aronui" },
          },
        ],
        navbar: {
          openMenuLabel: "Open menu",
        },
        footer: {
          tagline: SITE_CONFIG.tagline,
          quickLinksTitle: "Quick Links",
          companyTitle: "Company",
          ctaText: "Have questions or want to get involved?",
          copyright: `Copyright 2026 ${SITE_CONFIG.name}. All rights reserved.`,
        },
        genericHero: {
          title: `${SITE_CONFIG.heroTitle} 💙❤💛💚`,
          subtitle: SITE_CONFIG.heroSubtitle,
          intro: SITE_CONFIG.heroIntro,
          meaning: SITE_CONFIG.heroMeaning,
          phrase: SITE_CONFIG.phrase,
          phraseSubtitle: SITE_CONFIG.phraseSubtitle,
          ctas: PROGRAMME_SUMMARY_LINKS.map((item) => ({ label: item.title, link: { label: item.title, href: item.href } })),
          mediaMain: { url: "", altText: "Hero image" },
        },
        aboutSection: {
          cardTitle: "About Section",
          cardDescription:
            "Te Pae O Te Rangi is a place of healing, connection, growth and empowerment grounded in kaupapa Maori values.",
          title: "About Te Pae O Te Rangi",
          description1:
            "We believe in creating safe spaces where people can come together to heal, learn, grow, reconnect and strengthen their sense of identity, purpose and wellbeing.",
          description2:
            "Through leadership, creativity, emotional wellbeing, cultural connection and community support, we empower whanau, rangatahi, tane, wahine and tamariki to recognise their value, their worth and their potential.",
          ctaLabel: "About Us",
          ctaLink: { label: "About Us", href: "/about" },
          mediaMain: { url: "", altText: "About section image" },
          metrics: [
            {
              value: "XXX",
              text: "Te Pae O Te Rangi is a place of healing, connection, growth and empowerment grounded in kaupapa Maori values.",
            },
            {
              value: "XXX",
              text: "We believe in creating safe spaces where people can come together to heal, learn, grow, reconnect and strengthen their sense of identity, purpose and wellbeing.",
            },
            {
              value: "XXX",
              text: "Through leadership, creativity, emotional wellbeing, cultural connection and community support, we empower whanau, rangatahi, tane, wahine and tamariki to recognise their value, their worth and their potential.",
            },
          ],
        },
        podcastHero: {
          badge: "Podcast Experience",
          title: "Find and listen your favorite artist podcast here!",
          description: "The best podcast websites communicate a feel and make it easy for visitors to discover your podcast.",
          ctaPrimary: "Get Started",
          ctaSecondary: "Explore channels",
          mediaMain: { url: "", altText: "Podcast hero image" },
        },
        ctaSection: {
          title: "Stay Connected",
          submitLabel: "Sign Me Up",
          fields: {
            firstNameLabel: "Name (Required)",
            lastNameLabel: "Last Name (Required)",
            emailLabel: "Email Address (Required)",
          },
        },
        whoWeSupport: [
          "Rangatahi seeking identity, confidence, and leadership",
          "Whanau seeking healing and reconnection",
          "Tane and wahine needing safe support spaces",
          "Tamariki and taiohi developing emotional and cultural grounding",
          "Individuals seeking physical, emotional, and spiritual realignment",
          "Communities looking for kaupapa Maori-led growth and wellbeing",
        ],
        ourApproach: [
          "Kaupapa Maori values",
          "Cultural identity and belonging",
          "Emotional safety",
          "Practical life skills",
          "Creative healing",
          "Leadership development",
          "Community connection",
          "Balance between reflection and action",
        ],
        whoWeSupportHeader: {
          badge: "Community Focus",
          title: "Who We Support",
        },
        ourApproachHeader: {
          badge: "Kaupapa Method",
          title: "Our Approach",
        },
        whyItMattersHeader: {
          badge: "Purpose",
          title: "Why It Matters",
        },
        programmeSummaryHeader: {
          badge: "Programme Overview",
          title: "Programme Summary",
          description: "Key pathways that connect leadership, healing, practical support, and cultural grounding.",
        },
        whyItMatters: {
          p1: "Many people carry more than they show. Disconnection, pressure, emotional pain, uncertainty, and lack of support can slowly affect identity, confidence, relationships, and wellbeing.",
          p2: "Te Pae O Te Rangi exists because people need places where they are not treated as problems to be fixed, but as people with mana, potential, and a story worth honoring.",
          p3: "Our kaupapa helps people reconnect with themselves, their culture, their community, and their next step forward.",
        },
        programmeSummary: [
          {
            title: "Leadership & Identity",
            text: "Outdoor learning, Mau Rakau, cultural grounding, and rangatahi development.",
          },
          {
            title: "Healing & Wellbeing",
            text: "Music, journaling, Romiromi, Mirimiri, and emotional restoration.",
          },
          {
            title: "Community Support",
            text: "Men's and women's support groups designed for safe connection and growth.",
          },
          {
            title: "Cultural Frameworks",
            text: "Te Whiringawha, Kauae Runga, Kauae Raro, and Tau as guiding principles.",
          },
        ],
        impact: {
          label: "About Te Pae O Te Rangi",
          title: "Healing, Connection, Growth and Empowerment",
          summary: "Te Pae O Te Rangi is a place of healing, connection, growth and empowerment grounded in kaupapa Maori values.",
          description: "Through leadership, creativity, emotional wellbeing, cultural connection and community support, we empower whanau, rangatahi, tane, wahine and tamariki to recognise their value, their worth and their potential.",
          metrics: [
            { value: "Whanau", label: "Empowered Through Connection" },
            { value: "Rangatahi", label: "Growing Identity & Leadership" },
            { value: "Tamariki", label: "Supported To Thrive" },
          ],
          mediaImage: {
            url: "",
            altText: "Impact image",
          },
          mediaVideo: {
            url: "",
            altText: "Impact video",
          },
        },
        visionMission: {
          label: "Vision and Mission",
          title: SITE_CONFIG.description,
          visionHeading: "Our Vision",
          visionText: SITE_CONFIG.heroMeaning,
          missionHeading: "Our Mission",
          missionText:
            "We believe in creating safe spaces where people can come together to heal, learn, grow, reconnect and strengthen their sense of identity, purpose and wellbeing.",
          ctaPrimary: "Join a Programme",
          ctaSecondary: "Learn More",
          ctaPrimaryLink: { label: "Join a Programme", href: "/services" },
          ctaSecondaryLink: { label: "Learn More", href: "/about" },
          mediaMain: { url: "", altText: "Vision image" },
        },
        valuesFramework: {
          label: "Values Framework",
          title: "KAUAE RUNGA & KAUAE RARO",
          upperSubheading: "KAUAE RUNGA",
          lowerSubheading: "KAUAE RARO",
          upper: KAUAE_RUNGA_VALUES.map((item) => ({
            group: "KAUAE RUNGA",
            title: item.title,
            keyword: item.keyword,
            text: item.text,
            media: { url: "", altText: `${item.title} image` },
            ctaPrimary: "View Value",
            ctaSecondary: "Learn More",
            ctaPrimaryLink: { label: "View Value", href: "/services" },
            ctaSecondaryLink: { label: "Learn More", href: "/about" },
          })),
          lower: KAUAE_RARO_VALUES.map((item) => ({
            group: "KAUAE RARO",
            title: item.title,
            keyword: item.keyword,
            text: item.text,
            media: { url: "", altText: `${item.title} image` },
            ctaPrimary: "View Value",
            ctaSecondary: "Learn More",
            ctaPrimaryLink: { label: "View Value", href: "/services" },
            ctaSecondaryLink: { label: "Learn More", href: "/about" },
          })),
        },
        leadershipPillars: {
          heading: "Our Leadership Styles",
          description:
            "Through Te Whiringawha, we recognize four leadership styles that help people understand themselves and how they relate to others.",
          faqHeading: "Frequently Asked Questions",
          pillars: LEADERSHIP_PILLARS_DEFAULT.map((item) => ({
            ...item,
            ctaLink: { label: "Explore Pillar", href: `/about/${item.slug}` },
            cardLink: { label: `Open ${item.name} pillar page`, href: `/about/${item.slug}` },
          })),
          faq: LEADERSHIP_FAQ_DEFAULT,
        },
        featuredCategories: {
          heading: "Featured Categories",
          items: FEATURED_CATEGORIES_DEFAULT.map((item, index) => ({
            ...item,
            link: {
              label: `View ${item.title} Members`,
              href: ["/members/ariki", "/members/tohunga", "/members/mangotoa", "/members/aronui"][index] ?? "/about",
            },
          })),
        },
        teamSpotlight: {
          badge: "Our Team",
          title: "Meet Our Expert Team",
          description: "The division combines strategy, care, and practical execution to support people and communities.",
          members: [],
        },
        about: {
          mediaHero: {
            url: "",
            altText: "About hero image",
          },
        },
        communitySupport: {
          mediaHero: {
            url: "",
            altText: "Community support hero image",
          },
          mediaMensGroup: {
            url: "",
            altText: "Men group image",
          },
          mediaWomensGroup: {
            url: "",
            altText: "Women group image",
          },
          mensGroup: {
            ctaLink: { label: "Contact us", href: "/contact" },
          },
          joinCtaLink: { label: "Join a Support Group", href: "/contact" },
        },
        services: {
          highlightMedia: SERVICES.slice(0, 6).map((service, index) => ({
            image: { url: "", altText: service.placeholderLabel || `Service image ${index + 1}` },
          })),
          list: SERVICES.map((service) => ({
            title: service.title,
            description: service.summary,
            ctaLabel: service.ctaLabel,
            ctaLink: { label: service.ctaLabel, href: `/services/${service.slug}` },
          })),
        },
        contact: {
          mediaMap: {
            url: "",
            altText: "Map image",
          },
          socialLinks: SOCIAL_LINKS.map((item, index) => ({
            label: `External link ${index + 1}`,
            href: item.href,
            newTab: true,
          })),
        },
      },
    };
  }

  if (slug === "privacy") {
    return {
      content: {
        badge: "Legal",
        title: "Privacy Policy",
        paragraphs: [
          "We respect your privacy and only collect information needed to respond to enquiries, coordinate programmes, and provide support services effectively.",
          "Personal information shared through forms, messages, or session coordination is handled with care and is not sold to third parties. Access is limited to relevant team members and trusted service providers.",
          "If you would like to request updates or removal of personal information, please contact us directly.",
        ],
        cta: "Request privacy support",
        ctaLink: { label: "Request privacy support", href: "/contact" },
      },
    };
  }

  if (slug === "terms") {
    return {
      content: {
        badge: "Legal",
        title: "Terms & Conditions",
        paragraphs: [
          "These terms describe the general conditions for using Te Pae O Te Rangi services and website content. By engaging with our programmes, contact channels, or digital pages, you agree to respectful and lawful use.",
          "Programme availability, session timing, and support scope may change over time. We encourage all visitors to confirm current details through our contact team before making commitments.",
          "For specific guidance related to bookings, cancellations, and referrals, please contact us directly.",
        ],
        cta: "Contact our team",
        ctaLink: { label: "Contact our team", href: "/contact" },
      },
    };
  }

  if (slug === "cookie-preferences") {
    return {
      content: {
        badge: "Legal",
        title: "Cookie Preferences",
        paragraphs: [
          "Cookie preferences help you control how this website remembers session settings and measures general performance. You can adjust browser-level controls at any time.",
          "Essential cookies may remain active to support core website functionality. Optional analytics or experience cookies can be limited through your device and browser settings.",
          "If you need help understanding available options, our team can guide you.",
        ],
        cta: "Ask about cookie settings",
        ctaLink: { label: "Ask about cookie settings", href: "/contact" },
      },
    };
  }

  if (slug.startsWith("services-")) {
    const serviceSlug = slug.replace(/^services-/, "");
    const service = getServiceBySlug(serviceSlug);

    if (service) {
      return getServiceDetailFallback(service);
    }
  }

  if (slug.startsWith("programmes-")) {
    const cta1Href =
      slug === "programmes-cultural-frameworks"
        ? "/about"
        : slug === "programmes-community-support"
          ? "/community-support"
          : "/services";

    return {
      content: {
        badge: "Programme Detail",
        title: "",
        paragraphs: ["", ""],
        cta1: "View related services",
        cta2: "Enquire about this programme",
        cta1Link: { label: "View related services", href: cta1Href },
        cta2Link: { label: "Enquire about this programme", href: "/contact" },
      },
    };
  }

  if (slug.startsWith("about-")) {
    return {
      content: {
        hero: { badge: "", title: "", description: "", overview: "" },
        team: { badge: "Our Team", title: "Meet Our Expert Team", description: "", members: [] },
        faq: { badge: "For Your Questions", title: "Frequently Asked Questions", description: "", items: [] },
        next: {
          badge: "Next Division",
          title: "Explore Other Divisions",
          backCta: "Back to About",
          backCtaLink: { label: "Back to About", href: "/about" },
          items: {},
        },
      },
    };
  }

  if (slug.startsWith("members-")) {
    return {
      content: {
        hero: { badge: "Category Members", title: "", subtitle: "" },
        team: { badge: "Our Team", title: "Meet The Team", description: "", members: [] },
        insight: {
          badge: "Team Insight",
          title: "Collective Progress Starts with Support",
          description: "Shared values and trusted relationships help each member move from challenge to stability.",
          quote: "When people feel seen and supported, collective progress becomes possible.",
        },
      },
    };
  }

  return {
    links: {
      navbarItems: NAVIGATION_ITEMS,
      navbarCta: NAVBAR_CTA,
      socialLinks: SOCIAL_LINKS,
      companyLinks: COMPANY_LINKS,
    },
  };
}

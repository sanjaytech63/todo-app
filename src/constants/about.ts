import { AboutHero, AboutStory, AboutValue, TeamMember, AboutCTA } from '@/types/about';

export const aboutContent = {
  hero: {
    title: "About",
    highlightedTitle: "Todo App",
    description: "Our mission is to help individuals and teams organize their tasks efficiently, reduce stress, and achieve more every day.",
    ctaPrimary: {
      text: "Get Started",
      link: "/login"
    },
    ctaSecondary: {
      text: "Learn More",
      link: "/features"
    },
    image: "https://cdn.pixabay.com/photo/2022/02/25/19/44/office-7034732_960_720.png",
    imageAlt: "Team working together"
  } as AboutHero,
  story: {
    title: "Our Story",
    paragraphs: [
      "Todo App was founded in 2020 by a team of productivity enthusiasts who were frustrated with existing task management solutions. We believed there had to be a simpler, more intuitive way to organize daily tasks without the complexity of most productivity apps.",
      "Starting as a small side project, Todo App quickly grew into a full-fledged platform serving thousands of users worldwide. Our focus has always been on simplicity, clean design, and helping users focus on what truly matters.",
      "Today, we're proud to be a trusted productivity partner for individuals, small teams, and businesses looking to streamline their workflow and accomplish more with less stress."
    ]
  } as AboutStory,
  values: {
    title: "Our Values",
    items: [
      {
        title: "Simplicity",
        description: "We believe productivity tools should be intuitive and easy to use. Less clutter means more focus on what's important.",
        icon: "FaCheckCircle"
      },
      {
        title: "User Focus",
        description: "Our users are at the heart of everything we do. We listen, learn, and continuously improve based on your feedback.",
        icon: "FaUsers"
      },
      {
        title: "Innovation",
        description: "We're constantly exploring new ways to help you be more productive while keeping our interface clean and distraction-free.",
        icon: "FaRocket"
      }
    ] as AboutValue[]
  },
  team: {
    title: "Meet the Team",
    members: [
      {
        name: "Sanjay Choudhary",
        role: "Fronted Developer",
        image: "/images/sanjay.jpg",
        social: {
          linkedin: "#",
          twitter: "#"
        }
      },
      {
        name: "Alex Johnson",
        role: "Founder & CEO",
        image: "https://cdn.pixabay.com/photo/2024/11/17/19/54/success-9204698_960_720.jpg",
        social: {
          linkedin: "#",
          twitter: "#"
        }
      },
      {
        name: "Emma Wilson",
        role: "Product Manager",
        image: "https://cdn.pixabay.com/photo/2024/04/05/05/17/businessman-8676535_1280.jpg",
        social: {
          linkedin: "#",
          twitter: "#"
        }
      },
       {
        name: "Wilson",
        role: "Product Manager",
        image: "https://cdn.pixabay.com/photo/2019/09/10/14/41/old-man-4466290_960_720.jpg",
        social: {
          linkedin: "#",
          twitter: "#"
        }
      }
    ] as TeamMember[]
  },
  cta: {
    title: "Ready to boost your productivity?",
    description: "Join thousands of users who are accomplishing more with Todo App.",
    button: {
      text: "Get Started for Free",
      link: "/signup"
    }
  } as AboutCTA
};
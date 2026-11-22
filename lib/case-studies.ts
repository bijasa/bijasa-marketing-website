export const caseStudies = [
  {
    "slug": "bijadex",
    "name": "Bijadex",
    "product": "Bijadex",
    "brand": "Bijadex",
    "who": "Shop",
    "for": "For shops and supermarkets",
    "status": "Windows and Mac app",
    "cta": "Download Bijadex",
    "width": 1280,
    "height": 800,
    "tone": "bijadex",
    "searchTitle": "Building Bijadex, Billing and Stock Software for Retail",
    "description": "A Bijasa product case study: Bijadex, a desktop billing and stock app for retail shops, with barcode scanning, weighed items, GST bills, UPI and khata.",
    "intro": "A billing and stock app for retail counters. The cashier scans or types an item, weighs loose goods, takes cash, UPI or khata, and prints a GST bill. Records stay on the shop computer.",
    "summary": "How a counter app handles barcode scanning, loose items, GST-inclusive prices and more than one counter on the shop Wi-Fi.",
    "url": "https://github.com/bijasa/bijadex-releases/releases/latest",
    "image": "/work/bijadex.jpg",
    "imageAlt": "Bijadex bill screen with six grocery lines including loose basmati rice weighed at 1.250 kg, a ₹928 total with GST included, and cash, UPI, card and khata payment choices.",
    "caption": "The Bijadex bill screen from the desktop app, version 1.1. The shop, items and amounts are sample data.",
    "audience": "Shop owners and cashiers",
    "focus": "Fast billing at the counter",
    "sections": [
      {
        "heading": "The problem",
        "paragraphs": [
          "At a shop counter, the queue sets the pace. A cashier needs to add an item in one scan, handle rice or dal sold by weight, take the payment the customer prefers and hand over a correct bill. Many tools that do this are slow, need the internet, or expect the shop to type every price by hand.",
          "Bijasa built Bijadex as its own product for that counter: scan first, with the total and the change always in view."
        ]
      },
      {
        "heading": "Built around the bill screen",
        "paragraphs": [
          "The search box is always ready for a barcode scanner. Loose items open a weigh dialog, and barcodes printed by a weighing scale are read directly. Prices can include GST, and the bill shows the CGST and SGST split and what the customer saved against MRP.",
          "Payment choices are cash, UPI, card and khata. Khata keeps a running credit balance for regular customers, and a bill or reminder can be shared as a WhatsApp message. Keyboard shortcuts cover the common actions, so a cashier rarely needs the mouse."
        ]
      },
      {
        "heading": "Records on the shop computer",
        "paragraphs": [
          "Bijadex installs on Windows or Mac and keeps its records on that computer, so billing does not stop when the internet does. A shop with a second counter can switch on sharing: other counters open Bijadex in a browser on the same Wi-Fi and pair with a six-digit code.",
          "Stock can be imported from a spreadsheet, and the app has reports, purchases, stock checks, barcode labels and staff PINs."
        ]
      }
    ],
    "outcomes": [
      "A released desktop app for Windows and Mac, with automatic updates on Windows.",
      "Scan-first billing with weighed items, GST-inclusive prices and thermal bill printing.",
      "Cash, UPI, card and khata payments, with more counters on the shop Wi-Fi."
    ],
    "evidence": [
      {
        "label": "Download the latest release",
        "href": "https://github.com/bijasa/bijadex-releases/releases/latest"
      }
    ],
    "flow": [
      "Scan or weigh an item",
      "Bill with GST and payment",
      "Print, share and update stock"
    ],
    "tradeoff": "Keeping records on the shop computer means billing works without the internet and the data stays with the shop. The tradeoff is that the shop must keep that computer backed up, and extra counters need to be on the same Wi-Fi as the main one.",
    "relatedService": "/services/web-mobile-development/",
    "relatedServiceLabel": "Web and mobile development",
    "kind": "Desktop app",
    "short": "Billing and stock for retail counters"
  },
  {
    "slug": "gearshift",
    "name": "GearShift",
    "product": "GearShift",
    "brand": "GearShift",
    "who": "Garage",
    "for": "For car service workshops",
    "status": "Windows app",
    "cta": "Ask for a GearShift demo",
    "width": 1280,
    "height": 800,
    "tone": "gearshift",
    "searchTitle": "Building GearShift, Software for Car Workshops",
    "description": "A Bijasa product case study: GearShift, workshop software that tracks every car from check-in to pickup, with bays, job cards, customer estimate approval and payments.",
    "intro": "Workshop software for car service garages. It shows every bay on one screen and follows each car from check-in to pickup, with job cards, parts, customer approval and payment.",
    "summary": "How a live floor view, job cards and a private customer link keep a car service visit on track.",
    "url": "/#contact",
    "image": "/work/gearshift.jpg",
    "imageAlt": "GearShift Live Floor with twelve service bays, a Mahindra Scorpio-N in repair in bay 1, a Tata Nexon EV ready for pickup in bay 4, and its job details panel.",
    "caption": "The GearShift Live Floor in its demo workspace. The workshop, vehicles and technician are sample data.",
    "audience": "Workshop owners, service advisors and technicians",
    "focus": "Tracking each car from check-in to pickup",
    "sections": [
      {
        "heading": "The problem",
        "paragraphs": [
          "In a busy workshop, the question is always the same: where is this car, and what is it waiting for? The answer is often spread across a whiteboard, a register and phone calls with the customer.",
          "Bijasa built GearShift as its own product to put that answer on one screen."
        ]
      },
      {
        "heading": "One floor, every bay",
        "paragraphs": [
          "The Live Floor shows each service bay and the car in it, along with the waiting area. Selecting a car opens its details next to the floor: the stage it is in, the technician and the customer concern. The job card records inspection findings, photos, labour and the parts issued.",
          "Owners invite advisors and technicians. Technicians see the jobs assigned to them and update inspection and repair stages, while advisors manage the operational records."
        ]
      },
      {
        "heading": "The customer stays in the loop",
        "paragraphs": [
          "Once the estimate is saved, the workshop can create a private Service Passport link. The customer opens it, sees the estimate and approves it. Links expire after three days, and a new link replaces the old one.",
          "When the car is ready, GearShift creates the invoice. The customer can pay by UPI or cash, and staff record the payment reference. WhatsApp opens a ready-to-send message."
        ]
      }
    ],
    "outcomes": [
      "A Windows app that runs at the workshop and keeps working without the internet.",
      "A live floor of bays, job cards with photos and parts, and staff roles.",
      "Private customer links for estimate approval, with UPI and cash payments."
    ],
    "evidence": [
      {
        "label": "Ask Bijasa for a GearShift demo",
        "href": "/#contact"
      }
    ],
    "flow": [
      "Check in the car",
      "Inspect, estimate and approve",
      "Repair, invoice and pickup"
    ],
    "tradeoff": "Running at the workshop means the floor keeps working when the internet drops. The tradeoff is that customer links and work across several devices need a shared hosted setup, which a workshop chooses separately.",
    "relatedService": "/services/web-mobile-development/",
    "relatedServiceLabel": "Web and mobile development",
    "kind": "Operations system",
    "short": "Job tracking for service workshops"
  },
  {
    "slug": "invoicing-platform",
    "name": "Invoicing Platform",
    "product": "Bijasa Invoicing Platform",
    "searchTitle": "Building a Free Invoicing Platform",
    "description": "A Bijasa product case study: designing a free invoicing platform with local records, branded PDFs and clear document workflows.",
    "intro": "A free invoicing platform for freelancers and small businesses, designed around creating a document, making it your own, and keeping your records on your device.",
    "summary": "How local records, branded PDFs and clear document workflows come together in a free business tool.",
    "url": "https://invoicing.bijasa.com/",
    "image": "/work/invoicing.webp",
    "imageAlt": "Bijasa Invoicing Platform landing page with its layered illustrative invoice preview and create-invoice button.",
    "caption": "The live product’s public landing page, captured on 3 November 2026. The invoice composition uses illustrative data.",
    "audience": "Freelancers and small businesses",
    "focus": "Document workflows and PDF output",
    "sections": [
      {
        "heading": "The problem",
        "paragraphs": [
          "An invoice sits between completing work and getting paid. The person preparing it needs to describe the work clearly, use the right document, include business details and send something professional. A useful tool should make those steps understandable without requiring a subscription or an account before someone can begin.",
          "Bijasa built this as its own product: a practical way for independent businesses to prepare documents, and a working example of the care we bring to software."
        ]
      },
      {
        "heading": "The product decisions",
        "paragraphs": [
          "The entry point is a concrete action: create an invoice. From there, the workspace brings related documents together, including quotations, credit notes, receipts and delivery challans. Document guides explain what each supported workflow is for, giving visitors a route from a question to the relevant tool.",
          "Branding is part of the output. The product supports business logos, signatures and three PDF templates, so a document can reflect the business that sends it. The public introduction uses a layered invoice composition to show what the tool produces, with a control to pause decorative motion."
        ]
      },
      {
        "heading": "Keeping records on the device",
        "paragraphs": [
          "Invoice records are stored in the user’s browser rather than a Bijasa invoice database. That makes the core workspace available without a signup and keeps document storage on the device where the work happens.",
          "This choice also gives backups a clear role. Users can export a backup and choose when to share documents. Local storage is tied to the browser and device; it should not be mistaken for a synced or managed cloud backup."
        ]
      },
      {
        "heading": "Making the boundaries clear",
        "paragraphs": [
          "The platform prepares documents and performs supported checks using the facts a user provides. It does not verify the business’s tax status, generate an IRN or file government returns. Stating those boundaries helps a business understand where document preparation ends and an external process may still be required."
        ]
      }
    ],
    "outcomes": [
      "A live, free workspace that can be opened without signup or subscription.",
      "Business branding and PDF output, with related document types in one workspace.",
      "Local records, exportable backups and published guides for supported workflows."
    ],
    "evidence": [
      {
        "label": "Explore the live platform",
        "href": "https://invoicing.bijasa.com/"
      },
      {
        "label": "Read the document guides",
        "href": "https://invoicing.bijasa.com/#documents"
      },
      {
        "label": "Review the product FAQ",
        "href": "https://invoicing.bijasa.com/faq/"
      }
    ],
    "relatedService": "/services/web-mobile-development/",
    "relatedServiceLabel": "Web and mobile development",
    "brand": "Bijasa Invoicing",
    "who": "Freelancer",
    "for": "For freelancers and small businesses",
    "status": "Free on the web",
    "cta": "Open Invoicing",
    "width": 1280,
    "height": 720,
    "tone": "invoicing",
    "flow": [
      "Document details",
      "Records kept in the browser",
      "Branded PDF or backup"
    ],
    "tradeoff": "Keeping records in the browser avoids a central invoice database and an account requirement for the core workflow. The tradeoff is that storage belongs to that device and browser: users need exportable backups, and records are not automatically synced.",
    "kind": "Web platform",
    "short": "Branded invoices and business documents"
  },
  {
    "slug": "typing-practice",
    "name": "Typing Practice",
    "product": "Bijasa Typing",
    "searchTitle": "Building Multilingual Typing Practice",
    "description": "A Bijasa product case study: multilingual typing practice with Devanagari keyboard layouts, detailed mistake feedback and offline practice.",
    "intro": "Free typing practice for Indian government exam aspirants, bringing English, Hindi and Marathi input, exam preparation and useful mistake feedback into the browser.",
    "summary": "The product choices behind multilingual keyboards, mistake-level feedback and practice that works offline.",
    "url": "https://typing.bijasa.com/",
    "image": "/work/typing.webp",
    "imageAlt": "Bijasa Typing landing page with English, Hindi and Marathi practice navigation, an interactive Hindi typing demonstration and mock-test button.",
    "caption": "The live product’s public landing page, captured on 3 November 2026. The displayed speed and mistakes are demonstration examples.",
    "audience": "Typing learners and exam aspirants",
    "focus": "Multilingual input and feedback",
    "sections": [
      {
        "heading": "The problem",
        "paragraphs": [
          "A typing learner needs to understand more than a final speed score. Which word was skipped? Was the mistake in spelling, punctuation or case? Does a Hindi or Marathi layout behave as expected while the learner types? These details shape whether practice gives someone a useful next step.",
          "Bijasa built its own typing product to make those details visible, with free core practice and mock tests that can be opened without signing up."
        ]
      },
      {
        "heading": "Typing across scripts",
        "paragraphs": [
          "The product supports English, Hindi and Marathi, with keyboard layouts available in the browser. In Devanagari typing, the sequence of keystrokes and the position of a displayed mark can differ. The landing page demonstrates this with an interactive keyboard and explains the reph example in the word कर्म.",
          "Making that behaviour available to try gives visitors a direct way to experience the input system. The interface also offers language choices, so the surrounding product is usable alongside the typing exercise."
        ]
      },
      {
        "heading": "Feedback that points to the next practice session",
        "paragraphs": [
          "The product distinguishes spelling mistakes, skipped words, repeated words, punctuation and capital-letter mistakes. Its public example shows each error beside the relevant part of a passage, rather than presenting only a total.",
          "A skipped word is handled as its own error instead of making the rest of the passage appear wrong. This gives the learner a more specific explanation of what happened and what to work on next."
        ]
      },
      {
        "heading": "Practice with context",
        "paragraphs": [
          "Exam profiles link to their sources and show verification information. Learners can review the stated rules alongside a practice configuration, then check their current official exam notice for the requirements that apply to them. The product is independent of exam conducting bodies.",
          "Lessons, drills, mock tests and keyboard-layout pages offer different ways to practise. Core practice and mocks work offline after an initial visit; online account and group features are separate from that offline practice experience."
        ]
      }
    ],
    "outcomes": [
      "A live typing product with English, Hindi and Marathi practice.",
      "Mistake-level feedback, browser keyboard layouts, lessons and mock tests.",
      "Offline core practice after the first visit, with exam profiles that expose their sources."
    ],
    "evidence": [
      {
        "label": "Try the live typing tool",
        "href": "https://typing.bijasa.com/"
      },
      {
        "label": "Explore exam profiles and sources",
        "href": "https://typing.bijasa.com/exam"
      },
      {
        "label": "Review the keyboard layouts",
        "href": "https://typing.bijasa.com/layouts"
      }
    ],
    "relatedService": "/services/web-mobile-development/",
    "relatedServiceLabel": "Web and mobile development",
    "brand": "Bijasa Typing",
    "who": "Student",
    "for": "For government exam aspirants",
    "status": "Free on the web",
    "cta": "Open Typing",
    "width": 1280,
    "height": 720,
    "tone": "typing",
    "flow": [
      "Language and keyboard input",
      "Practice or mock session",
      "Mistake feedback and next practice"
    ],
    "tradeoff": "The practice experience connects multilingual input to session feedback. Core practice can work offline after an initial visit; account and group features have separate online requirements. Keyboard behavior and skipped-word handling need to preserve useful feedback across scripts.",
    "kind": "Learning tool",
    "short": "Multilingual typing practice and mock tests"
  }
];

export type CaseStudy = (typeof caseStudies)[number];

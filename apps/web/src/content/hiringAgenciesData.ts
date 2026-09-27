export type AgencyCategory =
  | "Product Startups & Unicorns"
  | "Enterprise & Tier-1 GCCs"
  | "Executive & Leadership Search"
  | "Global & Remote Platforms"
  | "IT Staffing & Systems";

export interface HiringAgency {
  id: string;
  name: string;
  category: AgencyCategory;
  website: string;
  hubs: string[];
  roles: string[];
  companies: string[];
  linkedinUrl: string;
  careersUrl: string;
  contactInfo: string;
  notes: string;
  verification: string;
  emails: string[];
  primaryEmail?: string;
}

export const agencyCategories: AgencyCategory[] = [
  "Product Startups & Unicorns",
  "Enterprise & Tier-1 GCCs",
  "Executive & Leadership Search",
  "Global & Remote Platforms",
  "IT Staffing & Systems",
];

export const hiringAgenciesList: HiringAgency[] = [
  {
    "id": "agency-1",
    "name": "TeamLease Digital (TeamLease Services)",
    "category": "Enterprise & Tier-1 GCCs",
    "website": "https://www.teamleasedigital.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Chennai",
      "NCR"
    ],
    "roles": [
      "Frontend Engineers (React, Angular)",
      "Fullstack Developers",
      "React Native",
      "Java/Microservices",
      "Cloud/DevOps"
    ],
    "companies": [
      "Amazon India",
      "Microsoft India",
      "Cisco",
      "SAP Labs India",
      "IBM",
      "Flipkart"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/teamleasedigital/",
    "careersUrl": "https://www.teamleasedigital.com/jobs",
    "contactInfo": "Munira Loliwala (AVP - Tech Staffing); Bangalore office: 080-68243000 / info@teamleasedigital.com",
    "notes": "Massive volume of contract-to-hire (C2H) and lateral FTE mandates for MNC GCCs. Active recruiter posts on LinkedIn with tag #TeamLeaseDigital.",
    "verification": "TeamLease Digital Annual Tech Hiring Outlook & Public Client Case Studies",
    "emails": [
      "info@teamleasedigital.com"
    ],
    "primaryEmail": "info@teamleasedigital.com"
  },
  {
    "id": "agency-2",
    "name": "Randstad India",
    "category": "Enterprise & Tier-1 GCCs",
    "website": "https://www.randstad.in/",
    "hubs": [
      "Chennai (HQ)",
      "Bengaluru",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Gurugram"
    ],
    "roles": [
      "Software Engineer",
      "Frontend Developer (React, TypeScript)",
      "Full Stack (Node/Java/React)",
      "Cloud & Data Engineering"
    ],
    "companies": [
      "Oracle India",
      "Dell Technologies",
      "PayPal",
      "Capgemini",
      "Bosch",
      "Siemens"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/randstad-india/",
    "careersUrl": "https://www.randstad.in/jobs/",
    "contactInfo": "Yeshabanta Jena (Director - Tech Staffing); tech.jobs@randstad.in",
    "notes": "Primary vendor for Fortune 500 GCCs in Bengaluru & Hyderabad. Direct application via their portal triggers automated parsing into candidate pools.",
    "verification": "Randstad India Tech Talent Trends & Public Client Success Stories",
    "emails": [
      "tech.jobs@randstad.in"
    ],
    "primaryEmail": "tech.jobs@randstad.in"
  },
  {
    "id": "agency-3",
    "name": "Adecco India",
    "category": "Enterprise & Tier-1 GCCs",
    "website": "https://www.adecco.co.in/",
    "hubs": [
      "Bengaluru (HQ)",
      "Pune",
      "Hyderabad",
      "Mumbai",
      "Delhi-NCR",
      "Chennai"
    ],
    "roles": [
      "Frontend Engineers (React.js, UI/UX Dev)",
      "Full Stack Engineers",
      "Mobile Devs (iOS/Android/React Native)",
      "DevOps/SRE"
    ],
    "companies": [
      "Google India (Extended Workforce)",
      "HP",
      "Cisco",
      "Lenovo",
      "Cognizant",
      "Wipro"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/adecco-india/",
    "careersUrl": "https://www.adecco.co.in/jobs/",
    "contactInfo": "Vidya Sagar (National Head - IT Staffing); contact@adecco.co.in / 080-39805000",
    "notes": "Preferred staffing partner for Big Tech vendor contracts (TVC roles). Focus on candidates with 2-6 years experience available within 15-30 days.",
    "verification": "Adecco India Staffing Industry Disclosures & Vendor Panels",
    "emails": [
      "contact@adecco.co.in"
    ],
    "primaryEmail": "contact@adecco.co.in"
  },
  {
    "id": "agency-4",
    "name": "Michael Page India (PageGroup)",
    "category": "Enterprise & Tier-1 GCCs",
    "website": "https://www.michaelpage.co.in/",
    "hubs": [
      "Mumbai (HQ)",
      "Bengaluru",
      "Gurugram"
    ],
    "roles": [
      "Senior Software Engineers",
      "SDE-2/3",
      "Lead Frontend Engineers",
      "Engineering Managers",
      "Tech Architects"
    ],
    "companies": [
      "Uber India",
      "Swiggy",
      "Razorpay",
      "CRED",
      "Zomato",
      "PhonePe"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/michael-page-india/",
    "careersUrl": "https://www.michaelpage.co.in/jobs/technology",
    "contactInfo": "Ankit Agarwala (Managing Director - Tech & Digital); techjobs@michaelpage.co.in",
    "notes": "Focuses strictly on high-paying permanent (FTE) roles for top-tier product startups and unicorn tech companies. Best approached via direct LinkedIn messages to Page consultants.",
    "verification": "PageGroup Tech Salary Benchmark Reports & Placements Showcase",
    "emails": [
      "techjobs@michaelpage.co.in"
    ],
    "primaryEmail": "techjobs@michaelpage.co.in"
  },
  {
    "id": "agency-5",
    "name": "Allegis Group / TEKsystems India",
    "category": "Enterprise & Tier-1 GCCs",
    "website": "https://www.teksystems.com/en-in",
    "hubs": [
      "Bengaluru (HQ)",
      "Hyderabad",
      "Pune",
      "Chennai",
      "Gurugram"
    ],
    "roles": [
      "Frontend Engineers (React, Redux, Next.js)",
      "Fullstack Developers",
      "Cloud Solutions Engineers",
      "QA Automation"
    ],
    "companies": [
      "JPMorgan Chase",
      "Morgan Stanley",
      "Wells Fargo",
      "Bank of America",
      "Fidelity Investments"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/teksystems-global-services/",
    "careersUrl": "https://www.teksystems.com/en-in/careers",
    "contactInfo": "Sunil Kumar (Director - Talent Acquisition India); careers_india@teksystems.com",
    "notes": "Market leader in banking/fintech GCC placements. Excellent pathway into Tier-1 investment banks (Citi, JPMC, Wells Fargo) through contract-to-hire.",
    "verification": "Allegis Group Global Vendor Procurement Frameworks",
    "emails": [
      "careers_india@teksystems.com"
    ],
    "primaryEmail": "careers_india@teksystems.com"
  },
  {
    "id": "agency-6",
    "name": "CIEL HR Services",
    "category": "IT Staffing & Systems",
    "website": "https://www.cielhr.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Chennai",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Delhi"
    ],
    "roles": [
      "React Developers",
      "Frontend UI Engineers",
      "Full Stack Web Engineers",
      "Java/Python Backend"
    ],
    "companies": [
      "Zoho",
      "Freshworks",
      "Tata Digital",
      "TVS Motor Digital",
      "Mindtree"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/ciel-hr/",
    "careersUrl": "https://www.cielhr.com/jobs/",
    "contactInfo": "Aditya Narayan Mishra (MD & CEO); info@cielhr.com / 080-49165000",
    "notes": "Strong penetration in South India tech hubs (Bengaluru, Chennai, Coimbatore). High volume of mid-market SaaS and product engineering requirements.",
    "verification": "CIEL HR Public Tech Talent Reports & IPO Filings",
    "emails": [
      "info@cielhr.com"
    ],
    "primaryEmail": "info@cielhr.com"
  },
  {
    "id": "agency-7",
    "name": "ABC Consultants",
    "category": "Executive & Leadership Search",
    "website": "https://www.abcconsultants.in/",
    "hubs": [
      "New Delhi (HQ)",
      "Bengaluru",
      "Mumbai",
      "Pune",
      "Hyderabad"
    ],
    "roles": [
      "SDE-2",
      "Lead Frontend Developers",
      "Full Stack Specialists",
      "AI/ML Engineers"
    ],
    "companies": [
      "MakeMyTrip",
      "Paytm",
      "Info Edge",
      "Bharti Airtel (Airtel Digital)",
      "Reliance Jio"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/abc-consultants/",
    "careersUrl": "https://www.abcconsultants.in/jobs/",
    "contactInfo": "Ratna Gupta (Senior Director - Technology Practice); info@abcconsultants.in",
    "notes": "Top executive and senior lateral tech search firm in India. Specializes in permanent leadership and SDE-2/3 staffing for large Indian internet conglomerates.",
    "verification": "ABC Consultants 55-Year Brand Legacy & Public Mandate Records",
    "emails": [
      "info@abcconsultants.in"
    ],
    "primaryEmail": "info@abcconsultants.in"
  },
  {
    "id": "agency-8",
    "name": "Quess Corp (IT Staffing / Magna)",
    "category": "Enterprise & Tier-1 GCCs",
    "website": "https://www.quesscorp.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Chennai",
      "Kolkata"
    ],
    "roles": [
      "Frontend Engineers",
      "Software Developers",
      "UI/UX Developers",
      "React/Angular Developers",
      "Mobile Developers"
    ],
    "companies": [
      "Samsung R&D",
      "Qualcomm India",
      "Infosys",
      "Tech Mahindra",
      "L&T Technology Services"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/quess-corp-limited/",
    "careersUrl": "https://www.quesscorp.com/it-staffing/",
    "contactInfo": "Lohit Bhatia (President - Workforce Management); connect@quesscorp.com",
    "notes": "Largest workforce staffing company in India by headcount. High frequency of mass hiring drives for R&D centers and tech GCCs.",
    "verification": "Quess Corp Annual Financial Reports & Public Client Case Studies",
    "emails": [
      "connect@quesscorp.com"
    ],
    "primaryEmail": "connect@quesscorp.com"
  },
  {
    "id": "agency-9",
    "name": "ManpowerGroup India (Experis)",
    "category": "IT Staffing & Systems",
    "website": "https://www.experisindia.com/",
    "hubs": [
      "Gurugram (HQ)",
      "Bengaluru",
      "Mumbai",
      "Pune",
      "Hyderabad",
      "Chennai"
    ],
    "roles": [
      "Frontend Developers (React, TypeScript)",
      "Cloud Application Developers",
      "Full Stack Engineers",
      "DevOps"
    ],
    "companies": [
      "IBM India",
      "Ericson",
      "Nokia",
      "Honeywell",
      "Capgemini",
      "Accenture"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/experis-india/",
    "careersUrl": "https://www.experisindia.com/jobs",
    "contactInfo": "Manmeet Singh (Head - IT Staffing); enquiry@experisindia.com",
    "notes": "Specialized IT arm of ManpowerGroup. Strong presence in telecom, enterprise IT, and embedded software systems.",
    "verification": "Experis IT Employment Outlook Surveys",
    "emails": [
      "enquiry@experisindia.com"
    ],
    "primaryEmail": "enquiry@experisindia.com"
  },
  {
    "id": "agency-10",
    "name": "NLB Services",
    "category": "IT Staffing & Systems",
    "website": "https://www.nlbservices.com/",
    "hubs": [
      "Noida (HQ)",
      "Bengaluru",
      "Hyderabad",
      "Pune",
      "Chennai"
    ],
    "roles": [
      "Frontend Engineers (React.js, Vue, Angular)",
      "Full Stack Java/React",
      "Micro-frontends",
      "Mobile App Developers"
    ],
    "companies": [
      "Virtusa",
      "Persistent Systems",
      "HCLTech",
      "Barclays India",
      "Fidelity"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/nlb-services/",
    "careersUrl": "https://www.nlbservices.com/job-search/",
    "contactInfo": "Sachin Alug (CEO); info@nlbservices.com / +91-120-436-0000",
    "notes": "Very high volume on LinkedIn and job boards for fast-turnaround lateral hiring (0-30 days notice periods prioritized).",
    "verification": "NLB Services Tech Talent Trends Research 2026",
    "emails": [
      "info@nlbservices.com"
    ],
    "primaryEmail": "info@nlbservices.com"
  },
  {
    "id": "agency-11",
    "name": "PERSOLKELLY India",
    "category": "IT Staffing & Systems",
    "website": "https://www.persolkelly.com/india",
    "hubs": [
      "Bengaluru (HQ)",
      "Mumbai",
      "Delhi-NCR",
      "Chennai"
    ],
    "roles": [
      "Software Engineer II",
      "Frontend UI Developer",
      "React Native Mobile Engineer",
      "Fullstack JavaScript"
    ],
    "companies": [
      "Rakuten India",
      "NTT Data",
      "Sony India Software Center",
      "Hitachi",
      "Toshiba"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/persolkelly-india/",
    "careersUrl": "https://www.persolkelly.com/india/jobs",
    "contactInfo": "Siddharth Yadav (Practice Lead - IT); contact_india@persolkelly.com",
    "notes": "Premier staffing bridge between Japanese/APAC multinationals and Indian tech engineering centers.",
    "verification": "PERSOLKELLY APAC Workforce Insights",
    "emails": [
      "contact_india@persolkelly.com"
    ],
    "primaryEmail": "contact_india@persolkelly.com"
  },
  {
    "id": "agency-12",
    "name": "Xpheno",
    "category": "Enterprise & Tier-1 GCCs",
    "website": "https://xpheno.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "NCR"
    ],
    "roles": [
      "Product SDEs",
      "Frontend Specialists (React, Web Performance)",
      "Mobile Engineers",
      "Backend Architects"
    ],
    "companies": [
      "Atlassian India",
      "ServiceNow",
      "VMware",
      "Target India",
      "NetApp"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/xpheno/",
    "careersUrl": "https://xpheno.com/careers/",
    "contactInfo": "Kamal Karanth (Co-Founder); connect@xpheno.com / 080-68137300",
    "notes": "Boutique specialist staffing firm founded by industry veterans with deep ties into Bengaluru Tier-1 GCCs and enterprise SaaS.",
    "verification": "Xpheno Specialist Staffing Market Reports & GCC Studies",
    "emails": [
      "connect@xpheno.com"
    ],
    "primaryEmail": "connect@xpheno.com"
  },
  {
    "id": "agency-13",
    "name": "CareerNet Technologies",
    "category": "Product Startups & Unicorns",
    "website": "https://careernet.in/",
    "hubs": [
      "Bengaluru (HQ)",
      "Hyderabad",
      "Pune",
      "Gurugram",
      "Chennai"
    ],
    "roles": [
      "Frontend Engineers (SDE-1 to SDE-3)",
      "Full Stack Developers",
      "Data Platform Engineers",
      "Product UI/UX"
    ],
    "companies": [
      "Flipkart",
      "Myntra",
      "Swiggy",
      "Ola",
      "InMobi",
      "Udaan"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/careernet/",
    "careersUrl": "https://careernet.in/jobs",
    "contactInfo": "Anshuman Das (Co-founder & CEO); contact@careernet.in",
    "notes": "The pioneer recruitment agency for India consumer tech unicorns and quick commerce players. Unrivaled network across Flipkart, Swiggy, and startup alumnus.",
    "verification": "CareerNet Tech Hiring Pulse & Startup Ecosystem Partners",
    "emails": [
      "contact@careernet.in"
    ],
    "primaryEmail": "contact@careernet.in"
  },
  {
    "id": "agency-14",
    "name": "SutraHR",
    "category": "Product Startups & Unicorns",
    "website": "https://www.sutrahr.com/",
    "hubs": [
      "Mumbai (HQ)",
      "Bengaluru",
      "Pune",
      "Delhi-NCR"
    ],
    "roles": [
      "Frontend Engineers (React, TypeScript)",
      "Full Stack Developers",
      "React Native Mobile Developers",
      "MERN Stack"
    ],
    "companies": [
      "CRED",
      "Dream11",
      "Khatabook",
      "Clevertap",
      "Pepper Content"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/sutrahr/",
    "careersUrl": "https://www.sutrahr.com/jobs/",
    "contactInfo": "Waqar Azmi (Founder & CEO); resumes@sutrahr.com / +91-922-221-3195",
    "notes": "Dominant agency for early-to-growth stage startups (Series A through Unicorn). Fast hiring cycles and modern tech stacks (React, Next.js, Node).",
    "verification": "SutraHR Startup Client Portfolios & Media Spotlights",
    "emails": [
      "resumes@sutrahr.com"
    ],
    "primaryEmail": "resumes@sutrahr.com"
  },
  {
    "id": "agency-15",
    "name": "Wenger & Watson",
    "category": "Enterprise & Tier-1 GCCs",
    "website": "https://wengerwatson.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Chennai",
      "Hyderabad",
      "Pune",
      "Delhi"
    ],
    "roles": [
      "Frontend UI Engineers (React, Redux, TypeScript)",
      "SDE-2/3",
      "Full Stack Engineers",
      "Mobile Developers"
    ],
    "companies": [
      "Adobe India",
      "Intuit India",
      "Walmart Global Tech",
      "Cisco",
      "Akamai"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/wenger-&-watson-inc/",
    "careersUrl": "https://wengerwatson.com/jobs/",
    "contactInfo": "Harish Kumar (Managing Director); info@wengerwatson.com",
    "notes": "Deep relationships with Big Tech R&D centers in Bengaluru. High placement conversion for solid engineering candidates with 3-6 years experience.",
    "verification": "Wenger & Watson 20+ Year Tech Recruitment Portfolio",
    "emails": [
      "info@wengerwatson.com"
    ],
    "primaryEmail": "info@wengerwatson.com"
  },
  {
    "id": "agency-16",
    "name": "Collabera India",
    "category": "Enterprise & Tier-1 GCCs",
    "website": "https://collabera.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Gurugram"
    ],
    "roles": [
      "Frontend Developers (React.js, Angular)",
      "Full Stack Engineers",
      "Cloud Developers",
      "DevOps Engineers"
    ],
    "companies": [
      "Wells Fargo",
      "Citi",
      "Barclays",
      "Cognizant",
      "Wipro",
      "Capgemini"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/collabera/",
    "careersUrl": "https://collabera.com/find-a-job/",
    "contactInfo": "Karthik Krishnamurthy (Chief Executive Officer); india_careers@collabera.com",
    "notes": "Major IT contractor partner for global investment banks in Bengaluru and Hyderabad.",
    "verification": "Collabera Global Client Roster & Financial Services Practice",
    "emails": [
      "india_careers@collabera.com"
    ],
    "primaryEmail": "india_careers@collabera.com"
  },
  {
    "id": "agency-17",
    "name": "Careator Technologies",
    "category": "IT Staffing & Systems",
    "website": "https://careator.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Hyderabad",
      "Chennai",
      "Pune"
    ],
    "roles": [
      "React Developers",
      "Angular Developers",
      "Full Stack Java/Node",
      "Mobile Developers"
    ],
    "companies": [
      "Mindtree",
      "L&T Infotech",
      "Tech Mahindra",
      "Hexaware",
      "Mphasis"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/careator-technologies/",
    "careersUrl": "https://careator.com/careers/",
    "contactInfo": "Satish Kumar (Head of Recruitment); info@careator.com",
    "notes": "High placement volume for IT services and system integrators with immediate onboarding requirements.",
    "verification": "Careator Corporate Client Engagements",
    "emails": [
      "info@careator.com"
    ],
    "primaryEmail": "info@careator.com"
  },
  {
    "id": "agency-18",
    "name": "ANSR",
    "category": "Enterprise & Tier-1 GCCs",
    "website": "https://ansr.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Hyderabad"
    ],
    "roles": [
      "Senior Software Engineers",
      "Frontend Specialists (React, Next.js)",
      "Platform Architects",
      "Cloud SDEs"
    ],
    "companies": [
      "Target India",
      "Lowe's India",
      "Wells Fargo India",
      "Giant Eagle",
      "Falabella",
      "PepsiCo Tech"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/ansr-consulting/",
    "careersUrl": "https://ansr.com/careers/",
    "contactInfo": "Lalit Ahuja (Founder & CEO); careers@ansr.com",
    "notes": "Builds and scales Global Capability Centers (GCCs) from scratch in India. Recruits exclusively for high-paying product centers of Fortune 500 enterprises.",
    "verification": "ANSR GCC Setup Showcase & Public Partnership Announcements",
    "emails": [
      "careers@ansr.com"
    ],
    "primaryEmail": "careers@ansr.com"
  },
  {
    "id": "agency-19",
    "name": "Hucon Solutions",
    "category": "IT Staffing & Systems",
    "website": "https://huconsolutions.com/",
    "hubs": [
      "Hyderabad (HQ)",
      "Bengaluru",
      "Pune",
      "Chennai"
    ],
    "roles": [
      "Frontend Developers",
      "React/Angular Web Developers",
      "Full Stack Engineers",
      "IT Support Engineers"
    ],
    "companies": [
      "Amazon Development Center India",
      "Genpact",
      "Infosys",
      "DXC Technology"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/hucon-solutions-india-pvt-ltd/",
    "careersUrl": "https://huconsolutions.com/jobs/",
    "contactInfo": "Srinivas Rao (Director); hr@huconsolutions.com",
    "notes": "Strong Hyderabad and Bengaluru presence with frequent weekly walk-in and virtual tech recruitment drives.",
    "verification": "Hucon Regional Staffing Awards & Campus Partner Drives",
    "emails": [
      "hr@huconsolutions.com"
    ],
    "primaryEmail": "hr@huconsolutions.com"
  },
  {
    "id": "agency-20",
    "name": "Magna Infotech (Division of Quess Corp)",
    "category": "Enterprise & Tier-1 GCCs",
    "website": "https://www.magnainfotech.com/",
    "hubs": [
      "Hyderabad (HQ)",
      "Bengaluru",
      "Chennai",
      "Pune",
      "Mumbai",
      "NCR"
    ],
    "roles": [
      "Software Engineer (Frontend UI, React, JavaScript)",
      "Fullstack Engineers",
      "Java Developers",
      "Testing Engineers"
    ],
    "companies": [
      "Qualcomm",
      "AMD",
      "Dell",
      "Wipro",
      "Capgemini",
      "HCLTech"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/magna-infotech/",
    "careersUrl": "https://www.magnainfotech.com/jobs/",
    "contactInfo": "Kishore Kumar (Vice President - IT Staffing); recruit@magnainfotech.com",
    "notes": "Specialized technical contracting division with 12,000+ deployed tech consultants across India.",
    "verification": "Quess Corp Magna IT Staffing Subsidiary Filings",
    "emails": [
      "recruit@magnainfotech.com"
    ],
    "primaryEmail": "recruit@magnainfotech.com"
  },
  {
    "id": "agency-21",
    "name": "Anzy Global",
    "category": "Product Startups & Unicorns",
    "website": "https://anzyglobal.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Pune",
      "Hyderabad",
      "Delhi-NCR"
    ],
    "roles": [
      "Frontend Engineer (React, Next.js)",
      "Full Stack Engineer",
      "SDE-1/2/3",
      "Java/Spring Boot",
      "Mobile (React Native/iOS/Android)",
      "Data/AI/ML"
    ],
    "companies": [
      "Swiggy",
      "Flipkart",
      "CRED",
      "PhonePe",
      "Razorpay",
      "Meesho",
      "Zepto",
      "InMobi",
      "Udaan"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/anzy-global/",
    "careersUrl": "https://anzyglobal.com/careers/",
    "contactInfo": "Nitin Saharan (VP Business Ops - in.linkedin.com/in/nitinanzy); Nikhil Adusumalli (nikhil@anzyglobal.com); Shanthakumar Bharathi (Sr Specialist - linkedin.com/in/shanthakumar-bharathi-22b22b13b); Ritika Raj (ritika@anzyglobal.com); Sonam Yadav (VP - sonam@anzyglobal.com)",
    "notes": "Premier tech recruiting partner for top Indian unicorn startups and product scale-ups. Direct recruiter email outreach is highly effective.",
    "verification": "Notion Hiring Agency Tracker + Public LinkedIn postings & mandates",
    "emails": [
      "nikhil@anzyglobal.com",
      "ritika@anzyglobal.com",
      "sonam@anzyglobal.com"
    ],
    "primaryEmail": "nikhil@anzyglobal.com"
  },
  {
    "id": "agency-22",
    "name": "Success Pact Consulting",
    "category": "Product Startups & Unicorns",
    "website": "https://successpact.com/",
    "hubs": [
      "Noida / Delhi-NCR (HQ)",
      "Bengaluru",
      "Hyderabad",
      "Pune"
    ],
    "roles": [
      "SDE-1/2/3/4",
      "Frontend Engineer (React.js, Next.js, Angular, TypeScript)",
      "Full Stack Developers",
      "Tech Lead",
      "Engineering Managers"
    ],
    "companies": [
      "MakeMyTrip",
      "Paytm",
      "Info Edge",
      "Cars24",
      "Delhivery",
      "BharatPe",
      "PolicyBazaar",
      "Urban Company"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/successpact/",
    "careersUrl": "https://successpact.com/jobs/",
    "contactInfo": "Pooja P. (Lead Tech Recruiter - pooja.pathak@successpact.com / +91-8448491971); Ayush Mishra (ayush.mishra@successpact.com / +91-9354007718); Isha Panwar (isha.panwar@successpact.com / +91-6396537711); Lavisha Jain (lavisha.jain@successpact.com)",
    "notes": "Heavily active in hiring across Delhi-NCR and Bengaluru product startups. Provides direct verified recruiter email and phone contacts.",
    "verification": "Notion Hiring Agency Tracker + Success Pact client case studies",
    "emails": [
      "pooja.pathak@successpact.com",
      "ayush.mishra@successpact.com",
      "isha.panwar@successpact.com",
      "lavisha.jain@successpact.com"
    ],
    "primaryEmail": "pooja.pathak@successpact.com"
  },
  {
    "id": "agency-23",
    "name": "People Nest Management Consultants",
    "category": "Product Startups & Unicorns",
    "website": "https://people-nest.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Hyderabad",
      "Mumbai",
      "Delhi-NCR"
    ],
    "roles": [
      "Frontend Engineer",
      "Full Stack Engineer",
      "SDE-2",
      "React.js / JavaScript",
      "Mobile & UI/Web Engineers"
    ],
    "companies": [
      "Flipkart",
      "Myntra",
      "Swiggy",
      "Meesho",
      "Navi",
      "CRED",
      "Ola",
      "Uber India"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/people-nest-management-consultants/",
    "careersUrl": "https://people-nest.com/career.html",
    "contactInfo": "Sameena Syed (Lead Specialist - linkedin.com/in/sameena-syed-56783265); Raj Pandit (TA Leader); Mohammed Siddiq (Lead Tech Recruiter - linkedin.com/in/mohammed-siddiq-43538589); Rabiya Fathima (TA Specialist)",
    "notes": "Specialized in product, e-commerce, and high-growth consumer internet startups. Direct route into Tier-1 product tech companies.",
    "verification": "Notion Hiring Agency Tracker + Recruiter client disclosures",
    "emails": [],
    "primaryEmail": ""
  },
  {
    "id": "agency-24",
    "name": "Talentoj",
    "category": "Product Startups & Unicorns",
    "website": "https://talentoj.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Mumbai",
      "Delhi-NCR",
      "Hyderabad"
    ],
    "roles": [
      "Software Engineer 2",
      "Frontend Developer (React, Next.js)",
      "Tech Lead",
      "MLOps",
      "Data Engineering",
      "Backend SDE"
    ],
    "companies": [
      "Zepto",
      "Razorpay",
      "Groww",
      "Nykaa",
      "BrowserStack",
      "Postman",
      "Spinny"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/talentoj/",
    "careersUrl": "https://talentoj.com/jobs/",
    "contactInfo": "Pratish Martolia (Tech Recruiter - chaitanya@talentoj.com / linkedin.com/in/pratish-martolia-b30596373); Nikita Sah (Manager TA); Sanjay Bhatt (Consultant); Deepti Joshi (Tech Recruiter)",
    "notes": "Strong partner for unicorns, soonicorns, and GCC tech hubs. High focus on SDE-2 and frontend specialists.",
    "verification": "Notion Hiring Agency Tracker + Public mandates",
    "emails": [
      "chaitanya@talentoj.com"
    ],
    "primaryEmail": "chaitanya@talentoj.com"
  },
  {
    "id": "agency-25",
    "name": "Thinkify Labs",
    "category": "Product Startups & Unicorns",
    "website": "https://www.thinkify.io/",
    "hubs": [
      "Bengaluru (HQ)",
      "Pune",
      "Hyderabad"
    ],
    "roles": [
      "Frontend Engineer (React, Next.js, TypeScript)",
      "Full Stack Developers",
      "Java/Spring Boot Engineers",
      "Mobile App Engineers"
    ],
    "companies": [
      "Swiggy",
      "Flipkart",
      "Meesho",
      "ThoughtSpot",
      "Juspay",
      "Slice",
      "Zeta"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/thinkify/",
    "careersUrl": "https://www.thinkify.io/careers/",
    "contactInfo": "Ashwin Modi (Head of Talent Acquisition); Sulabh Biswas (Tech Talent Specialist); Purvaja Khatod; Asharani M.R. (asharani@thinkify.io)",
    "notes": "Engineering-focused staffing and talent partner explicitly representing elite product companies. Excellent match for React and Spring Boot.",
    "verification": "Notion Hiring Agency Tracker + Thinkify Engineering Client Showcase",
    "emails": [
      "asharani@thinkify.io"
    ],
    "primaryEmail": "asharani@thinkify.io"
  },
  {
    "id": "agency-26",
    "name": "Neemtree Tech Hiring (Neemtree Internet)",
    "category": "Product Startups & Unicorns",
    "website": "https://neemtree.in/",
    "hubs": [
      "Mumbai (HQ)",
      "Bengaluru",
      "Pune",
      "Delhi-NCR"
    ],
    "roles": [
      "Frontend Engineer (React.js, Next.js, TypeScript)",
      "Full Stack Developer",
      "DevOps",
      "QA",
      "iOS/Android Engineers"
    ],
    "companies": [
      "Dream11",
      "Upstox",
      "Turtlemint",
      "Games24x7",
      "BookMyShow",
      "Kapture CX",
      "Angel One"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/neemtree-internet-pvt-ltd/",
    "careersUrl": "https://neemtree.in/jobs/",
    "contactInfo": "Maheeka Pai (maheeka@neemtree.in); Sidhdarth Gohel (Sr IT Recruiter); Kolimi Shaik Ayeesha (linkedin.com/in/kolimi-shaik-ayeesha-88b820217); Hiring Desk: sales@neemtree.in / 022-40003355",
    "notes": "Dedicated tech hiring firm for VC-funded startups and tech-first enterprises across Mumbai and Bengaluru.",
    "verification": "Notion Hiring Agency Tracker + Fintech/SaaS mandate listings",
    "emails": [
      "maheeka@neemtree.in",
      "sales@neemtree.in"
    ],
    "primaryEmail": "maheeka@neemtree.in"
  },
  {
    "id": "agency-27",
    "name": "Uplers",
    "category": "Global & Remote Platforms",
    "website": "https://www.uplers.com/",
    "hubs": [
      "Ahmedabad (HQ)",
      "Bengaluru",
      "Hyderabad",
      "Gurugram"
    ],
    "roles": [
      "Frontend Developer (React, Next.js, TypeScript, Tailwind)",
      "Full Stack Developer (MERN, Python/React)",
      "React Native",
      "DevOps"
    ],
    "companies": [
      "GitLab",
      "Twilio",
      "TripAdvisor",
      "Airbnb",
      "Amazon",
      "DHL",
      "Ogilvy",
      "WeightWatchers"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/weareuplers/",
    "careersUrl": "https://www.uplers.com/talent/",
    "contactInfo": "Jaid Mulla (Tech Recruiter - linkedin.com/in/jaid-mulla-597202154); Abhishek Kumar (Sr TA Specialist); Aafreen D.; Rishita Chugh; talent@uplers.com",
    "notes": "Massive network for remote and on-site tech hiring. Once vetted on their platform, candidates get presented to dozens of global product firms.",
    "verification": "Notion Hiring Agency Tracker + 3.5M+ Global Talent Network Public Portal",
    "emails": [
      "talent@uplers.com"
    ],
    "primaryEmail": "talent@uplers.com"
  },
  {
    "id": "agency-28",
    "name": "TalentStack Consulting",
    "category": "Product Startups & Unicorns",
    "website": "https://talentstack.in/",
    "hubs": [
      "Mumbai (HQ)",
      "Bengaluru",
      "Pune",
      "Gurugram"
    ],
    "roles": [
      "SDE-1/2",
      "Frontend Engineer (React, Next.js, TypeScript)",
      "Full Stack Engineer",
      "SaaS & Fintech Backend Developers"
    ],
    "companies": [
      "YC-backed Startups",
      "CoinDCX",
      "Clevertap",
      "Khatabook",
      "Jupiter Money",
      "Fi Money"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/talentstackindia/",
    "careersUrl": "https://talentstack.in/jobs/",
    "contactInfo": "Atif Khatri (Founder - atif@talentstack.in / linkedin.com/in/atifkhatri); Jinal Parekh (jobs@talentstack.in); Khushal Vaishy (khushal@talentstack.in); Yashasvini Oza (yashasvini@talentstack.in); Phone: +91-9326663929 / hello@talentstack.in",
    "notes": "High-velocity recruitment boutique for high-growth tech scaleups and YC-backed AI/SaaS products.",
    "verification": "Notion Hiring Agency Tracker + YC startup hiring announcements",
    "emails": [
      "atif@talentstack.in",
      "jobs@talentstack.in",
      "khushal@talentstack.in",
      "yashasvini@talentstack.in",
      "hello@talentstack.in"
    ],
    "primaryEmail": "atif@talentstack.in"
  },
  {
    "id": "agency-29",
    "name": "Pylon Management Consulting",
    "category": "IT Staffing & Systems",
    "website": "https://pylonmc.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Delhi-NCR"
    ],
    "roles": [
      "Frontend Engineer (React, JavaScript)",
      "Staff Backend & Frontend Engineer",
      "Backend Technical Architect",
      "Full Stack Developer",
      "SDE-2"
    ],
    "companies": [
      "Salesforce India",
      "Cisco",
      "Dell",
      "Publicis Sapient",
      "Thoughtworks",
      "Target India"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/pylon-management-consultants/",
    "careersUrl": "https://pylonmc.com/careers/",
    "contactInfo": "Apurva Naik Dhuri (Sr Staffing Specialist - apurva@pylonmc.com / linkedin.com/in/apurva-naik-07); Rambabu Katturi (Principal Tech Recruiter); Archana (chanda@pylonmc.com); Krishna Kumar Singh",
    "notes": "Strong corporate client network in Bengaluru with recurring high-level engineering and Staff/SDE-2 mandates.",
    "verification": "Notion Hiring Agency Tracker + Public IT consulting mandates",
    "emails": [
      "apurva@pylonmc.com",
      "chanda@pylonmc.com"
    ],
    "primaryEmail": "apurva@pylonmc.com"
  },
  {
    "id": "agency-30",
    "name": "GetHyr",
    "category": "Product Startups & Unicorns",
    "website": "https://gethyr.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Gurugram",
      "Hyderabad",
      "Pune"
    ],
    "roles": [
      "SDE-1/2/3",
      "Frontend Developer (React, Next.js, TypeScript)",
      "Full Stack Engineer",
      "DevOps",
      "SDET",
      "Tech Lead"
    ],
    "companies": [
      "Swiggy",
      "Zepto",
      "Blinkit",
      "Pocket FM",
      "Porter",
      "Rapido",
      "Spinny",
      "Cars24"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/gethyr/",
    "careersUrl": "https://gethyr.com/jobs/",
    "contactInfo": "Digvijay Singh (Tech Recruiter - digvijay.singh@gethyr.com / linkedin.com/in/digvijay-singh-5a771b175); Himanshu Singh (Lead Recruiter - himanshu.singh@gethyr.com); Anjali Rawat (anjali.r@gethyr.com); Dhrruv Singh (Co-Founder - dhruv@gethyr.com)",
    "notes": "Extremely active recruiter postings for Indian tech startups. Direct email applications to recruiters yield high response rates.",
    "verification": "Notion Hiring Agency Tracker + Tech hiring posts on LinkedIn",
    "emails": [
      "digvijay.singh@gethyr.com",
      "himanshu.singh@gethyr.com",
      "anjali.r@gethyr.com",
      "dhruv@gethyr.com"
    ],
    "primaryEmail": "digvijay.singh@gethyr.com"
  },
  {
    "id": "agency-31",
    "name": "Talent500 (by ANSR)",
    "category": "Enterprise & Tier-1 GCCs",
    "website": "https://talent500.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Hyderabad",
      "Gurugram",
      "Pune"
    ],
    "roles": [
      "Senior Software Engineer",
      "Frontend Engineer (React, TypeScript)",
      "Full Stack Engineer (Node/React/Java)",
      "Mobile Developers"
    ],
    "companies": [
      "Target",
      "Lowe's",
      "PepsiCo",
      "Nike",
      "Giant Eagle",
      "Falabella",
      "Delta Air Lines",
      "Lululemon"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/talent500/",
    "careersUrl": "https://talent500.com/jobs",
    "contactInfo": "Nishalini Kumar (Talent Scout - nishalini.k@ansr.com / linkedin.com/in/nishalini-kumar-661919228); Vikram Ahuja (Managing Director); talent@petalstech.com",
    "notes": "The proprietary talent platform created by ANSR. Directly hires for Fortune 500 Global Capability Centers with top-of-market compensation.",
    "verification": "Notion Hiring Agency Tracker + ANSR Fortune 500 GCC hiring portfolio",
    "emails": [
      "nishalini.k@ansr.com",
      "talent@petalstech.com"
    ],
    "primaryEmail": "nishalini.k@ansr.com"
  },
  {
    "id": "agency-32",
    "name": "Zyoin Group",
    "category": "Enterprise & Tier-1 GCCs",
    "website": "https://zyoin.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Hyderabad",
      "Pune",
      "Noida",
      "Chennai"
    ],
    "roles": [
      "Frontend Engineer (React, Angular)",
      "Full Stack Developer",
      "SDE-2/3",
      "Cloud & DevOps",
      "Mobile App Developers"
    ],
    "companies": [
      "Zepto",
      "Paytm",
      "Games24x7",
      "Roku India",
      "YugabyteDB",
      "DevRev",
      "Ola",
      "Broadridge",
      "IG Group"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/zyoin/",
    "careersUrl": "https://zyoin.com/job-seekers/",
    "contactInfo": "Anuj Agrawal (Founder & CEO - linkedin.com/in/anujagrawalzyoin); Rakesh Ranjan (Co-Founder & COO); info@zyoin.com / +91-80-4933-3333",
    "notes": "Veteran tech recruitment firm with 20+ years of relationships with both internet unicorns and established enterprise R&D hubs.",
    "verification": "Notion Hiring Agency Tracker + 20+ year client portfolio",
    "emails": [
      "info@zyoin.com"
    ],
    "primaryEmail": "info@zyoin.com"
  },
  {
    "id": "agency-33",
    "name": "Target HR",
    "category": "Product Startups & Unicorns",
    "website": "https://targethr.in/",
    "hubs": [
      "Bengaluru (HQ)",
      "Mumbai",
      "Pune"
    ],
    "roles": [
      "Frontend Engineer (React.js, UI/Web)",
      "Full Stack Developer",
      "SDE-2",
      "AI/Data Engineers"
    ],
    "companies": [
      "Internet-first product tech companies",
      "Razorpay",
      "CRED",
      "Meesho",
      "Swiggy alumni startups"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/targethr/",
    "careersUrl": "https://targethr.in/jobs/",
    "contactInfo": "Anitha Patil (Tech Recruiter - linkedin.com/in/anitha-patil-08b84b185); Chaitra R (Tech Recruiter - linkedin.com/in/chaitra-r-564728169); Kshitija Kudale; Manisha Shah",
    "notes": "Dedicated focus on internet-first product technology companies and VC-funded startups.",
    "verification": "Notion Hiring Agency Tracker + TargetHR product mandates",
    "emails": [],
    "primaryEmail": ""
  },
  {
    "id": "agency-34",
    "name": "Recro",
    "category": "Product Startups & Unicorns",
    "website": "https://recro.io/",
    "hubs": [
      "Bengaluru (HQ)",
      "Gurugram",
      "Hyderabad"
    ],
    "roles": [
      "Frontend Engineer (React, Next.js, Redux)",
      "Full Stack Developer",
      "SDE-2",
      "Microservices Developers"
    ],
    "companies": [
      "Flipkart",
      "Swiggy",
      "BigBasket",
      "Zepto",
      "PayU",
      "Groww",
      "Upstox",
      "Dunzo"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/recro-io/",
    "careersUrl": "https://recro.io/careers/",
    "contactInfo": "Shaista Rafik (TA Recruiter - shaista.rafik@recro.io / linkedin.com/in/shaista-rafik-5b7b09157); Sreelakshmi M A (linkedin.com/in/sreelakshmi-sree-ma); Bhumika Khurana; Parul Sharma",
    "notes": "Connects top engineering talent with high-growth tech companies through direct FTE and developer-as-a-service models.",
    "verification": "Notion Hiring Agency Tracker + Recro partner portfolio",
    "emails": [
      "shaista.rafik@recro.io"
    ],
    "primaryEmail": "shaista.rafik@recro.io"
  },
  {
    "id": "agency-35",
    "name": "Supersourcing",
    "category": "Global & Remote Platforms",
    "website": "https://supersourcing.com/",
    "hubs": [
      "Indore (HQ)",
      "Bengaluru",
      "Delhi-NCR",
      "Mumbai"
    ],
    "roles": [
      "Frontend Developers (React, Next.js)",
      "Full Stack Engineers",
      "SDE-2",
      "Mobile Developers",
      "Contract-to-Hire and FTE Tech Roles"
    ],
    "companies": [
      "Techstars",
      "Google for Startups alumni",
      "Tata 1mg",
      "Cars24",
      "ClearTax",
      "Magicpin"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/supersourcing/",
    "careersUrl": "https://supersourcing.com/hire-developers/",
    "contactInfo": "Aditi Chaurasia (Co-Founder & COO - aditi@supersourcing.com); Mitali Shrivastava (mitali.shrivastav@supersourcing.com); Amisha Chouhan (amisha@supersourcing.com); Harshita Sharma (harshita.sharma@supersourcing.com); Prateek Godse (prateek.godse@supersourcing.com)",
    "notes": "Leading IT talent marketplace and staffing agency with active requirements for React and fullstack talent.",
    "verification": "Notion Hiring Agency Tracker + AI talent matching network",
    "emails": [
      "aditi@supersourcing.com",
      "mitali.shrivastav@supersourcing.com",
      "amisha@supersourcing.com",
      "harshita.sharma@supersourcing.com",
      "prateek.godse@supersourcing.com"
    ],
    "primaryEmail": "aditi@supersourcing.com"
  },
  {
    "id": "agency-36",
    "name": "Taggd (by PeopleStrong)",
    "category": "Enterprise & Tier-1 GCCs",
    "website": "https://taggd.in/",
    "hubs": [
      "Gurugram (HQ)",
      "Bengaluru",
      "Mumbai",
      "Hyderabad",
      "Pune",
      "Chennai"
    ],
    "roles": [
      "Software Engineers",
      "Frontend Developers",
      "Full Stack Developers",
      "Data Engineers",
      "Enterprise IT Staffing"
    ],
    "companies": [
      "Tata Motors Digital",
      "Honeywell India",
      "Crompton",
      "Mahindra & Mahindra",
      "Swiggy",
      "Oyo"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/taggdin/",
    "careersUrl": "https://taggd.in/job-seekers/",
    "contactInfo": "Devashish Sharma (CEO); Bhawna Keshri; Bindia Minhas (linkedin.com/in/bindia-minhas-785810182); Saraswathy G P; connect@taggd.in",
    "notes": "Large-scale recruitment platform managing 100+ enterprise client accounts and handling high volumes of lateral tech hiring.",
    "verification": "Notion Hiring Agency Tracker + Digital recruitment RPO disclosures",
    "emails": [
      "connect@taggd.in"
    ],
    "primaryEmail": "connect@taggd.in"
  },
  {
    "id": "agency-37",
    "name": "Talentiser",
    "category": "Product Startups & Unicorns",
    "website": "https://talentiser.com/",
    "hubs": [
      "Gurugram (HQ)",
      "Bengaluru",
      "Noida"
    ],
    "roles": [
      "Frontend Engineer",
      "Full Stack Engineer",
      "SDE-2",
      "Product Engineering",
      "SaaS & Startup Developers"
    ],
    "companies": [
      "Lenskart",
      "Adda247",
      "Matrix Partners / Z47 portfolio startups",
      "Moglix",
      "Shiprocket"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/talentiser/",
    "careersUrl": "https://talentiser.com/careers",
    "contactInfo": "Ravi Wadhwa (Founder); Neha (neha@talentiser.com); Kiran (kiran@talentiser.com); hr@talentiser.com",
    "notes": "Specialized in Series A-D venture backed startups and Indian tech scaleups.",
    "verification": "Notion Hiring Agency Tracker + Client testimonials",
    "emails": [
      "neha@talentiser.com",
      "kiran@talentiser.com",
      "hr@talentiser.com"
    ],
    "primaryEmail": "neha@talentiser.com"
  },
  {
    "id": "agency-38",
    "name": "Placewell Group",
    "category": "IT Staffing & Systems",
    "website": "https://placewell.com/",
    "hubs": [
      "New Delhi (HQ)",
      "Bengaluru",
      "Mumbai",
      "Pune"
    ],
    "roles": [
      "IT Application Developers",
      "Frontend Engineers",
      "Full Stack Developers",
      "Infrastructure & Cloud Engineers"
    ],
    "companies": [
      "Tech Mahindra",
      "L&T",
      "Persistent Systems",
      "Birlasoft",
      "Genpact"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/placewell-group/",
    "careersUrl": "https://placewell.com/job-openings/",
    "contactInfo": "Amarendra Kumar (Director IT demand - amarendra@placewell.com); Savita Mujumdar; Monica Gambhir",
    "notes": "Manages corporate IT staffing and sub-vendor recruitment for enterprise technology service providers.",
    "verification": "Notion Hiring Agency Tracker + IT staffing subcontracting panels",
    "emails": [
      "amarendra@placewell.com"
    ],
    "primaryEmail": "amarendra@placewell.com"
  },
  {
    "id": "agency-39",
    "name": "Magna Hire",
    "category": "Product Startups & Unicorns",
    "website": "https://magnahire.in/",
    "hubs": [
      "Noida / Delhi-NCR (HQ)",
      "Bengaluru"
    ],
    "roles": [
      "Frontend Engineers",
      "Full Stack Developers",
      "Tech Stack Specialists",
      "Startup / MNC IT Roles"
    ],
    "companies": [
      "High-growth seed and Series A startups",
      "fintech apps",
      "digital agencies"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/magnahire/",
    "careersUrl": "https://magnahire.in/jobs/",
    "contactInfo": "Akasmat Pradhan (Founder & CEO - akasmat@magnahire.in); Himanshu Sharma (himanshu@magnahire.in); Shivani Sharma",
    "notes": "Fast growing recruitment tech agency focused on agile developer sourcing for Indian tech companies.",
    "verification": "Notion Hiring Agency Tracker + Candidate outreach database",
    "emails": [
      "akasmat@magnahire.in",
      "himanshu@magnahire.in"
    ],
    "primaryEmail": "akasmat@magnahire.in"
  },
  {
    "id": "agency-40",
    "name": "Scaling Theory",
    "category": "Product Startups & Unicorns",
    "website": "https://scalingtheory.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Chennai"
    ],
    "roles": [
      "Frontend Developer (React, Next.js)",
      "Backend Developer",
      "Full Stack Engineer",
      "AI/ML Engineers"
    ],
    "companies": [
      "Funded AI and SaaS startups",
      "early stage venture funded product teams"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/scaling-theory/",
    "careersUrl": "https://scalingtheory.com/careers",
    "contactInfo": "Shyamala Devi (Head TA - shyamala@scalingtheory.com); Sharmila Mohan (linkedin.com/in/sharmila-mohan-8a0a661b2); Renga J (linkedin.com/in/renga-j-66465b221)",
    "notes": "Boutique talent advisory dedicated to building core tech and product teams from ground up for startups.",
    "verification": "Notion Hiring Agency Tracker + Recruiter public posts",
    "emails": [
      "shyamala@scalingtheory.com"
    ],
    "primaryEmail": "shyamala@scalingtheory.com"
  },
  {
    "id": "agency-41",
    "name": "Om HRA (Om Human Resource Associates)",
    "category": "IT Staffing & Systems",
    "website": "https://omhra.in/",
    "hubs": [
      "Noida / Delhi-NCR (HQ)",
      "Gurugram",
      "Bengaluru"
    ],
    "roles": [
      "IT Recruiters",
      "Software Developers",
      "Frontend Web Developers",
      "Full Stack Engineers"
    ],
    "companies": [
      "Mid-market IT services",
      "fintech platforms",
      "Indian internet companies"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/om-hra/",
    "careersUrl": "https://omhra.in/current-openings/",
    "contactInfo": "Ravi Prakash (Sr Recruiter - ravi@omhra.in / +91-9870288278); Sumer Seth; Preetika Chadha Kaushik (preetika@omhra.in)",
    "notes": "Established recruitment agency in NCR catering to domestic IT and engineering staffing needs.",
    "verification": "Notion Hiring Agency Tracker + Staffing mandates",
    "emails": [
      "ravi@omhra.in",
      "preetika@omhra.in"
    ],
    "primaryEmail": "ravi@omhra.in"
  },
  {
    "id": "agency-42",
    "name": "Jobs Capital",
    "category": "IT Staffing & Systems",
    "website": "https://jobscapital.in/",
    "hubs": [
      "Pune (HQ)",
      "Bengaluru",
      "Mumbai"
    ],
    "roles": [
      "IT Software Engineers",
      "Frontend React Developers",
      "Backend Java Developers",
      "QA Engineers"
    ],
    "companies": [
      "Tech system integrators",
      "banking tech vendors",
      "e-commerce support firms"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/jobscapital/",
    "careersUrl": "https://jobscapital.in/jobs/",
    "contactInfo": "Rushali Khonde (rushali.khonde@jobscapital.in / linkedin.com/in/rushali-khonde-b1a11b1ba); Dhanshri Bhujade; Priya Bhalavi; Pragya Wasnik",
    "notes": "Active recruiter base in Pune and Bengaluru for rapid lateral developer hiring.",
    "verification": "Notion Hiring Agency Tracker + Recruiter profiles",
    "emails": [
      "rushali.khonde@jobscapital.in"
    ],
    "primaryEmail": "rushali.khonde@jobscapital.in"
  },
  {
    "id": "agency-43",
    "name": "Hitya Global",
    "category": "IT Staffing & Systems",
    "website": "https://hityaglobal.in/",
    "hubs": [
      "Gurugram / Delhi-NCR (HQ)",
      "Bengaluru"
    ],
    "roles": [
      "Frontend Engineers",
      "Full Stack Developers",
      "Mobile App Engineers",
      "SDE-1/2"
    ],
    "companies": [
      "Consumer internet startups",
      "D2C technology brands",
      "fintech platforms"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/hityaglobal/",
    "careersUrl": "https://hityaglobal.in/careers/",
    "contactInfo": "Rohit Gupta (Founder & CEO - hiring@hityaglobal.in / linkedin.com/in/rohitgupta1190); Stuti Jaiswal (stuti.jaiswal@hityaglobal.in); Supriya Gupta",
    "notes": "Personalized tech headhunting firm with direct founder involvement in tech mandates.",
    "verification": "Notion Hiring Agency Tracker + Founder active hiring posts",
    "emails": [
      "hiring@hityaglobal.in",
      "stuti.jaiswal@hityaglobal.in"
    ],
    "primaryEmail": "hiring@hityaglobal.in"
  },
  {
    "id": "agency-44",
    "name": "Talent Pipeline Consulting",
    "category": "IT Staffing & Systems",
    "website": "https://talentpipeline.in/",
    "hubs": [
      "Bengaluru (HQ)",
      "Chennai",
      "Hyderabad"
    ],
    "roles": [
      "Frontend Engineers",
      "Software Engineers",
      "UI/UX Developers",
      "Java Full Stack"
    ],
    "companies": [
      "IT service exporters",
      "enterprise software firms",
      "regional tech hubs"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/talent-pipeline-consulting/",
    "careersUrl": "https://talentpipeline.in/jobs",
    "contactInfo": "Arun Sreenivasan (Recruiting Lead); Kritika Aggarwal; contact@talentpipeline.in",
    "notes": "Regional staffing partner supplying lateral engineering talent to Bengaluru IT companies.",
    "verification": "Notion Hiring Agency Tracker + South India IT staffing networks",
    "emails": [
      "contact@talentpipeline.in"
    ],
    "primaryEmail": "contact@talentpipeline.in"
  },
  {
    "id": "agency-45",
    "name": "AiKin Club",
    "category": "Product Startups & Unicorns",
    "website": "https://aikinclub.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Hyderabad",
      "Mumbai"
    ],
    "roles": [
      "Frontend Engineers",
      "Full Stack Developers",
      "React Native Developers",
      "Product Engineers"
    ],
    "companies": [
      "Emerging tech startups",
      "Web3 & AI ventures",
      "boutique product studios"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/aikin-club/",
    "careersUrl": "https://aikinclub.com/jobs/",
    "contactInfo": "Swati K (TA Specialist); talent@aikinclub.com",
    "notes": "Community-driven talent matching network focused on modern tech stacks and startup culture.",
    "verification": "Notion Hiring Agency Tracker + Tech community recruitment initiatives",
    "emails": [
      "talent@aikinclub.com"
    ],
    "primaryEmail": "talent@aikinclub.com"
  },
  {
    "id": "agency-46",
    "name": "HyreSnap",
    "category": "Product Startups & Unicorns",
    "website": "https://hyresnap.com/",
    "hubs": [
      "Gurugram (HQ)",
      "Bengaluru",
      "Hyderabad"
    ],
    "roles": [
      "Frontend Developer",
      "Full Stack Engineer",
      "SDE-2",
      "AI Engineers",
      "Product Specialists"
    ],
    "companies": [
      "Merge.money",
      "fintech startups",
      "SaaS companies across Delhi-NCR & Bengaluru"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/hyresnap/",
    "careersUrl": "https://hyresnap.com/careers",
    "contactInfo": "Nishanth R (Talent Partner); Anoint Ninan (HR Executive / TA); support@hyresnap.com",
    "notes": "AI-powered resume parsing and candidate screening platform with active internal and client placement desks.",
    "verification": "Notion Hiring Agency Tracker + AI-powered hiring platform",
    "emails": [
      "support@hyresnap.com"
    ],
    "primaryEmail": "support@hyresnap.com"
  },
  {
    "id": "agency-47",
    "name": "Hashone Careers",
    "category": "IT Staffing & Systems",
    "website": "https://hashonecareers.com/",
    "hubs": [
      "Chennai (HQ)",
      "Bengaluru",
      "Hyderabad"
    ],
    "roles": [
      "Technical Recruiters",
      "Frontend Web Developers (React)",
      "Java Backend",
      "Cloud Engineers"
    ],
    "companies": [
      "South India SaaS companies",
      "Chennai IT corridor tech firms",
      "healthcare tech"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/hashone-careers/",
    "careersUrl": "https://hashonecareers.com/jobs",
    "contactInfo": "Madhavan I (Technical Recruiter); MohamedAsif M; Navaneetha Manian; contact@hashonecareers.com",
    "notes": "Specialized tech recruiter desk servicing Chennai and Bengaluru IT and SaaS firms.",
    "verification": "Notion Hiring Agency Tracker + IT staffing network",
    "emails": [
      "contact@hashonecareers.com"
    ],
    "primaryEmail": "contact@hashonecareers.com"
  },
  {
    "id": "agency-48",
    "name": "Purple Quarter",
    "category": "Executive & Leadership Search",
    "website": "https://purplequarter.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Delhi-NCR",
      "Mumbai",
      "Singapore"
    ],
    "roles": [
      "Staff Software Engineers",
      "Principal Engineers",
      "Engineering Managers",
      "VP of Engineering",
      "CTO",
      "Lead Frontend Architects"
    ],
    "companies": [
      "Swiggy",
      "Flipkart",
      "BrowserStack",
      "Vedantu",
      "InMobi",
      "Urban Company",
      "Rebel Foods",
      "CoinDCX",
      "slice"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/purple-quarter/",
    "careersUrl": "https://purplequarter.com/tech-roles/",
    "contactInfo": "Roopa Kumar (Founder & CEO); Deepak Shenoy (Managing Partner); connect@purplequarter.com",
    "notes": "The most prestigious executive & senior tech search firm in India. Placing candidates here often yields 50LPA - 1Cr+ packages.",
    "verification": "India's undisputed #1 tech leadership & top-tier engineering search firm for unicorns",
    "emails": [
      "connect@purplequarter.com"
    ],
    "primaryEmail": "connect@purplequarter.com"
  },
  {
    "id": "agency-49",
    "name": "HirePro (HirePro Consulting)",
    "category": "IT Staffing & Systems",
    "website": "https://hirepro.in/",
    "hubs": [
      "Bengaluru (HQ)",
      "Hyderabad",
      "Pune",
      "Gurugram",
      "Chennai",
      "Mumbai"
    ],
    "roles": [
      "SDE-1/2/3",
      "Frontend Engineers (React, TypeScript)",
      "Full Stack Developers",
      "Data Platform Engineers",
      "Cloud Specialists"
    ],
    "companies": [
      "Amazon India",
      "Cisco",
      "Oracle",
      "Infosys",
      "Morgan Stanley",
      "Cognizant",
      "Micron India"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/hirepro-in/",
    "careersUrl": "https://hirepro.in/careers/",
    "contactInfo": "Anshuman Das (Co-Founder); Sashi Kumar (Head - Talent Delivery); contactus@hirepro.in / 080-66560000",
    "notes": "Handles end-to-end recruitment technology and large-scale lateral tech hiring drives for global tech giants.",
    "verification": "Spun out of CareerNet, pioneer in automated tech recruitment drives & enterprise R&D staffing",
    "emails": [
      "contactus@hirepro.in"
    ],
    "primaryEmail": "contactus@hirepro.in"
  },
  {
    "id": "agency-50",
    "name": "TopHire",
    "category": "Product Startups & Unicorns",
    "website": "https://tophire.co/",
    "hubs": [
      "Bengaluru (HQ)",
      "Gurugram",
      "Mumbai",
      "Hyderabad"
    ],
    "roles": [
      "Frontend Engineer (React, Next.js)",
      "Full Stack Developer",
      "SDE-2/3",
      "Mobile (React Native, iOS/Android)"
    ],
    "companies": [
      "Razorpay",
      "CRED",
      "Swiggy",
      "Zepto",
      "Postman",
      "Khatabook",
      "Porter",
      "Groww"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/tophire/",
    "careersUrl": "https://tophire.co/jobs",
    "contactInfo": "Siddharth Poddar (Co-Founder); Nitesh Salvi (Co-Founder); support@tophire.co",
    "notes": "Startups apply directly to candidates on TopHire with upfront CTC details. Very fast response time for top React/Frontend profiles.",
    "verification": "Leading invite-only curated tech talent hiring platform & agency for top 2% engineers",
    "emails": [
      "support@tophire.co"
    ],
    "primaryEmail": "support@tophire.co"
  },
  {
    "id": "agency-51",
    "name": "Flexiple",
    "category": "Global & Remote Platforms",
    "website": "https://flexiple.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Remote across India"
    ],
    "roles": [
      "Senior Frontend Developer (React, Next.js, TypeScript)",
      "Full Stack Engineer",
      "React Native Developer"
    ],
    "companies": [
      "Plivo",
      "Quicko",
      "Simpl",
      "Urban Company",
      "Airmeet",
      "Practo",
      "Chalo"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/flexiple/",
    "careersUrl": "https://flexiple.com/freelance-jobs",
    "contactInfo": "Karthik Sridharan (Co-Founder & CEO); Hrishikesh Pardeshi (Co-Founder); talent@flexiple.com",
    "notes": "High compensation freelance and full-time remote contracts with Indian and US product tech firms.",
    "verification": "Elite curated freelance & FTE tech talent network; top 1% vetting",
    "emails": [
      "talent@flexiple.com"
    ],
    "primaryEmail": "talent@flexiple.com"
  },
  {
    "id": "agency-52",
    "name": "Turing (Turing Enterprises India)",
    "category": "Global & Remote Platforms",
    "website": "https://www.turing.com/",
    "hubs": [
      "Bengaluru",
      "Hyderabad",
      "Gurugram (Remote-first India hub)"
    ],
    "roles": [
      "React.js Developer",
      "Next.js Frontend Engineer",
      "Full Stack Engineer (MERN/Java)",
      "SDE-2/3"
    ],
    "companies": [
      "OpenAI",
      "Disney",
      "Dell",
      "Reddit",
      "PepsiCo",
      "Rivian",
      "Johnson & Johnson"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/turingcom/",
    "careersUrl": "https://www.turing.com/jobs",
    "contactInfo": "Jonathan Siddharth (CEO); Vijay Krishnan (Co-Founder & CTO); support@turing.com",
    "notes": "Allows Indian software engineers to work remotely for US Silicon Valley product companies with US dollar-pegged salaries.",
    "verification": "Global AI-powered tech talent platform deploying thousands of Indian tech engineers to US firms",
    "emails": [
      "support@turing.com"
    ],
    "primaryEmail": "support@turing.com"
  },
  {
    "id": "agency-53",
    "name": "Artech India (Artech Information Systems / Artech LLC)",
    "category": "IT Staffing & Systems",
    "website": "https://www.artech.com/",
    "hubs": [
      "Noida (HQ)",
      "Bengaluru",
      "Hyderabad",
      "Pune",
      "Chennai",
      "Kolkata"
    ],
    "roles": [
      "Frontend Developers (React, Angular)",
      "Full Stack Java/Node",
      "Cloud & DevOps",
      "SDE-2",
      "QA Automation"
    ],
    "companies": [
      "IBM",
      "Accenture",
      "Cognizant",
      "Dell Technologies",
      "Wells Fargo",
      "Capgemini",
      "Bank of America"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/artech-llc/",
    "careersUrl": "https://www.artech.com/careers/",
    "contactInfo": "Ajay Poddar (Executive VP); info@artech.com / 0120-4033333",
    "notes": "Exceptional volume of Fortune 500 GCC contractor and C2H placements in Bengaluru and Noida.",
    "verification": "Top 10 IT staffing company globally with massive India offshore and domestic staffing operations",
    "emails": [
      "info@artech.com"
    ],
    "primaryEmail": "info@artech.com"
  },
  {
    "id": "agency-54",
    "name": "Pyramid Consulting India",
    "category": "IT Staffing & Systems",
    "website": "https://pyramidci.com/",
    "hubs": [
      "Noida (HQ)",
      "Bengaluru",
      "Hyderabad",
      "Chandigarh",
      "Pune"
    ],
    "roles": [
      "Software Engineer",
      "Frontend Engineer (React.js)",
      "Full Stack Java/Spring",
      "Cloud Solutions",
      "Mobile Developers"
    ],
    "companies": [
      "Microsoft India",
      "TCS",
      "Cognizant",
      "Wipro",
      "Capgemini",
      "Virtusa",
      "Genpact"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/pyramid-consulting-inc-/",
    "careersUrl": "https://pyramidci.com/job-seeker/",
    "contactInfo": "Sanjeev Tirath (CEO); Namrata Sharma (Head Talent Acquisition); info@pyramidci.com",
    "notes": "High placement rate for candidates with 3-5 years tech stack experience looking for immediate project starts.",
    "verification": "Global staffing powerhouse with 6,500+ employees and dedicated tech practice in India",
    "emails": [
      "info@pyramidci.com"
    ],
    "primaryEmail": "info@pyramidci.com"
  },
  {
    "id": "agency-55",
    "name": "LanceSoft India",
    "category": "IT Staffing & Systems",
    "website": "https://www.lancesoft.com/",
    "hubs": [
      "Bengaluru (HQ)",
      "Indore",
      "Noida",
      "Hyderabad",
      "Pune"
    ],
    "roles": [
      "React Developers",
      "Frontend Engineers",
      "Full Stack Developers",
      "Python/Java Backend",
      "DevOps"
    ],
    "companies": [
      "HCLTech",
      "Tech Mahindra",
      "Mindtree",
      "Persistent Systems",
      "Hexaware",
      "DXC Technology"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/lancesoft-inc-/",
    "careersUrl": "https://www.lancesoft.com/career/",
    "contactInfo": "Joseph M. (VP Global Staffing); info@lancesoft.com / 080-46600000",
    "notes": "Excellent staffing partner for both domestic Indian enterprise IT projects and US offshore delivery centers.",
    "verification": "Recognized among fastest-growing IT staffing firms by Staffing Industry Analysts (SIA)",
    "emails": [
      "info@lancesoft.com"
    ],
    "primaryEmail": "info@lancesoft.com"
  },
  {
    "id": "agency-56",
    "name": "eTeam India (eTeam Inc)",
    "category": "IT Staffing & Systems",
    "website": "https://www.eteaminc.com/",
    "hubs": [
      "Noida (HQ)",
      "Bengaluru",
      "Hyderabad",
      "Pune",
      "Gurugram"
    ],
    "roles": [
      "Software Engineers",
      "Frontend Specialists (React/Angular)",
      "Full Stack Engineers",
      "Data Engineers",
      "Mobile Developers"
    ],
    "companies": [
      "Amazon India",
      "Google Extended Workforce",
      "Cognizant",
      "Virtusa",
      "Infosys",
      "Capgemini"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/eteam/",
    "careersUrl": "https://www.eteaminc.com/job-search/",
    "contactInfo": "Ben Thakur (CEO); indiahr@eteaminc.com / +91-120-436-1000",
    "notes": "Major vendor on MSP/VMS programs for Big Tech extended workforce positions in Hyderabad and Bengaluru.",
    "verification": "Global minority-owned workforce solutions firm with 15,000+ deployments worldwide",
    "emails": [
      "indiahr@eteaminc.com"
    ],
    "primaryEmail": "indiahr@eteaminc.com"
  },
  {
    "id": "agency-57",
    "name": "Innova Solutions India (formerly ACS Solutions)",
    "category": "IT Staffing & Systems",
    "website": "https://www.innovasolutions.com/",
    "hubs": [
      "Noida (HQ)",
      "Hyderabad",
      "Bengaluru",
      "Chennai",
      "Pune"
    ],
    "roles": [
      "Frontend Engineers (React, TypeScript)",
      "Full Stack Developers",
      "Cloud Native SDEs",
      "Microservices Engineers"
    ],
    "companies": [
      "AT&T",
      "Verizon",
      "T-Mobile",
      "Wells Fargo",
      "Barclays",
      "Anthem",
      "Optum"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/innovasolutions/",
    "careersUrl": "https://www.innovasolutions.com/careers/",
    "contactInfo": "Raj Sardana (CEO); india-careers@innovasolutions.com / 0120-4780000",
    "notes": "Massive footprint in telecom, healthcare and banking GCCs in India. Constantly recruiting frontend and fullstack talent.",
    "verification": "$3 Billion global tech services & staffing giant with 50,000+ employees globally",
    "emails": [
      "india-careers@innovasolutions.com"
    ],
    "primaryEmail": "india-careers@innovasolutions.com"
  },
  {
    "id": "agency-58",
    "name": "Dexian India (formerly DISYS & Signature Consultants)",
    "category": "IT Staffing & Systems",
    "website": "https://dexian.com/",
    "hubs": [
      "Chennai (HQ)",
      "Bengaluru",
      "Noida",
      "Hyderabad",
      "Pune"
    ],
    "roles": [
      "Frontend UI Developers",
      "Full Stack Java/React",
      "Cloud & DevOps",
      "Data Engineers"
    ],
    "companies": [
      "Citibank",
      "JPMorgan",
      "Caterpillar",
      "Cisco",
      "Dell",
      "Cognizant"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/dexian/",
    "careersUrl": "https://dexian.com/find-work/",
    "contactInfo": "Maruf Ahmed (CEO); info.india@dexian.com",
    "notes": "Specialized engineering talent solutions with dedicated centers in Chennai and Bengaluru.",
    "verification": "Result of merger between DISYS and Signature Consultants, creating one of largest global staffing firms",
    "emails": [
      "info.india@dexian.com"
    ],
    "primaryEmail": "info.india@dexian.com"
  },
  {
    "id": "agency-59",
    "name": "Antal International India",
    "category": "Executive & Leadership Search",
    "website": "https://www.antal.com/",
    "hubs": [
      "Mumbai (HQ)",
      "Bengaluru",
      "Delhi-NCR",
      "Hyderabad",
      "Pune",
      "Chennai"
    ],
    "roles": [
      "SDE-2/3",
      "Lead Frontend Engineers",
      "Engineering Managers",
      "Product Tech Specialists",
      "Solution Architects"
    ],
    "companies": [
      "Schneider Electric Digital",
      "Philips HealthTech",
      "Bosch India",
      "Siemens",
      "ABB",
      "Hitachi"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/antal-international-india/",
    "careersUrl": "https://www.antal.com/jobs",
    "contactInfo": "Joseph Devasia (Managing Director - Antal India); jdevasia@antal.com / +91-22-4022-2555",
    "notes": "Strong presence in European multinational tech centers, engineering R&D, and industrial tech software.",
    "verification": "Global executive recruitment network operating over 40 specialized offices across India",
    "emails": [
      "jdevasia@antal.com"
    ],
    "primaryEmail": "jdevasia@antal.com"
  },
  {
    "id": "agency-60",
    "name": "RGF Professional Recruitment India (Recruit Holdings)",
    "category": "Executive & Leadership Search",
    "website": "https://www.rgf-professional.com/in",
    "hubs": [
      "Bengaluru (HQ)",
      "Mumbai",
      "Gurugram"
    ],
    "roles": [
      "Senior Software Engineers",
      "Frontend Specialists (React, Next.js)",
      "Tech Leads",
      "Engineering Directors"
    ],
    "companies": [
      "Rakuten India",
      "Sony India Software Center",
      "Mercari India",
      "NTT Data",
      "Indeed",
      "Glassdoor"
    ],
    "linkedinUrl": "https://www.linkedin.com/company/rgf-professional-recruitment-india/",
    "careersUrl": "https://www.rgf-professional.com/in/jobs",
    "contactInfo": "Sachin Sachdev (Managing Director); contact-india@rgf-professional.com / 080-4660-1200",
    "notes": "Premier recruitment conduit for Japanese tech conglomerates, APAC unicorns, and high-paying GCC tech labs in India.",
    "verification": "Japanese recruitment giant Recruit Holdings (parent company of Indeed and Glassdoor)",
    "emails": [
      "contact-india@rgf-professional.com"
    ],
    "primaryEmail": "contact-india@rgf-professional.com"
  }
];

export interface CertificateItem {
  name: string;
  img: string; // public path like /certificates/xyz.png
}

export const certificates: CertificateItem[] = [
  { name: "Internship Offer Letter (Future Interns)", img: "/offer-letter1.jpg" },
  { name: "Internship Certificate (Future Interns)", img: "/internship-certificate.jpg" },
  { name: "Python For Data Science (IBM)", img: "/IBM-Certificate.jpg" },
  { name: "Data Analytics Job Simulation (Deloitte)", img: "/delloite-certificate.jpg" },
  { name: "TCS iON Career Edge – Young Professional", img: "/tcs-ion-certificate.jpg" },
  { name: "SQL (Scaler Topics)", img: "/scaller-certificate.jpg" },
  { name: "Machine Learning – Simplilearn SkillUp", img: "/machine-learning-certificate.jpg" },
  { name: "Cybersecurity Analyst Job Simulation (Tata/Forage)", img: "/cyber security certificate.jpg" },
  { name: "HP LIFE – Data Science & Analytics", img: "/hp-certificate.jpg" },
  { name: "One Roadmap – Frontend Development", img: "/oneroadmap-certificate.jpg" },
  { name: "Udemy – Complete Full-Stack Web Dev Bootcamp", img: "/udemy fs certificate.jpg" },
  { name: "Oracle Cloud Infrastructure – Foundations/AI", img: "/oracle.png" },
];

export interface VolunteeringItem {
  label: string;
  href?: string;
}

export const volunteeringHighlights: VolunteeringItem[] = [
  {
    label: "Developed the official website for UDBHAV-2.0 hackathon",
    href: "https://mrit-udbhav-2025.netlify.app/",
  },
  { label: "Video editing and poster design" },
  { label: "Hospitality and event coordination" },
];



export interface ContentType {
  code: string;
  name: string;
}

export const initialGlobalContentTypes: ContentType[] = [
  { code: "BROCHE", name: "Brochures" },
  { code: "TESTMN", name: "Testimonials" },
  { code: "LMAP", name: "Location Maps" },
  { code: "PRIC", name: "Price Sheets" },
  { code: "PVID", name: "Project Videos" },
  { code: "FAQS", name: "FAQs" },
  { code: "LEGD", name: "Legal Document Samples" },
  { code: "FMSG", name: "Founder Message" },
  { code: "CSTR", name: "Customer Stories" },
];

export const initialProjectContentTypes: Record<string, string[]> = {
  "planet-green": ["BROCHE", "TESTMN", "LMAP", "PRIC", "PVID", "FAQS"],
  "farmnatura": ["BROCHE", "TESTMN", "PRIC", "FAQS", "CSTR"],
  "eco-world": ["LMAP", "PVID", "LEGD", "FMSG"],
};
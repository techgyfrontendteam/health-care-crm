export interface ContentItem {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  uploadedDate: string;
  fileType: "pdf" | "xlsx" | "dwg" | "png" | "mp4";
  contentType: string;
}

export const initialGlobalContent: ContentItem[] = [
  {
    id: "master-brochure",
    title: "Master Brochure",
    fileName: "Skyvillas_Brochure_V4.pdf",
    fileSize: "24.5 MB",
    uploadedDate: "12 Oct 2023",
    fileType: "pdf",
    contentType: "Brochures",
  },
  {
    id: "price-list-oct-23",
    title: "Price List - Oct 23",
    fileName: "Inventory_Matrix_Final.xlsx",
    fileSize: "1.2 MB",
    uploadedDate: "08 Oct 2023",
    fileType: "xlsx",
    contentType: "Brochures",
  },
  {
    id: "floor-plans-3bhk",
    title: "Floor Plans (3BHK)",
    fileName: "Plan_Type_A_3BHK.dwg",
    fileSize: "158 MB",
    uploadedDate: "15 Oct 2023",
    fileType: "dwg",
    contentType: "Brochures",
  },
  {
    id: "aerial-renderings",
    title: "Aerial Renderings",
    fileName: "Skyview_Night_01.png",
    fileSize: "8.4 MB",
    uploadedDate: "20 Oct 2023",
    fileType: "png",
    contentType: "Brochures",
  },
  {
    id: "legal-documents",
    title: "Legal Documents",
    fileName: "RERA_Approval_Cert.pdf",
    fileSize: "4.1 MB",
    uploadedDate: "02 Oct 2023",
    fileType: "pdf",
    contentType: "Legal document samples",
  },
  {
    id: "marketing-video",
    title: "Marketing Video",
    fileName: "Walkthrough_4K.mp4",
    fileSize: "412 MB",
    uploadedDate: "25 Oct 2023",
    fileType: "mp4",
    contentType: "Project videos",
  },
];

export const initialProjectContent: Record<string, string[]> = {
  "planet-green": ["master-brochure", "price-list-oct-23", "floor-plans-3bhk"],
  "farmnatura": ["price-list-oct-23", "aerial-renderings"],
  "eco-world": ["legal-documents", "marketing-video"],
};

export const contentTypesList = [
  "Brochures",
  "Testimonials",
  "Location maps",
  "Project videos",
  "FAQs",
  "Legal document samples",
  "Founder message",
  "Customer stories",
];

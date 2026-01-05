
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export interface SiteContent {
  home: {
    headline: string;
    subheadline: string;
    heroImageId: string;
  };
  about: {
    heading: string;
    paragraphs: string[];
    studioImageId: string;
  };
}

const CONTENT_DOC_ID = "site_configuration";
const SETTINGS_COLLECTION = "settings";

const DEFAULT_CONTENT: SiteContent = {
  home: {
    headline: "RAW IDEAS.\nDEFINED FORM.",
    subheadline: "RAWLINE explores the architectural stage of creation. The first line drawn before refinement becomes the structure of the garment.",
    heroImageId: "editorial_main"
  },
  about: {
    heading: "The first line before refinement.",
    paragraphs: [
      "RAWLINE explores the raw stage of creation — the intuitive sketch made physical. We believe that the most powerful form of expression exists at the inception of an idea, before it is softened by the pressure of perfection.",
      "Each piece in our collection is an architectural exercise. We focus on weight, silhouette, and the way a fabric holds a line. Our production is intentional, small-scale, and permanent. We do not restock; we evolve.",
      "Designed from instinct. Built for the individual."
    ],
    studioImageId: "about_studio"
  }
};

export async function fetchSiteContent(): Promise<SiteContent> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, CONTENT_DOC_ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as SiteContent;
    }
    return DEFAULT_CONTENT;
  } catch (error) {
    console.error("Error fetching site content:", error);
    return DEFAULT_CONTENT;
  }
}

export async function updateSiteContent(content: SiteContent) {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, CONTENT_DOC_ID);
    await setDoc(docRef, content, { merge: true });
  } catch (error) {
    console.error("Error updating site content:", error);
    throw error;
  }
}

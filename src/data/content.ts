import type { Category } from "@/data/types";
import { pcaEpisodes } from "@/data/guidelines/pca";
import { hikEpisodes } from "@/data/guidelines/hik";
import { htEpisodes } from "@/data/guidelines/ht";
import { bpsEpisodes } from "@/data/guidelines/bps";
import { phiEpisodes } from "@/data/guidelines/phi";

export const CONTENT: { categories: Category[] } = {
  categories: [
    // ══════════════════════════════════════════════
    //  1. ONKOLOGISCHE UROLOGIE
    // ══════════════════════════════════════════════
    {
      id: "onkologie",
      name: "Onkologische Urologie",
      icon: "🔬",
      color: "var(--brand-green)",
      available: true,
      description: "S3-Leitlinien zu urologischen Tumorerkrankungen",
      guidelines: [
        {
          id: "prostatakarzinom",
          name: "Prostatakarzinom",
          badge: "S3",
          available: true,
          description: "S3-Leitlinie Prostatakarzinom",
          episodes: pcaEpisodes,
        },
        {
          id: "hodentumor",
          name: "Hodentumoren",
          badge: "S3",
          available: true,
          description: "S3-Leitlinie Diagnostik, Therapie und Nachsorge der Keimzelltumoren des Hodens",
          episodes: htEpisodes,
        },
        {
          id: "harnblasenkarzinom",
          name: "Harnblasenkarzinom",
          badge: "S3",
          available: false,
          description: "S3-Leitlinie Harnblasenkarzinom",
          episodes: [],
        },
        {
          id: "nierenzellkarzinom",
          name: "Nierenzellkarzinom",
          badge: "S3",
          available: false,
          description: "S3-Leitlinie Nierenzellkarzinom",
          episodes: [],
        },
        {
          id: "peniskarzinom",
          name: "Peniskarzinom",
          badge: "S3",
          available: false,
          description: "S3-Leitlinie Peniskarzinom",
          episodes: [],
        },
      ],
    },

    // ══════════════════════════════════════════════
    //  2. BENIGNE & FUNKTIONELLE UROLOGIE
    // ══════════════════════════════════════════════
    {
      id: "benigne",
      name: "Benigne & Funktionelle Urologie",
      icon: "⚡",
      color: "var(--brand-green)",
      available: true,
      description: "Leitlinien zu benignen und funktionellen Erkrankungen",
      guidelines: [
        {
          id: "harninkontinenz",
          name: "Harninkontinenz der Frau",
          badge: "S2k",
          available: true,
          description: "S2k-Leitlinie Harninkontinenz der Frau",
          episodes: hikEpisodes,
        },
        {
          id: "bps",
          name: "Benignes Prostatasyndrom",
          badge: "S2e",
          available: true,
          description: "S2e-Leitlinie Diagnostik und Therapie des Benignen Prostatasyndroms",
          episodes: bpsEpisodes,
        },
        {
          id: "neurogene-blase",
          name: "Neurogene Blasenfunktionsstörungen",
          available: false,
          description: "Leitlinie Neurogene Blase",
          episodes: [],
        },
        {
          id: "erektile-dysfunktion",
          name: "Erektile Dysfunktion",
          available: false,
          description: "Leitlinie Erektile Dysfunktion",
          episodes: [],
        },
      ],
    },

    // ══════════════════════════════════════════════
    //  3. INFEKTIOLOGIE & ANDROLOGIE
    // ══════════════════════════════════════════════
    {
      id: "infektio",
      name: "Infektiologie & Andrologie",
      icon: "🦠",
      color: "var(--brand-green)",
      available: false,
      description: "Harnwegsinfekte, Entzündungen, männliche Fertilität",
      guidelines: [
        { id: "hwi", name: "Harnwegsinfektionen", badge: "S3", available: false, description: "S3-Leitlinie HWI", episodes: [] },
        { id: "epididymitis", name: "Epididymitis", available: false, description: "Leitlinie Epididymitis", episodes: [] },
        { id: "prostatitis", name: "Prostatitis", available: false, description: "Leitlinie Prostatitis", episodes: [] },
        { id: "maennliche-infertilitaet", name: "Männliche Infertilität", available: false, description: "Leitlinie Männliche Infertilität", episodes: [] },
      ],
    },

    // ══════════════════════════════════════════════
    //  4. KINDERUROLOGIE
    // ══════════════════════════════════════════════
    {
      id: "kinderuro",
      name: "Kinderurologie",
      icon: "🧒",
      color: "var(--brand-green)",
      available: true,
      description: "Leitlinien zu kinderurologischen Erkrankungen",
      guidelines: [
        {
          id: "phimose-paraphimose",
          name: "Phimose und Paraphimose",
          badge: "S2k",
          available: true,
          description: "S2k-Leitlinie Phimose und Paraphimose bei Kindern und Jugendlichen",
          episodes: phiEpisodes,
        },
        { id: "hodenhochstand", name: "Hodenhochstand", available: false, description: "Leitlinie Hodenhochstand", episodes: [] },
        { id: "vur", name: "Vesikoureteraler Reflux", available: false, description: "Leitlinie VUR", episodes: [] },
      ],
    },
  ],
};

export function getCategory(categoryId: string) {
  return CONTENT.categories.find((c) => c.id === categoryId);
}

export function getGuideline(categoryId: string, guidelineId: string) {
  const category = getCategory(categoryId);
  const guideline = category?.guidelines.find((g) => g.id === guidelineId);
  return { category, guideline };
}

export function getEpisode(categoryId: string, guidelineId: string, episodeId: string) {
  const { category, guideline } = getGuideline(categoryId, guidelineId);
  const episode = guideline?.episodes.find((e) => e.id === episodeId);
  return { category, guideline, episode };
}

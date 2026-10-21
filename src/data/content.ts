import type { Category } from "@/data/types";
import { pcaEpisodes } from "@/data/guidelines/pca";
import { hikEpisodes } from "@/data/guidelines/hik";
import { htEpisodes } from "@/data/guidelines/ht";
import { bpsEpisodes } from "@/data/guidelines/bps";
import { phiEpisodes } from "@/data/guidelines/phi";
import { nzkEpisodes } from "@/data/guidelines/nzk";
import { hbkEpisodes } from "@/data/guidelines/hbk";
import { pecaEpisodes } from "@/data/guidelines/peca";
import { icEpisodes } from "@/data/guidelines/ic";
import { uroEpisodes } from "@/data/guidelines/uro";
import { nlutdEpisodes } from "@/data/guidelines/nlutd";
import { hmiEpisodes } from "@/data/guidelines/hmi";
import { beekEpisodes } from "@/data/guidelines/beek";
import { nbfsEpisodes } from "@/data/guidelines/nbfs";
import { hwiEpisodes } from "@/data/guidelines/hwi";
import { andrologieGuidelines } from "@/data/guidelines/andrologie";

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
          year: 2025,
          available: true,
          description: "S3-Leitlinie Prostatakarzinom",
          episodes: pcaEpisodes,
        },
        {
          id: "hodentumor",
          name: "Hodentumoren",
          badge: "S3",
          year: 2026,
          available: true,
          description: "S3-Leitlinie Diagnostik, Therapie und Nachsorge der Keimzelltumoren des Hodens",
          episodes: htEpisodes,
        },
        {
          id: "harnblasenkarzinom",
          name: "Harnblasenkarzinom",
          badge: "S3",
          year: 2026,
          available: true,
          description: "S3-Leitlinie Harnblasenkarzinom",
          episodes: hbkEpisodes,
        },
        {
          id: "nierenzellkarzinom",
          name: "Nierenzellkarzinom",
          badge: "S3",
          year: 2024,
          available: true,
          description: "S3-Leitlinie Diagnostik, Therapie und Nachsorge des Nierenzellkarzinoms",
          episodes: nzkEpisodes,
        },
        {
          id: "peniskarzinom",
          name: "Peniskarzinom",
          badge: "S3",
          year: 2020,
          available: true,
          description: "S3-Leitlinie Diagnostik, Therapie und Nachsorge des Peniskarzinoms",
          episodes: pecaEpisodes,
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
          year: 2022,
          available: true,
          description: "S2k-Leitlinie Harninkontinenz der Frau",
          episodes: hikEpisodes,
        },
        {
          id: "bps",
          name: "Benignes Prostatasyndrom",
          badge: "S2e",
          year: 2023,
          available: true,
          description: "S2e-Leitlinie Diagnostik und Therapie des Benignen Prostatasyndroms",
          episodes: bpsEpisodes,
        },
        {
          id: "interstitielle-zystitis",
          name: "Interstitielle Zystitis (IC/BPS)",
          badge: "S2k",
          year: 2024,
          available: true,
          description: "S2k-Leitlinie Diagnostik und Therapie der Interstitiellen Zystitis (IC/BPS)",
          episodes: icEpisodes,
        },
        {
          id: "urolithiasis",
          name: "Urolithiasis",
          badge: "S2k",
          year: 2019,
          available: true,
          description: "S2k-Leitlinie Diagnostik, Therapie und Metaphylaxe der Urolithiasis",
          episodes: uroEpisodes,
        },
        {
          id: "neurogene-blase",
          name: "Neurogene Dysfunktion des unteren Harntraktes",
          badge: "S2k",
          year: 2022,
          available: false,
          description: "S2k-Leitlinie Medikamentöse Therapie der neurogenen Dysfunktion des unteren Harntraktes (NLUTD)",
          episodes: nlutdEpisodes,
        },
        {
          id: "erektile-dysfunktion",
          name: "Erektile Dysfunktion",
          available: false,
          description: "Leitlinie Erektile Dysfunktion",
          episodes: [],
        },
        {
          id: "hilfsmittel-inkontinenz",
          name: "Hilfsmittelberatung bei Harninkontinenz",
          badge: "S2k",
          year: 2025,
          available: false,
          description: "S2k-Leitlinie Hilfsmittelberatung bei Harninkontinenz",
          episodes: hmiEpisodes,
        },
      ],
    },

    // ══════════════════════════════════════════════
    //  3. INFEKTIOLOGIE
    // ══════════════════════════════════════════════
    {
      id: "infektio",
      name: "Infektiologie",
      icon: "🦠",
      color: "var(--brand-green)",
      available: true,
      description: "Harnwegsinfekte und Entzündungen",
      guidelines: [
        {
          id: "hwi",
          name: "Harnwegsinfektionen",
          badge: "S3",
          year: 2024,
          available: true,
          description: "S3-Leitlinie Epidemiologie, Diagnostik, Therapie, Prävention und Management unkomplizierter, bakterieller, ambulant erworbener Harnwegsinfektionen bei Erwachsenen",
          episodes: hwiEpisodes,
        },
        { id: "epididymitis", name: "Epididymitis", available: false, description: "Leitlinie Epididymitis", episodes: [] },
        { id: "prostatitis", name: "Prostatitis", available: false, description: "Leitlinie Prostatitis", episodes: [] },
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
          year: 2025,
          available: true,
          description: "S2k-Leitlinie Phimose und Paraphimose bei Kindern und Jugendlichen",
          episodes: phiEpisodes,
        },
        { id: "hodenhochstand", name: "Hodenhochstand", available: false, description: "Leitlinie Hodenhochstand", episodes: [] },
        { id: "vur", name: "Vesikoureteraler Reflux", available: false, description: "Leitlinie VUR", episodes: [] },
        {
          id: "blasenekstrophie-epispadie",
          name: "Blasenekstrophie-Epispadie-Komplex (BEEK)",
          badge: "S3",
          year: 2024,
          available: true,
          description: "S3-Leitlinie Epidemiologie, Diagnostik, Therapie und Nachsorge des Blasenekstrophie-Epispadie-Komplex (BEEK)",
          episodes: beekEpisodes,
        },
        {
          id: "spinale-dysraphie",
          name: "Neurogene Blasenfunktionsstörungen bei spinaler Dysraphie",
          badge: "S2k",
          year: 2019,
          available: false,
          description: "S2k-Leitlinie Diagnostik und Therapie der neurogenen Blasenfunktionsstörungen bei Kindern und Jugendlichen mit spinaler Dysraphie",
          episodes: nbfsEpisodes,
        },
      ],
    },

    // ══════════════════════════════════════════════
    //  5. ANDROLOGIE
    // ══════════════════════════════════════════════
    {
      id: "andrologie",
      name: "Andrologie",
      icon: "🧬",
      color: "var(--brand-green)",
      available: true,
      description: "Hormone, männliche Fertilität und Sexualmedizin",
      guidelines: andrologieGuidelines,
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

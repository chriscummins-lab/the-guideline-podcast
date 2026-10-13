// Tabler-Icon-Klassen je Kategorie. Ersetzt die bisherigen Emoji-Icons aus content.ts
// für ein einheitlicheres, App-artigeres Erscheinungsbild.
export const CATEGORY_ICONS: Record<string, string> = {
  onkologie: "ti-microscope",
  benigne: "ti-stethoscope",
  infektio: "ti-virus",
  kinderuro: "ti-baby-carriage",
};

export function categoryIconClass(categoryId: string): string {
  return CATEGORY_ICONS[categoryId] ?? "ti-stethoscope";
}

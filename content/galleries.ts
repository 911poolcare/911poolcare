import { getServiceGalleryImages, getTeamGalleryImages } from "@/content/media";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ShowcaseImage = GalleryImage & {
  label?: string;
};

function leakImage(file: string, alt: string, caption?: string): GalleryImage {
  return { src: `/images/leak/${file}`, alt, caption };
}

function equipmentImage(file: string, alt: string, caption?: string): GalleryImage {
  return { src: `/images/equipment/${file}`, alt, caption };
}

function renovationImage(file: string, alt: string, caption?: string): GalleryImage {
  return { src: `/images/renovations/${file}`, alt, caption };
}

function aboutImage(file: string, alt: string, caption?: string): GalleryImage {
  return { src: `/images/about/${file}`, alt, caption };
}

const legacyServiceGalleries: Record<string, GalleryImage[]> = {
  "pool-leak-detection": [
    leakImage(
      "2aca84_ca2b6ad55a664b9c995fc30463e49b63.jpg",
      "Pool leak detection equipment setup on a Central Texas pool deck",
    ),
    leakImage(
      "2aca84_7214fcac376f43248f407970bd1ff366.jpg",
      "Technician pressure testing pool plumbing lines for a leak",
    ),
    leakImage(
      "2aca84_b8db68146faf4c43ab7705e73eb822a5.jpg",
      "Electronic leak detection listening on pool plumbing",
    ),
    leakImage(
      "2aca84_0d2850523e254e9990924a3b9105460f.jpg",
      "Underwater dye testing around a pool skimmer",
    ),
    leakImage(
      "2aca84_3b373513d034422095b6d0ae56bf77ee.jpg",
      "Excavation to access and repair an underground pool pipe leak",
    ),
    leakImage(
      "2aca84_39809da03bd548d480ba88926818cc99.jpg",
      "Completed pool plumbing leak repair at the equipment pad",
    ),
  ],
  "pool-equipment-repair": [
    equipmentImage(
      "2aca84_6aead728145540548959869b7e5d1fb4.jpg",
      "Pool pump and filter equipment repair at the equipment pad",
    ),
    equipmentImage(
      "2aca84_f3c1257e9f0044c1a974b0a004d26a56.jpg",
      "Pool heater and plumbing equipment service",
    ),
    equipmentImage(
      "2aca84_ca68634753f04a94aea5c4dfb5cd9a97.jpg",
      "Replacement pool equipment installation",
    ),
  ],
  "pool-renovations": [
    renovationImage(
      "2aca84_74bf25962d114482ae5513e090ca422f.jpg",
      "Completed pool replaster project in Central Texas",
    ),
    renovationImage(
      "2aca84_04b7183199ec42c3bd2cfb43cac73718.jpg",
      "Pool renovation with new finish and updated waterline",
    ),
  ],
  "pool-inspections": [
    leakImage(
      "2aca84_0a47dee6572a4357a50aeb7679b32946.jpeg",
      "Pool inspection — equipment and pad evaluation",
    ),
    leakImage(
      "2aca84_41010546b6144bb9b6b11ebee0e211f4.jpeg",
      "Pool structure and surface inspection",
    ),
  ],
};

/** Composite before/after images from the legacy Wix renovation page */
export const renovationShowcase: ShowcaseImage[] = [
  {
    src: "/images/renovations/2aca84_9c593244a10f4a46988f0d8aa08756ad.png",
    alt: "Before and after pool replaster project in Leander, Texas",
    label: "Replaster — Leander",
    caption: "Old plaster removed and new finish applied.",
  },
  {
    src: "/images/renovations/2aca84_b2b28b3d9ad24cfbbde4236887bbd6f7.png",
    alt: "Before and after pool renovation in Cedar Park, Texas",
    label: "Renovation — Cedar Park",
    caption: "Replaster, tile cleaning, and equipment updates.",
  },
  {
    src: "/images/renovations/2aca84_a98f842292874b8a9b230bd1ee5e3665.png",
    alt: "Before and after pool replaster in Georgetown, Texas",
    label: "Replaster — Georgetown",
    caption: "Stonescapes plaster with MicroGlass seal.",
  },
];

export function getAboutGallery(): GalleryImage[] {
  const team = getTeamGalleryImages();
  if (team.length > 0) return team;

  return [
    aboutImage(
      "2aca84_6f37fdb1334b44068ab2e5ddc6be577f.jpg",
      "911 Pool Care team member on a pool service job in Central Texas",
    ),
    aboutImage(
      "2aca84_2182ff34fdf8454790eee4e70c5cb5d2.jpg",
      "911 Pool Care technician performing pool work on site",
    ),
    renovationImage(
      "2aca84_74bf25962d114482ae5513e090ca422f.jpg",
      "Finished pool renovation by 911 Pool Care",
    ),
  ];
}

export function getServiceGallery(slug: string): GalleryImage[] {
  const imported = getServiceGalleryImages(slug);
  if (imported.length > 0) return imported;
  return legacyServiceGalleries[slug] ?? [];
}

/** @deprecated Use getAboutGallery() */
export const aboutGallery = getAboutGallery();

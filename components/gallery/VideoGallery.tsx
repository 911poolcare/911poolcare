"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import type { GalleryVideo } from "@/content/media";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type VideoGalleryProps = {
  videos: GalleryVideo[];
  title?: string;
  description?: string;
  muted?: boolean;
};

export function VideoGallery({
  videos,
  title = "Project videos",
  description = "Short clips from recent jobs — detection, repairs, equipment work, and renovations.",
  muted = true,
}: VideoGalleryProps) {
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  if (videos.length === 0) return null;

  return (
    <>
      <Section muted={muted}>
        <Container>
          <SectionHeading eyebrow="Project videos" title={title} description={description} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <li key={video.src}>
                <button
                  type="button"
                  onClick={() => setActiveSrc(video.src)}
                  className="group relative block w-full overflow-hidden rounded-xl bg-slate-900 text-left ring-1 ring-slate-200 transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <div className="relative aspect-video bg-slate-800">
                    {video.poster ? (
                      <Image
                        src={video.poster}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover opacity-95"
                        aria-hidden
                      />
                    ) : null}
                    <span className="absolute inset-0 flex items-center justify-center bg-brand-950/25 transition-colors group-hover:bg-brand-950/35">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-brand-800 shadow-lg">
                        <Play className="ml-1 h-7 w-7" aria-hidden />
                      </span>
                    </span>
                  </div>
                  <p className="px-3 py-2 text-xs text-slate-600">{video.alt}</p>
                </button>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {activeSrc ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-950/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
        >
          <button
            type="button"
            onClick={() => setActiveSrc(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20"
          >
            Close
          </button>
          <video
            src={activeSrc}
            controls
            autoPlay
            playsInline
            preload="auto"
            className="max-h-[85vh] w-full max-w-4xl rounded-xl bg-black"
          />
        </div>
      ) : null}
    </>
  );
}

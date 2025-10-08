import { NextResponse } from "next/server";
import { v4 as uuidv4} from "uuid";
import prisma from "@/lib/prisma";


// Using oEmbed
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { url } = body;

//     if (!url) {
//       return NextResponse.json({ error: "URL is required" }, { status: 400 });
//     }

//     // --- Ekstrak source_music dari url ---
//     // Contoh: https://soundcloud.com/6ynthmane/manda-lina?si=...
//     const match = url.match(/soundcloud\.com\/([^?]+)/);
//     if (!match) {
//       return NextResponse.json({ error: "Invalid SoundCloud URL" }, { status: 400 });
//     }

//     const source_music = match[1]; // "6ynthmane/manda-lina"
//     const oEmbedUrl = `https://soundcloud.com/oembed?url=https://soundcloud.com/${source_music}&format=json`;

//     const metaRes = await fetch(oEmbedUrl);
//     if (!metaRes.ok) {
//       return NextResponse.json({ error: "Failed to fetch SoundCloud metadata" }, { status: 400 });
//     }

//     const meta = await metaRes.json();
//     const img_url = meta.thumbnail_url || "";
//     const title = meta.title || "";
//     const alt = meta.title ? `${meta.title} Artwork` : "";
//     const music_url = `https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/${source_music}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;

//     // --- Cek duplikat di DB ---
//     const existing = await prisma.link.findFirst({
//       where: { url: music_url },
//     });

//     if (existing) {
//       return NextResponse.json(
//         { error: "This song already exists" },
//         { status: 409 }
//       );
//     }

//     const newLink = await prisma.link.create({
//       data: {
//         id: uuidv4(),
//         img_alt: alt, 
//         img_url: img_url,
//         music_title: title,
//         url: music_url,
//     },
//     });

//     return NextResponse.json(newLink, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to save link" }, { status: 500 });
//   }
// }

// Using URL
const CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
const APP_VERSION = process.env.APP_VERSION;

export async function POST(req: Request) {
  const body = await req.json();
  const { url } = body;

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  // --- Ekstrak source_music dari url ---
    // Contoh: https://soundcloud.com/6ynthmane/manda-lina?si=...
  const match = url.match(/^(https?:\/\/soundcloud\.com\/([^?]+))/);
  if (!match) {
    return NextResponse.json({ error: "Invalid SoundCloud URL" }, { status: 400 });
  }

  const source_music = match[1];
  const track =  match[2];

  try {
    const apiUrl = `https://api-widget.soundcloud.com/resolve?url=${encodeURIComponent(
      source_music
    )}&format=json&client_id=${CLIENT_ID}&app_version=${APP_VERSION}`;

    const res = await fetch(apiUrl, { headers: { Accept: "application/json" } });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch SoundCloud API" },
        { status: res.status }
      );
    }

    const data = await res.json();
    const img_url = data.artwork_url || "";
    const title = data.title || "";
    const alt = data.title ? `${data.title} Artwork` : "";
    const music_url = `https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/${track}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;

    // --- Cek duplikat di DB ---
    const existing = await prisma.link.findFirst({
      where: { url: music_url },
    });

    if (existing) {
      return NextResponse.json(
        { error: "This song already exists" },
        { status: 409 }
      );
    }

    const newLink = await prisma.link.create({
      data: {
        id: uuidv4(),
        img_alt: alt, 
        img_url: img_url,
        music_title: title,
        url: music_url,
      },
    });

    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save link" }, { status: 500 });
  }
}
export async function GET() {
  try {
    const links = await prisma.link.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(links);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown server error" }, { status: 500 });
  }
}

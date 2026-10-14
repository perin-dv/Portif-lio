#!/usr/bin/env python3
"""Generate H.264/AAC web versions and genuine WebP posters from event masters.

Usage (PowerShell): python scripts/prepare_events.py "C:\Videos\Portfolio"
Requires FFmpeg and FFprobe on PATH. Does not upload or publish anything.
"""
import argparse
import json
import math
import shutil
import subprocess
from pathlib import Path

JOBS = [
    ("JULIA & MAYKE teaser.mp4", "julia-mayke-teaser"),
    ("Vanessa e Pablo.mp4", "vanessa-pablo"),
    ("CASAMENTO cleverson e nara.mp4", "cleverson-nara"),
    ("XV ANOS - JULIA AYALLA teaser.mp4", "julia-ayalla-teaser"),
    ("XV ANOS - JULIA AYALLA TRAILER.mp4", "julia-ayalla-trailer"),
    ("NAINARA & NICOLE teaser.mp4", "nainara-nicole-teaser"),
    ("Maria Clara trailer.mp4", "maria-clara-trailer"),
]


def run(args):
    subprocess.run(args, check=True)


def duration_of(source):
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(source)],
        capture_output=True, text=True, check=True)
    duration = float(result.stdout.strip())
    if not math.isfinite(duration) or duration <= 0:
        raise ValueError(f"Invalid duration: {source}")
    return duration


def extract_frame(video, target, at):
    run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-ss", f"{at:.2f}",
         "-i", str(video), "-frames:v", "1", "-vf", "scale=960:-2",
         "-c:v", "libwebp", "-quality", "82", str(target)])


def main():
    parser = argparse.ArgumentParser(description="Prepare original event videos for web")
    parser.add_argument("source_dir", type=Path, help="Directory with all seven original MP4 files")
    parser.add_argument("--output", type=Path, default=Path(__file__).resolve().parents[1] / "dist/assets/media")
    parser.add_argument("--max-mib", type=int, default=60, help="Approximate per-video size budget")
    parser.add_argument("--force", action="store_true", help="Regenerate existing outputs")
    args = parser.parse_args()
    if not shutil.which("ffmpeg") or not shutil.which("ffprobe"):
        parser.error("FFmpeg and FFprobe must be installed on PATH")
    missing = [f for f, _ in JOBS if not (args.source_dir / f).is_file()]
    if missing:
        parser.error("Missing source files: " + ", ".join(missing))
    args.output.mkdir(parents=True, exist_ok=True)
    review = args.output / "_review_poster_frames"
    review.mkdir(exist_ok=True)
    manifest = []

    for filename, slug in JOBS:
        source = args.source_dir / filename
        video = args.output / f"{slug}.mp4"
        poster = args.output / f"{slug}.webp"
        duration = duration_of(source)
        bitrate = min(3_500_000, int(args.max_mib * 1048576 * 8 / duration - 128_000))
        if bitrate < 1_150_000:
            raise ValueError(f"{filename} is too long for {args.max_mib} MiB with good quality; use a media CDN or increase --max-mib.")
        kbps = bitrate // 1000
        if args.force or not video.is_file():
            print(f"Encoding {filename} -> {video.name} ({duration:.1f} s)", flush=True)
            scale = ("scale=if(gte(iw\\,ih)\\,min(iw\\,1920)\\,min(iw\\,1080)):-2"
                     if kbps >= 2200 else
                     "scale=if(gte(iw\\,ih)\\,min(iw\\,1280)\\,min(iw\\,720)):-2")
            temp = video.with_suffix(".encoding.mp4")
            try:
                run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(source),
                     "-map", "0:v:0", "-map", "0:a:0?", "-vf", scale,
                     "-c:v", "libx264", "-preset", "medium", "-crf", "22",
                     "-maxrate", f"{kbps}k", "-bufsize", f"{kbps*2}k",
                     "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k",
                     "-movflags", "+faststart", "-map_metadata", "-1", str(temp)])
                temp.replace(video)
            finally:
                temp.unlink(missing_ok=True)
        if args.force or not poster.is_file():
            extract_frame(video, poster, min(duration * 0.35, max(0, duration - .3)))
        # Choose a beautiful REAL frame; replace the main .webp with your favourite.
        for index, fraction in enumerate((.15, .30, .45, .60, .75), 1):
            candidate = review / f"{slug}-{index}.webp"
            if args.force or not candidate.is_file():
                extract_frame(video, candidate, min(duration*fraction, max(0, duration-.3)))
        actual_mib = round(video.stat().st_size / 1048576, 1)
        print(f"Prepared {video.name}: {actual_mib} MiB, poster: {poster.name}", flush=True)
        manifest.append({"source": filename, "video": video.name, "poster": poster.name,
                         "duration_seconds": round(duration, 1), "size_mib": actual_mib})
    (review / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Review the five real frame options per video in _review_poster_frames.")
    print("Do NOT publish the _review_poster_frames directory.")


if __name__ == "__main__":
    main()

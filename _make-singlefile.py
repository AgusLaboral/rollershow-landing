"""Genera un index-standalone.html con todas las imágenes y videos
embebidos en base64 (data URIs). Resultado: un único archivo HTML
totalmente portable (incluye fonts via Google Fonts CDN — necesita
internet sólo para tipografía y avatares de testimonios).

Uso: python _make-singlefile.py
"""
import base64
import mimetypes
import re
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "index.html"
DST = ROOT / "index-standalone.html"
IMG_DIR = ROOT / "img"

mimetypes.add_type("video/mp4", ".mp4")
mimetypes.add_type("image/svg+xml", ".svg")


def encode_file(path: Path) -> str:
    """Read file and return data URI."""
    if not path.exists():
        return None
    mime, _ = mimetypes.guess_type(str(path))
    if not mime:
        mime = "application/octet-stream"
    data = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{data}"


def replace_asset(match: re.Match) -> str:
    full = match.group(0)
    url = match.group(2)
    # Skip absolute URLs
    if url.startswith(("http://", "https://", "data:", "//", "#")):
        return full
    asset_path = (ROOT / url).resolve()
    if not asset_path.exists():
        print(f"  [skip] not found: {url}")
        return full
    data_uri = encode_file(asset_path)
    if not data_uri:
        return full
    print(f"  [embed] {url}  ({len(data_uri)//1024} KB base64)")
    return f'{match.group(1)}{data_uri}{match.group(3)}'


def main():
    print(f"Reading: {SRC}")
    html = SRC.read_text(encoding="utf-8")

    # src="..." attribute (img, video, source, etc.)
    pattern = re.compile(r'(src=")([^"]+)(")', re.IGNORECASE)
    print("\nEmbedding src= assets...")
    html = pattern.sub(replace_asset, html)

    # background: url(...)
    bg_pattern = re.compile(r'(url\(["\']?)([^"\')]+)(["\']?\))', re.IGNORECASE)
    print("\nEmbedding url() assets...")
    html = bg_pattern.sub(replace_asset, html)

    DST.write_text(html, encoding="utf-8")
    size_mb = DST.stat().st_size / (1024 * 1024)
    print(f"\n[OK] Wrote {DST} ({size_mb:.1f} MB)")
    print("Note: Google Fonts and randomuser.me avatars remain external (need internet).")


if __name__ == "__main__":
    main()

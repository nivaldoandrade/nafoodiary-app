#!/usr/bin/env python3
"""Deriva todos os ícones do app a partir das artes-fonte em assets/.

Uso: python3 scripts/generate-icons.py
Requer apenas Pillow (já disponível no ambiente).
Veja scripts/README.md para o passo a passo de troca de ícone.
"""

from __future__ import annotations

import os
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "icon-source.png")
SRC_CUTOUT = os.path.join(ROOT, "assets", "icon-source-cutout.png")

# Coeficientes de layout dos ícones Android/PWA
ANDROID_FG = 512          # foreground/background do adaptive icon
ANDROID_MONO = 432        # monochrome (Android 13+)
SAFE_RATIO = 66 / 108     # safe zone do adaptive icon (circulo de 66dp em 108dp)
MASKABLE_RATIO = 0.80     # zona segura maskable (circulo de 80% da tela)
SPLASH_FIT = 0.70         # fração do logo no splash


def load_source() -> Image.Image:
    return Image.open(SRC).convert("RGB")


def sample_bg_color(im: Image.Image) -> tuple[int, int, int]:
    """Media de faixas centrais das bordas (regiao puramente fundo)."""
    px = im.load()
    w, h = im.size
    rs = gs = bs = n = 0
    for t in range(2, 8):
        for x in range(w // 4, 3 * w // 4, 3):
            for y in (t, h - 1 - t):
                r, g, b = px[x, y]
                rs += r
                gs += g
                bs += b
                n += 1
        for y in range(h // 4, 3 * h // 4, 3):
            for x in (t, w - 1 - t):
                r, g, b = px[x, y]
                rs += r
                gs += g
                bs += b
                n += 1
    return (rs // n, gs // n, bs // n)


def split_symbol_text(alpha: Image.Image) -> tuple[int, int, int, int]:
    """Retorna o bbox do simbolo (acima da faixa vazia que separa o texto)."""
    w, h = alpha.size
    px = alpha.load()
    rows = [sum(1 for x in range(w) if px[x, y] > 32) for y in range(h)]
    top = next(y for y in range(h) if rows[y] > 0)
    bottom = next(y for y in range(h - 1, -1, -1) if rows[y] > 0)

    best_run = 0
    best_start = top
    run = 0
    run_start = top
    for y in range(top, bottom + 1):
        if rows[y] == 0:
            if run == 0:
                run_start = y
            run += 1
            if run > best_run:
                best_run = run
                best_start = run_start
        else:
            run = 0
    if best_run < 10:
        raise SystemExit("nao achei faixa vazia entre simbolo e texto")

    cut = best_start
    minx, miny, maxx, maxy = w, h, 0, 0
    for y in range(top, cut):
        for x in range(w):
            if px[x, y] > 32:
                if x < minx:
                    minx = x
                if x > maxx:
                    maxx = x
                if y < miny:
                    miny = y
                if y > maxy:
                    maxy = y
    return (minx, miny, maxx + 1, maxy + 1)


def fit_within(logo: Image.Image, max_half_diag: float) -> Image.Image:
    """Reduz o logo para que a meia-diagonal do bbox caia no limite informado."""
    bbox = logo.split()[3].getbbox()
    if bbox is None:
        raise SystemExit("logo sem alpha")
    bw = bbox[2] - bbox[0]
    bh = bbox[3] - bbox[1]
    half_diag = ((bw / 2) ** 2 + (bh / 2) ** 2) ** 0.5
    scale = min(1.0, max_half_diag / half_diag)
    nw, nh = max(1, round(logo.width * scale)), max(1, round(logo.height * scale))
    return logo.resize((nw, nh), Image.LANCZOS)


def paste_centered(canvas: Image.Image, img: Image.Image) -> Image.Image:
    out = canvas.copy()
    x = (out.width - img.width) // 2
    y = (out.height - img.height) // 2
    out.alpha_composite(img, (max(x, 0), max(y, 0)))
    return out


def save(im: Image.Image, rel: str) -> None:
    path = os.path.join(ROOT, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path)
    print(f"  {rel}  {im.size[0]}x{im.size[1]}  {im.mode}")


def main() -> None:
    print("carregando", os.path.relpath(SRC, ROOT))
    master = load_source()

    bg_rgb = sample_bg_color(master)
    bg_hex = "#%02X%02X%02X" % bg_rgb
    print("cor de fundo amostrada:", bg_hex, bg_rgb)

    print("carregando cutout", os.path.relpath(SRC_CUTOUT, ROOT))
    logo = Image.open(SRC_CUTOUT).convert("RGBA")
    lb = logo.split()[3].getbbox()
    if lb is None:
        raise SystemExit("cutout sem alpha")
    logo_crop = logo.crop(lb)
    print("bbox do logo:", lb)

    sym_box = split_symbol_text(logo.split()[3])
    print("bbox do simbolo:", sym_box)

    full = master.resize((1024, 1024), Image.LANCZOS)
    assert full.mode == "RGB"

    # --- iOS / universal -------------------------------------------------
    save(full, "assets/icon.png")

    # --- Android adaptive icon ------------------------------------------
    fg = paste_centered(
        Image.new("RGBA", (ANDROID_FG, ANDROID_FG), (0, 0, 0, 0)),
        fit_within(logo_crop, SAFE_RATIO * ANDROID_FG / 2),
    )
    save(fg, "assets/android-icon-foreground.png")
    save(Image.new("RGB", (ANDROID_FG, ANDROID_FG), bg_rgb), "assets/android-icon-background.png")

    mono_src = fit_within(logo_crop, SAFE_RATIO * ANDROID_MONO / 2)
    white = Image.new("RGBA", mono_src.size, (255, 255, 255, 0))
    white.putalpha(mono_src.split()[3])
    save(paste_centered(Image.new("RGBA", (ANDROID_MONO, ANDROID_MONO), (0, 0, 0, 0)), white),
         "assets/android-icon-monochrome.png")

    # --- Splash -----------------------------------------------------------
    splash_logo = fit_within(logo_crop, SPLASH_FIT * 1024 / (2 ** 0.5))
    splash = paste_centered(Image.new("RGBA", (1024, 1024), (0, 0, 0, 0)), splash_logo)
    save(splash, "assets/splash-icon.png")
    # mesmo logo servido na raiz do site (overlay de splash do PWA no public/index.html)
    save(splash, "public/splash-icon.png")

    # --- Favicon: so o simbolo sobre o fundo da arte ----------------------
    sym_rgb = master.crop(sym_box)
    side = max(sym_rgb.width, sym_rgb.height)
    sq = Image.new("RGB", (side, side))
    sq.paste(sym_rgb, ((side - sym_rgb.width) // 2, (side - sym_rgb.height) // 2))
    save(sq.resize((48, 48), Image.LANCZOS), "assets/favicon.png")

    # --- PWA --------------------------------------------------------------
    save(full.resize((192, 192), Image.LANCZOS), "public/icon-192.png")
    save(full.resize((512, 512), Image.LANCZOS), "public/icon-512.png")

    # zona segura maskable = circulo de 80% da tela -> raio = 0.4 * lado
    mask_logo = fit_within(logo_crop, MASKABLE_RATIO * 512 / 2)
    mask = paste_centered(Image.new("RGBA", (512, 512), bg_rgb + (255,)), mask_logo).convert("RGB")
    save(mask, "public/icon-maskable-512.png")

    save(full.resize((180, 180), Image.LANCZOS), "public/apple-touch-icon.png")

    # preview do icone Android final (fundo + foreground)
    comp = paste_centered(Image.new("RGBA", (ANDROID_FG, ANDROID_FG), bg_rgb + (255,)), fg)
    comp.convert("RGB").save("/tmp/preview-android-icon.png")
    print("preview Android: /tmp/preview-android-icon.png")
    print("bg_hex para app.json:", bg_hex)


if __name__ == "__main__":
    sys.exit(main())

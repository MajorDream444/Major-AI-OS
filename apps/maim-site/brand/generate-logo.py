"""Create the interim MAIM email wordmark from the site's brand colors."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent / 'maim' / 'assets' / 'maim-email-logo.png'
im = Image.new('RGBA', (560, 150), (0, 0, 0, 0))
d = ImageDraw.Draw(im)
font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 94)
small = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 16)
d.text((6, -10), 'MAIM', font=font, fill='#C9931A', stroke_width=0)
d.text((8, 98), 'MAJOR AI MINDSET', font=small, fill='#242424')
for x, color in [(8, '#C9931A'), (94, '#1F8A4C'), (180, '#2A78D6')]:
    d.rounded_rectangle((x, 134, x + 78, 141), radius=3, fill=color)
im.save(OUT, optimize=True)
print(OUT)

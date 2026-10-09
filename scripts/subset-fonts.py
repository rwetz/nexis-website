from pathlib import Path
from io import BytesIO
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset
for name in ['sans','mono']:
 font=TTFont(f'assets/fonts/nexis-{name}-source.woff2')
 font=instantiateVariableFont(font,{'wght':(400,600)},inplace=True)
 buffer=BytesIO();font.save(buffer);buffer.seek(0);font=TTFont(buffer)
 options=subset.Options();options.hinting=False
 s=subset.Subsetter(options=options)
 s.populate(unicodes=list(range(32,127))+[0xa9,0xb7,0x2191,0x2193,0x2190,0x2192,0x2014,0x2013,0x2018,0x2019,0x201c,0x201d,0x2026])
 s.subset(font)
 for r in font['name'].names:
  if r.nameID in [1,4,6,16,17]: r.string=(f'Nexis{name.title()}Subset' if r.nameID==6 else f'Nexis {name.title()} Subset').encode(r.getEncoding())
 font.flavor='woff2';font.save(f'assets/fonts/nexis-{name}.woff2')
 print(name,Path(f'assets/fonts/nexis-{name}.woff2').stat().st_size)

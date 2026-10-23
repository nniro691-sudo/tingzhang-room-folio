from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from urllib.request import urlopen
root=Path(__file__).resolve().parents[1]/'public'
paths=['assets/index-CGTyUClS.css','models/Room_Portfolio.glb','draco/draco_wasm_wrapper.js','draco/draco_decoder.wasm','textures/video/Screen.mp4','shaders/perlin.png','audio/music/cosmic_candy.ogg','audio/sfx/click/bubble.ogg']
paths += ['images/'+x+'.webp' for x in ['community','computer','piano','profile_pic']]
paths += ['fonts/'+x+'-Regular.woff2' for x in ['MotleyForces','ShiftyNotes']]
paths += ['textures/skybox/'+x+'.webp' for x in ['px','nx','py','ny','pz','nz']]
paths += [f'textures/room/{mode}/{n}_texture_set_{mode}.webp' for mode in ['day','night'] for n in ['first','second','third','fourth']]
paths += [f'audio/sfx/piano/Key_{n}.ogg' for n in range(1,25)]
paths += [f'media/{mode}-favicon/{f}' for mode in ['dark','light'] for f in ['favicon-96x96.png','favicon.svg','favicon.ico','apple-touch-icon.png','site.webmanifest']]
def get(path):
 p=root/path;p.parent.mkdir(parents=True,exist_ok=True)
 try:
  p.write_bytes(urlopen('https://www.sooahs-room-folio.com/'+path,timeout=120).read());return path
 except Exception as e:return f'FAILED {path}: {e}'
with ThreadPoolExecutor(max_workers=10) as ex:
 for result in ex.map(get,paths):print(result,flush=True)

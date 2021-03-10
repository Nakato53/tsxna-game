# TSXNA-Framework Game Sample

Sample game for the TSXNA-Framework

- Work in progress
- Typescript based

## How to run

```bash
git clone https://github.com/Nakato53/tsxna-game.git myGame
npm install
npm run dev
```

## How to Load a content

```typescript
let texture: Texture2D = await this.Content.Load(
  Texture2D,
  "Content/images/texture.png"
);
let song: Song = await this.Content.Load(Song, "Content/song/song.mp3");
```

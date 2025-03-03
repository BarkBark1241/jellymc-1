# JellyMC

A meticulously designed landing page that brings your Minecraft server to life with fluid animations, real-time server status, and an elegant user interface.

## Features

• **Fluid Particles** — Dynamic background particles that respond to user configuration  
• **Real-Time Status** — Live server status and player count integration  
• **Seamless Copying** — One-touch IP copying with elegant animation feedback  
• **Responsive Design** — Perfectly adapted for every device  

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
# Server Configuration
VITE_SERVER_IP=play.yourserver.com
VITE_SERVER_PORT=25565

# Links
VITE_DISCORD_LINK=https://discord.gg/yourserver
VITE_STORE_LINK=/store
VITE_VOTE_LINK=/vote

# Particle Settings
VITE_PARTICLE_COLORS="#ff0000,#ff3333,#ff6666"
VITE_PARTICLE_SPEED=50        # 1-100: slower to faster
VITE_PARTICLE_SPAWN_RATE=50   # 1-100: fewer to more particles
VITE_PARTICLE_SIZE=0.5
VITE_PARTICLE_OPACITY=0.7
VITE_PARTICLE_COUNT_MULTIPLIER=1
```

3. Add required assets to `public/`:
- `logo.png` - Server logo
- `background.jpeg` - Background image
- `discord.svg` - Discord icon
- `store.png` - Store icon
- `vote.png` - Vote icon

## Development

Run the development server:
```bash
npm run dev
```

## Production

1. Build the project:
```bash
npm run build
```

2. Test production build locally:
```bash
npm run preview
```

3. Deploy options:
- Upload the `dist` folder to your web server, or
- [Recommended] Use hosting services like Vercel or Cloudflare Pages

---

<p align="center">
  © 2025 JellyMC. Developed by Noximity.
</p>

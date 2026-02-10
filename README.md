# 625 Ocean Street — AI Architecture Rendering Pipeline

**SFR FOR: 625 OCEAN STREET, SATELLITE BEACH, FLORIDA**  
**Engineering: EDC Engineering and Design Concepts, Inc.**  
**Developer: Everest Capital USA / BidDeed.AI**

---

## 📋 Project Summary

Three-story oceanfront single-family residence with:
- **Level 1** (1,966 sqft): Garage, Rec Room, Office, Bedroom, Entry Foyer
- **Level 2** (2,432 sqft): Kitchen, Great Room, Primary Suite, Bedrooms
- **Level 3** (1,913 sqft): Open Balcony, Sky Terrace, Summer Kitchen, Covered Porch

Source: 5-page architectural PDF from EDC Engineering (sheets A1-A5)

---

## 🗂️ Repository Structure

```
├── controlnet/                    # ControlNet-optimized images (white-on-black)
│   ├── east_elevation_controlnet.png    ⭐ PRIMARY input for Colab rendering
│   └── south_elevation_controlnet.png
├── elevations/                    # Clean elevation crops from PDF
│   ├── east_elevation.png
│   ├── south_elevation.png
│   ├── west_elevation.png
│   └── north_elevation.png
├── floorplans/                    # Clean floor plan crops from PDF
│   ├── floor_level1.png           # First Level (1,966 sqft)
│   ├── floor_level2.png           # Second Level (2,432 sqft)
│   └── floor_level3.png           # Third Level (1,913 sqft)
├── colab/                         # Google Colab notebook
│   └── 625_Ocean_Street_AI_Rendering.ipynb
├── comfyui/                       # ComfyUI workflow
│   └── architecture-workflow.json
├── web/                           # Web artifacts & dashboards
│   ├── 3d-model.html              # Interactive Three.js 3D model
│   ├── 3d-model-full.html         # Full 3D model with pool deck
│   ├── setup-guide.html           # Rendering pipeline setup guide
│   ├── ai-tools-comparison.jsx    # Paid tools comparison dashboard
│   ├── open-source-tools.jsx      # Open source tools comparison
│   └── updated-strategy.jsx       # Updated strategy (post-PDF analysis)
├── images/                        # Original Maket.ai guide images
│   └── ...
├── index.html                     # Original Maket.ai prompt guide
└── presentation.html              # Original presentation
```

---

## 🚀 Quick Start — Generate Photorealistic Renders

### Option 1: Google Colab (FREE, recommended)
1. Download `colab/625_Ocean_Street_AI_Rendering.ipynb`
2. Upload to [Google Colab](https://colab.research.google.com)
3. Set Runtime → GPU (T4)
4. Run cells 0-3 in order (~10 min setup)
5. Upload `controlnet/east_elevation_controlnet.png` to ControlNet
6. Set preprocessor to `canny`, paste prompt from built-in library
7. Generate → 30-60 sec → photorealistic render

### Option 2: Three.js 3D Model (runs locally)
- Open `web/3d-model-full.html` in any browser
- Interactive 3D walkthrough with orbit controls
- Shows all 3 floors + rooftop pool deck

---

## 🎯 ControlNet Strategy

| Input Image | Preprocessor | Best For |
|------------|-------------|----------|
| `east_elevation_controlnet.png` | **Canny** | East-facing exterior renders |
| `south_elevation_controlnet.png` | **Canny** | South-facing exterior renders |
| Floor plans (A3-A5) | **MLSD** | Interior room layout renders |
| 3D model screenshots | **Depth** | Perspective/aerial renders |

**Key Insight:** Elevation drawings are BETTER than floor plans for ControlNet exterior rendering because they show the actual building profile, windows, and roofline.

---

## 💡 Prompt Library (7 prompts included in Colab notebook)

1. 🏠 Exterior — Golden Hour Hero Shot
2. 🌅 Exterior — Twilight Dramatic
3. 🛋️ Interior — Open Living Space
4. 🏊 Pool Deck — Daytime
5. 🌙 Pool Deck — Evening
6. 🛏️ Interior — Master Bedroom
7. 🦅 Exterior — Aerial Drone Shot

---

## 📊 Tool Rankings (Updated with PDF Analysis)

| Rank | Tool | Best For | Cost |
|------|------|----------|------|
| #1 | Google Colab + ControlNet | Exterior renders from elevations | FREE |
| #2 | ArchiVinci | Floor plan → interior renders | $79 one-time |
| #3 | Maket.ai | Layout redesign & iteration | $30/mo |
| #4 | Sweet Home 3D | Manual 3D walkthrough | FREE |
| #5 | FloorplanToBlender3d | ~~3D geometry~~ Too complex for construction drawings | FREE |

---

*Built by BidDeed.AI / Everest Capital USA — Feb 2026*  
*Engineer of Record: Edward F. Shinske, PE — EDC Engineering*

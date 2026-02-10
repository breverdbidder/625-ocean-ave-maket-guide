import { useState } from "react";

const tools = [
  {
    rank: 1,
    name: "ComfyUI + ControlNet",
    tagline: "Most Powerful Open Source Diffusion Pipeline",
    repo: "github.com/comfyanonymous/ComfyUI",
    stars: "89K+",
    license: "GPL-3.0",
    language: "Python",
    gpu: "4GB+ VRAM (8GB+ recommended)",
    scores: { renderQuality: 9, floorplanSupport: 7, easeOfUse: 5, community: 10, activedev: 10 },
    total: 41,
    verdict: "⭐ BEST OVERALL",
    color: "#10b981",
    description: "Node-based UI for Stable Diffusion with ControlNet integration. Design complex rendering pipelines visually. Supports SDXL, Flux, and every major diffusion model. The MLSD and Depth ControlNet models turn floor plans and 3D wireframes into photorealistic architectural renders.",
    workflow: "Upload floor plan image → Apply ControlNet (MLSD for lines or Depth for spatial) → Set architecture-focused text prompt → Generate photorealistic render → Upscale with built-in models",
    pros: [
      "89K+ GitHub stars, massive community",
      "Node-based = infinite pipeline flexibility",
      "ControlNet turns YOUR floor plan into renders",
      "Supports SDXL, Flux, SD3 — latest models",
      "Custom nodes for architecture workflows",
      "Runs locally, no API costs",
      "Weekly releases, very active development"
    ],
    cons: [
      "Steep learning curve (node-based interface)",
      "Requires NVIDIA GPU (4GB minimum)",
      "No built-in floor plan parser — needs ControlNet setup",
      "Configuration-heavy before first render"
    ],
    bestFor: "Maximum quality photorealistic renders from floor plan images. Best when you want full control over the rendering pipeline and are willing to invest setup time."
  },
  {
    rank: 2,
    name: "AUTOMATIC1111 WebUI",
    tagline: "Most Popular & Beginner-Friendly SD Interface",
    repo: "github.com/AUTOMATIC1111/stable-diffusion-webui",
    stars: "145K+",
    license: "AGPL-3.0",
    language: "Python",
    gpu: "4GB+ VRAM",
    scores: { renderQuality: 8, floorplanSupport: 7, easeOfUse: 8, community: 10, activedev: 7 },
    total: 40,
    verdict: "🏆 EASIEST ENTRY",
    color: "#3b82f6",
    description: "The original and most popular Stable Diffusion web interface. Simple Gradio-based UI with ControlNet extension for architecture rendering. Upload a floor plan, apply MLSD or Canny edge detection, and generate photorealistic interior/exterior renders with text prompts.",
    workflow: "Install A1111 → Add ControlNet extension → Upload floor plan → Select MLSD preprocessor → Write architecture prompt → Generate → Inpaint to refine details",
    pros: [
      "145K+ stars — largest SD community ever",
      "Traditional UI (not nodes) — much easier to learn",
      "ControlNet extension handles floor plan → render",
      "Img2img + inpainting for iterative refinement",
      "Thousands of architecture-focused models on CivitAI",
      "Extensive documentation and tutorials",
      "Forge fork adds speed optimizations"
    ],
    cons: [
      "Less flexible than ComfyUI for complex pipelines",
      "Slower development pace recently",
      "Some newer models (Flux) better supported in ComfyUI",
      "Extension conflicts can occur"
    ],
    bestFor: "Quickest path from floor plan to photorealistic render if you're new to Stable Diffusion. Simpler interface than ComfyUI with 90% of the capability."
  },
  {
    rank: 3,
    name: "FloorplanToBlender3d",
    tagline: "Direct Floor Plan Image → 3D Blender Model",
    repo: "github.com/grebtsew/FloorplanToBlender3d",
    stars: "510+",
    license: "MIT",
    language: "Python",
    gpu: "None required (CPU works)",
    scores: { renderQuality: 6, floorplanSupport: 10, easeOfUse: 6, community: 5, activedev: 5 },
    total: 32,
    verdict: "🏗️ BEST 3D MODELS",
    color: "#f59e0b",
    description: "Converts floor plan images directly into 3D Blender models using computer vision (OpenCV). No AI/GPU needed. Detects walls, rooms, and doors from floor plan images, then generates editable 3D geometry in Blender. Export to Unity, Unreal, or any CAD software. Includes a Swagger API server for batch processing.",
    workflow: "Provide floor plan image (PNG/PDF) → Script detects walls/rooms via OpenCV → Generates .blend file with 3D rooms → Open in Blender → Add textures/materials → Render with Cycles/Eevee",
    pros: [
      "DIRECT floor plan → 3D model (exactly what you need)",
      "No GPU required — runs on any hardware",
      "MIT license — use commercially, no restrictions",
      "Exports to Blender → Unity/Unreal/CAD",
      "StackingFiles for multi-floor buildings",
      "Docker support + Swagger API for automation",
      "Lightweight, fast processing"
    ],
    cons: [
      "Not photorealistic on its own (needs Blender rendering)",
      "Floor plan images must be clean/simple for best detection",
      "Smaller community (510 stars)",
      "Manual texturing required in Blender",
      "Detection can struggle with complex floor plans"
    ],
    bestFor: "When you need actual 3D geometry from floor plans (not just rendered images). Perfect for creating editable 3D models of 625 Ocean Street that you can walk through, modify, and render from any angle."
  },
  {
    rank: 4,
    name: "HomeDiffusion",
    tagline: "Stable Diffusion Fine-Tuned for Home Design",
    repo: "github.com/HomeDiffusion/HomeDiffusion",
    stars: "200+",
    license: "Apache-2.0",
    language: "Python",
    gpu: "8GB+ VRAM",
    scores: { renderQuality: 7, floorplanSupport: 6, easeOfUse: 7, community: 3, activedev: 3 },
    total: 26,
    verdict: "🏠 HOME-SPECIFIC",
    color: "#8b5cf6",
    description: "Purpose-built open source project using fine-tuned Stable Diffusion + ControlNet specifically for home design. Uses the MLSD (straight line) ControlNet model to preserve architectural lines while generating design concepts. Run your own home design studio locally.",
    workflow: "Clone repo → Download ControlNet MLSD model → Activate conda environment → Upload home image or floor plan → Generate design variations via text prompts",
    pros: [
      "Built specifically for home/interior design",
      "Pre-configured ControlNet MLSD pipeline",
      "Apache 2.0 license — commercially friendly",
      "Simpler setup than generic ComfyUI",
      "Preserves architectural straight lines",
      "Good for rapid design iteration"
    ],
    cons: [
      "Smaller project, less active development",
      "Based on older SD 1.5 (not SDXL/Flux)",
      "Limited to ControlNet MLSD model only",
      "Fewer customization options than ComfyUI/A1111",
      "May need updates for latest dependencies"
    ],
    bestFor: "Quick home design concept generation without the complexity of setting up ComfyUI or A1111 from scratch. Good starting point if you specifically want home-focused renders."
  },
  {
    rank: 5,
    name: "Sweet Home 3D",
    tagline: "Traditional Open Source Interior Design App",
    repo: "sourceforge.net/projects/sweethome3d",
    stars: "N/A (SourceForge)",
    license: "GPL-2.0",
    language: "Java",
    gpu: "None required",
    scores: { renderQuality: 5, floorplanSupport: 9, easeOfUse: 9, community: 7, activedev: 7 },
    total: 37,
    verdict: "🎯 MOST PRACTICAL",
    color: "#ef4444",
    description: "Mature, production-ready interior design application (v7.5, May 2025). Draw floor plans, place furniture from built-in library, generate 3D walkthroughs. Available as desktop app (Win/Mac/Linux), mobile (iOS/Android), and web browser. 29 languages. Not AI-powered but extremely reliable for actual floor plan work.",
    workflow: "Draw walls in 2D editor → Add doors/windows → Drag furniture from library → Switch to 3D view → Adjust materials/lighting → Export photorealistic render or 3D walkthrough video",
    pros: [
      "Most mature project (v7.5, actively maintained since 2006)",
      "Works everywhere: desktop, mobile, browser",
      "No GPU needed, no AI setup complexity",
      "Built-in furniture library with thousands of items",
      "Photorealistic rendering via SunFlow engine",
      "Import/export: OBJ, 3DS, DAE, KMZ",
      "29 languages supported",
      "Reliable and battle-tested"
    ],
    cons: [
      "Not AI-powered — manual placement required",
      "No text-to-render or NLP capabilities",
      "Renders are good but not cutting-edge photorealistic",
      "Java-based (can feel dated vs modern web apps)",
      "No ControlNet-style floor plan → render magic"
    ],
    bestFor: "When you need a reliable, no-GPU, no-AI-setup tool to create 3D walkthroughs of 625 Ocean Street RIGHT NOW. Best for practical interior design work vs. photorealistic concept art."
  },
  {
    rank: 6,
    name: "HouseCrafter (Research)",
    tagline: "Floorplan → Full 3D Scene via Diffusion Model",
    repo: "neu-vi.github.io/houseCrafter",
    stars: "Research (arXiv 2024)",
    license: "Research (code coming)",
    language: "Python",
    gpu: "16GB+ VRAM",
    scores: { renderQuality: 8, floorplanSupport: 9, easeOfUse: 2, community: 2, activedev: 4 },
    total: 25,
    verdict: "🔬 CUTTING EDGE",
    color: "#06b6d4",
    description: "State-of-the-art research from Northeastern University. Lifts 2D floor plans into complete 3D indoor scenes using adapted Stable Diffusion. Generates consistent RGB-D images autoregressively along floor plan locations, then reconstructs full 3D scenes. Published at ICLR 2025.",
    workflow: "Provide 2D floor plan → Model generates multi-view RGB-D images batch-by-batch → Layout attention ensures room consistency → 3D scene reconstructed from generated views",
    pros: [
      "Most advanced floor plan → 3D scene technology",
      "Generates FULL furnished 3D scenes from floor plans",
      "Layout-attention ensures global consistency",
      "Depth-enhanced for accurate 3D reconstruction",
      "Published at ICLR 2025 (top venue)",
      "Code + model weights promised for release"
    ],
    cons: [
      "Code not fully released yet (as of early 2026)",
      "Requires significant GPU (16GB+ VRAM)",
      "Research project — not production-ready",
      "Complex setup with multiple dependencies",
      "Trained on 3D-Front dataset (may not generalize well)",
      "No web UI — command line only"
    ],
    bestFor: "Future reference — when code is fully released, this could be the ultimate floor plan → 3D scene tool. Monitor the GitHub repo for release. NOT ready for immediate use on 625 Ocean Street."
  }
];

const categories = [
  { key: "renderQuality", label: "Render Quality", icon: "🎨" },
  { key: "floorplanSupport", label: "Floor Plan Support", icon: "📐" },
  { key: "easeOfUse", label: "Ease of Use", icon: "⚡" },
  { key: "community", label: "Community", icon: "👥" },
  { key: "activedev", label: "Active Development", icon: "🔧" }
];

function ScoreBar({ score, max = 10, color }) {
  const pct = (score / max) * 100;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 120, height: 6, background: "#1a1a2e", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.6s ease" }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color, minWidth: 24 }}>{score}</span>
    </div>
  );
}

function ToolCard({ tool, isExpanded, onToggle }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0d1117 0%, #161b22 100%)",
        border: `1px solid ${tool.color}33`,
        borderRadius: 16,
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: isExpanded ? `0 0 30px ${tool.color}15` : "none"
      }}
    >
      <div
        onClick={onToggle}
        style={{
          padding: "20px 24px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          borderBottom: isExpanded ? `1px solid ${tool.color}22` : "none"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: `${tool.color}18`, border: `2px solid ${tool.color}44`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 18, color: tool.color, flexShrink: 0
          }}>
            #{tool.rank}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#e6edf3", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>{tool.name}</h3>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
                background: `${tool.color}22`, color: tool.color, whiteSpace: "nowrap"
              }}>
                {tool.verdict}
              </span>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#8b949e", lineHeight: 1.3 }}>{tool.tagline}</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
          <div style={{ textAlign: "right", display: window.innerWidth > 640 ? "block" : "none" }}>
            <div style={{ fontSize: 11, color: "#8b949e", textTransform: "uppercase", letterSpacing: 1 }}>Score</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: tool.color, fontFamily: "'JetBrains Mono', monospace" }}>{tool.total}<span style={{ fontSize: 13, color: "#484f58" }}>/50</span></div>
          </div>
          <div style={{
            fontSize: 18, color: "#8b949e", transition: "transform 0.3s",
            transform: isExpanded ? "rotate(180deg)" : "rotate(0)"
          }}>▼</div>
        </div>
      </div>

      {isExpanded && (
        <div style={{ padding: "20px 24px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20, marginBottom: 20
          }}>
            {/* Meta Info */}
            <div style={{ background: "#0d111799", borderRadius: 12, padding: 16, border: "1px solid #21262d" }}>
              <h4 style={{ margin: "0 0 12px", fontSize: 13, color: tool.color, textTransform: "uppercase", letterSpacing: 1.5 }}>Repository Info</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  ["Repo", tool.repo],
                  ["Stars", tool.stars],
                  ["License", tool.license],
                  ["Language", tool.language],
                  ["GPU Req", tool.gpu]
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: "#8b949e" }}>{k}</span>
                    <span style={{ color: "#e6edf3", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, textAlign: "right", maxWidth: "60%" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scores */}
            <div style={{ background: "#0d111799", borderRadius: 12, padding: 16, border: "1px solid #21262d" }}>
              <h4 style={{ margin: "0 0 12px", fontSize: 13, color: tool.color, textTransform: "uppercase", letterSpacing: 1.5 }}>Scoring Breakdown</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {categories.map(c => (
                  <div key={c.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: "#c9d1d9" }}>{c.icon} {c.label}</span>
                    <ScoreBar score={tool.scores[c.key]} color={tool.color} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ background: "#0d111799", borderRadius: 12, padding: 16, border: "1px solid #21262d", marginBottom: 16 }}>
            <h4 style={{ margin: "0 0 8px", fontSize: 13, color: tool.color, textTransform: "uppercase", letterSpacing: 1.5 }}>Overview</h4>
            <p style={{ margin: 0, fontSize: 14, color: "#c9d1d9", lineHeight: 1.6 }}>{tool.description}</p>
          </div>

          {/* Workflow */}
          <div style={{ background: `${tool.color}08`, borderRadius: 12, padding: 16, border: `1px solid ${tool.color}22`, marginBottom: 16 }}>
            <h4 style={{ margin: "0 0 8px", fontSize: 13, color: tool.color, textTransform: "uppercase", letterSpacing: 1.5 }}>⚡ Workflow for 625 Ocean St</h4>
            <p style={{ margin: 0, fontSize: 14, color: "#e6edf3", lineHeight: 1.6, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{tool.workflow}</p>
          </div>

          {/* Pros/Cons */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 16 }}>
            <div style={{ background: "#0d111799", borderRadius: 12, padding: 16, border: "1px solid #21262d" }}>
              <h4 style={{ margin: "0 0 10px", fontSize: 13, color: "#10b981", textTransform: "uppercase", letterSpacing: 1.5 }}>✅ Pros</h4>
              {tool.pros.map((p, i) => (
                <div key={i} style={{ fontSize: 13, color: "#c9d1d9", padding: "4px 0", lineHeight: 1.5 }}>
                  <span style={{ color: "#10b981", marginRight: 8 }}>+</span>{p}
                </div>
              ))}
            </div>
            <div style={{ background: "#0d111799", borderRadius: 12, padding: 16, border: "1px solid #21262d" }}>
              <h4 style={{ margin: "0 0 10px", fontSize: 13, color: "#f87171", textTransform: "uppercase", letterSpacing: 1.5 }}>⚠️ Cons</h4>
              {tool.cons.map((c, i) => (
                <div key={i} style={{ fontSize: 13, color: "#c9d1d9", padding: "4px 0", lineHeight: 1.5 }}>
                  <span style={{ color: "#f87171", marginRight: 8 }}>−</span>{c}
                </div>
              ))}
            </div>
          </div>

          {/* Best For */}
          <div style={{ background: `${tool.color}0a`, borderRadius: 12, padding: 16, border: `1px dashed ${tool.color}44` }}>
            <h4 style={{ margin: "0 0 6px", fontSize: 13, color: tool.color }}>🎯 BEST FOR</h4>
            <p style={{ margin: 0, fontSize: 14, color: "#e6edf3", lineHeight: 1.5 }}>{tool.bestFor}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OpenSourceRenderingTools() {
  const [expanded, setExpanded] = useState(new Set([0]));

  const toggle = (i) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#010409",
      color: "#e6edf3",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: "32px 20px"
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#58a6ff", textTransform: "uppercase", letterSpacing: 3, marginBottom: 8, fontWeight: 700 }}>
            GitHub Open Source
          </div>
          <h1 style={{
            margin: "0 0 8px", fontSize: 32, fontWeight: 900,
            background: "linear-gradient(135deg, #58a6ff, #10b981, #f59e0b)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace"
          }}>
            AI Rendering Tools
          </h1>
          <p style={{ margin: "0 0 16px", fontSize: 15, color: "#8b949e", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
            Floor Plan → 3D Model & Photorealistic Rendering — Free & Open Source alternatives to ArchiVinci, Maket.ai, and Snaptrude
          </p>
          <div style={{
            display: "inline-flex", gap: 16, flexWrap: "wrap", justifyContent: "center",
            background: "#0d1117", borderRadius: 12, padding: "12px 20px", border: "1px solid #21262d"
          }}>
            {[
              { label: "Cost", value: "$0", color: "#10b981" },
              { label: "Tools", value: "6", color: "#58a6ff" },
              { label: "Top Stars", value: "145K+", color: "#f59e0b" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: s.color, fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#8b949e", textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategy Box */}
        <div style={{
          background: "linear-gradient(135deg, #10b98112, #3b82f612)",
          border: "1px solid #10b98133",
          borderRadius: 14, padding: 20, marginBottom: 28
        }}>
          <h3 style={{ margin: "0 0 10px", fontSize: 15, color: "#10b981", fontFamily: "'JetBrains Mono', monospace" }}>
            🎯 RECOMMENDED STRATEGY FOR 625 OCEAN ST
          </h3>
          <div style={{ fontSize: 14, color: "#c9d1d9", lineHeight: 1.7 }}>
            <strong style={{ color: "#e6edf3" }}>Fastest path:</strong> Sweet Home 3D (no setup, draw floor plan, instant 3D walkthrough) — use TODAY.<br/>
            <strong style={{ color: "#e6edf3" }}>Best renders:</strong> ComfyUI + ControlNet MLSD (upload floor plan image → photorealistic output) — weekend project to set up.<br/>
            <strong style={{ color: "#e6edf3" }}>Actual 3D model:</strong> FloorplanToBlender3d (floor plan → editable 3D geometry → render from any angle).<br/>
            <strong style={{ color: "#e6edf3" }}>Quick win:</strong> A1111 WebUI with ControlNet — simpler than ComfyUI, 90% of the quality.
          </div>
        </div>

        {/* Comparison Chart */}
        <div style={{
          background: "#0d1117", borderRadius: 14, padding: 20, marginBottom: 28,
          border: "1px solid #21262d", overflowX: "auto"
        }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 14, color: "#58a6ff", textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "'JetBrains Mono', monospace" }}>
            Quick Comparison Matrix
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "8px 12px", color: "#8b949e", borderBottom: "1px solid #21262d", fontWeight: 600 }}>Tool</th>
                {categories.map(c => (
                  <th key={c.key} style={{ textAlign: "center", padding: "8px 6px", color: "#8b949e", borderBottom: "1px solid #21262d", fontWeight: 600, fontSize: 11 }}>
                    {c.icon}<br/>{c.label.split(" ")[0]}
                  </th>
                ))}
                <th style={{ textAlign: "center", padding: "8px 12px", color: "#f59e0b", borderBottom: "1px solid #21262d", fontWeight: 700 }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {tools.map(t => (
                <tr key={t.rank} style={{ borderBottom: "1px solid #21262d11" }}>
                  <td style={{ padding: "10px 12px", color: t.color, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
                    #{t.rank} {t.name.split(" ")[0]}
                  </td>
                  {categories.map(c => (
                    <td key={c.key} style={{ textAlign: "center", padding: "10px 6px" }}>
                      <span style={{
                        display: "inline-block", width: 28, height: 28, lineHeight: "28px",
                        borderRadius: 8, fontSize: 12, fontWeight: 800,
                        background: t.scores[c.key] >= 8 ? "#10b98120" : t.scores[c.key] >= 6 ? "#f59e0b15" : "#f8717110",
                        color: t.scores[c.key] >= 8 ? "#10b981" : t.scores[c.key] >= 6 ? "#f59e0b" : "#f87171"
                      }}>
                        {t.scores[c.key]}
                      </span>
                    </td>
                  ))}
                  <td style={{ textAlign: "center", padding: "10px 12px", fontWeight: 900, color: t.color, fontFamily: "'JetBrains Mono', monospace", fontSize: 15 }}>
                    {t.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tool Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tools.map((tool, i) => (
            <ToolCard
              key={tool.rank}
              tool={tool}
              isExpanded={expanded.has(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 28, padding: 20, background: "#0d1117",
          borderRadius: 14, border: "1px solid #21262d", textAlign: "center"
        }}>
          <p style={{ margin: 0, fontSize: 13, color: "#8b949e" }}>
            Comparison for 625 Ocean Street project • All tools are free and open source • Scores rated /10 per category
          </p>
          <p style={{ margin: "8px 0 0", fontSize: 12, color: "#484f58" }}>
            Generated by BidDeed.AI Research • February 2026
          </p>
        </div>
      </div>
    </div>
  );
}

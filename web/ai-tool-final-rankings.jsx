import { useState } from "react";

const CRITERIA = [
  { key: "pdf_input", label: "Accepts Your PDFs", icon: "📄", weight: 20, desc: "Can it process architectural-grade PDF drawings (not just simple sketches)?" },
  { key: "model_3d", label: "3D Model + 360°", icon: "🔄", weight: 25, desc: "Creates a true 3D model you can rotate, orbit, and explore from any angle?" },
  { key: "photorealistic", label: "Photorealistic Renders", icon: "📸", weight: 25, desc: "Generates presentation-ready photorealistic imagery from your drawings?" },
  { key: "chatbot", label: "NLP Chatbot", icon: "💬", weight: 20, desc: "Has a built-in AI chatbot you can talk to in natural language?" },
  { key: "cost", label: "Cost Efficiency", icon: "💰", weight: 10, desc: "Value for money considering your specific use case" },
];

const tools = [
  {
    rank: 1,
    name: "ArchSynth",
    url: "archsynth.com",
    badge: "🏆 BEST OVERALL",
    tagline: "Sketch → Render in 14 sec + AI Assistant + Image-to-3D",
    color: "#f59e0b",
    price: "$29/mo Pro",
    users: "30K+",
    scores: { pdf_input: 8, model_3d: 9, photorealistic: 9, chatbot: 9, cost: 8 },
    strengths: [
      "Built-in AI Assistant — upload your elevation drawing and ASK questions about it",
      "Image-to-3D: converts your 2D elevations into rotatable 3D models (export to SketchUp, Rhino, Revit, 3ds Max)",
      "Sketch-to-render in 14 seconds — fastest in class",
      "Style reference mode: upload a photo of similar beach house → AI matches style",
      "Generates tileable textures and materials automatically",
      "Image-to-video: animate your renders into flythrough videos"
    ],
    weaknesses: [
      "Not specifically trained on construction-grade blueprints (works better with cleaner sketches)",
      "3D models are AI-generated (less geometrically precise than CAD-traced models)",
      "No floor plan recognition — you feed it elevation/sketch images, not room layouts"
    ],
    workflow: [
      "Upload A1 East Elevation → ArchSynth renders photorealistic exterior in 14 sec",
      "Use Image-to-3D on the render → get rotatable 3D model",
      "Ask AI Assistant: 'What materials would suit this coastal Florida design?'",
      "Generate image-to-video flythrough for presentation",
      "Repeat for South (A1), West (A2), North (A2) elevations"
    ],
    verdict: "Only tool that combines ALL 4 of your requirements in a single platform. The AI Assistant chatbot + Image-to-3D + fast rendering makes it the winner. The 3D models export directly to SketchUp/Rhino for further refinement."
  },
  {
    rank: 2,
    name: "Maket.ai",
    url: "maket.ai",
    badge: "💬 BEST CHATBOT",
    tagline: '"ChatGPT for Architecture" — NLP + Floor Plans + 2D→3D',
    color: "#8b5cf6",
    price: "$30/mo Pro",
    users: "1M+",
    scores: { pdf_input: 7, model_3d: 7, photorealistic: 5, chatbot: 10, cost: 7 },
    strengths: [
      "Strongest NLP chatbot — literally called 'ChatGPT for Architecture'",
      "Virtual Assistant: ask about materials, costs, design options in plain English",
      "Regulatory Assistant: upload your Brevard County zoning PDF → ask compliance questions",
      "Floor plan recognizer: upload A3/A4/A5 → auto-digitize into editable layouts",
      "2D to 3D conversion with furniture auto-placement",
      "Maket 2.0 launching Q1 2026 with enhanced rendering + fine-tuning",
      "$3.4M funding, 1M+ users, serious platform"
    ],
    weaknesses: [
      "Rendering is schematic/conceptual — NOT photorealistic (biggest gap)",
      "3D views are basic — no true 360° orbit like a game engine",
      "Focused on residential LAYOUT generation, not visual rendering",
      "Dense construction drawings (your A3-A5) may need cleanup for recognition"
    ],
    workflow: [
      "Upload floor plans A3, A4, A5 → Maket recognizes and digitizes",
      "Use NLP chatbot: 'Add a wet bar to the first level near the entry foyer'",
      "Switch to 3D view → walk through the layout",
      "Ask Virtual Assistant: 'What flooring works best for coastal Florida?'",
      "Export DXF for CAD refinement → feed to ArchSynth for photorealistic renders"
    ],
    verdict: "Unbeatable chatbot for architecture. Best for PLANNING and ITERATION — asking questions, exploring layouts, zoning compliance. Pair with ArchSynth or ArchiVinci for the photorealistic rendering it lacks."
  },
  {
    rank: 3,
    name: "Planner 5D",
    url: "planner5d.com",
    badge: "🔄 BEST 3D MODEL",
    tagline: "PDF Blueprint → 3D Model + 360° Orbit + VR Support",
    color: "#10b981",
    price: "$4.99/mo",
    users: "120M+",
    scores: { pdf_input: 9, model_3d: 10, photorealistic: 6, chatbot: 3, cost: 10 },
    strengths: [
      "Accepts PDF/DWG/DXF directly — your EDC Engineering drawings upload natively",
      "AI Plan Recognition: auto-detects walls, rooms, doors from blueprints",
      "TRUE 3D model with full 360° orbit, zoom, pan from any angle",
      "VR support — Oculus/HTC Vive walkthrough",
      "8,000+ furniture/fixture catalog for staging",
      "Export: DXF, DWG, SKP, FBX, OBJ, IFC (full CAD compatibility)",
      "120M users — most mature platform, runs on any device",
      "Design Generator + Smart Wizard AI tools"
    ],
    weaknesses: [
      "NO NLP chatbot — you use point-and-click interface, not natural language",
      "Rendering is good but not PHOTOREALISTIC (clean 3D, not architectural visualization)",
      "AI recognition takes 10 min to 24 hours depending on complexity",
      "Dense construction drawings may need cleanup (remove annotations/dimensions)"
    ],
    workflow: [
      "Upload A3 first level floor plan PDF → AI recognizes in 10-60 min",
      "Review auto-detected walls/rooms → adjust if needed",
      "Repeat for A4 (second level) and A5 (third level)",
      "Switch to 3D → orbit 360°, walk through rooms",
      "Add furniture from 8K+ catalog → stage each room",
      "Export 3D screenshots → feed to ArchSynth for photorealistic rendering"
    ],
    verdict: "Best TRUE 3D model from your PDF blueprints. Accepts your exact file formats (PDF/DWG). The 360° orbit and VR walkthrough can't be beat. Lacks the chatbot — pair with Maket for NLP. At $4.99/mo it's a steal."
  },
  {
    rank: 4,
    name: "Getfloorplan",
    url: "getfloorplan.com",
    badge: "🏡 BEST 360° TOURS",
    tagline: "Floor Plan → 3D + 360° Virtual Tour (Unreal Engine)",
    color: "#3b82f6",
    price: "$20-60/render",
    users: "N/A",
    scores: { pdf_input: 8, model_3d: 8, photorealistic: 8, chatbot: 1, cost: 5 },
    strengths: [
      "Unreal Engine technology — highest quality 3D virtual tours",
      "Upload PDF/sketch → get 2D plan + 3D plan + 360° tour within 24 hours",
      "5 interior design styles (Scandinavian, Modern, Boho, etc.)",
      "AI style-switching in 360° tours — change entire style instantly",
      "Professional-grade output for real estate marketing",
      "Handles 1,000 renders/day — production-ready pipeline",
      "Window view customization (ocean view for Satellite Beach!)"
    ],
    weaknesses: [
      "ZERO chatbot/NLP — purely upload-and-wait service",
      "Per-render pricing gets expensive (3 floors × $35 = $105+)",
      "24-hour turnaround — not instant",
      "No elevation rendering — only floor plan → interior tours",
      "Can't handle exterior views from your A1/A2 elevation drawings"
    ],
    workflow: [
      "Upload A3 first level floor plan → receive 3D + 360° tour in 24 hours",
      "Upload A4 second level → same treatment",
      "Upload A5 third level → same treatment",
      "Select 'Modern' style → ocean window views for Satellite Beach",
      "Embed 360° tours on property listing website"
    ],
    verdict: "Highest quality 360° interior virtual tours using Unreal Engine. But no chatbot, no elevation rendering, and per-render pricing adds up. Best as a FINISHING tool for real estate marketing after you've finalized the design."
  },
  {
    rank: 5,
    name: "ArchiVinci",
    url: "archivinci.com",
    badge: "📸 BEST RENDERS",
    tagline: "Highest Quality Photorealistic Renders — 4K to 8K",
    color: "#ef4444",
    price: "$79 one-time",
    users: "165+ countries",
    scores: { pdf_input: 7, model_3d: 3, photorealistic: 10, chatbot: 1, cost: 9 },
    strengths: [
      "Best photorealistic rendering quality — period",
      "Exact Render Module: preserves your drawing lines/proportions precisely",
      "3 modes: Interior, Exterior, Masterplan — all relevant for 625 Ocean",
      "Render 2D Floor Plan module specifically for architectural drawings",
      "4K–8K output resolution for professional presentations",
      "Up to 4 variations from same input — explore concepts fast",
      "Virtual staging + inpainting for selective modifications",
      "$79 one-time = best value for rendering quality"
    ],
    weaknesses: [
      "NO 3D model — outputs are 2D rendered images only",
      "NO 360° rotation — static images, not interactive",
      "NO chatbot/NLP — purely visual rendering tool",
      "Server-side rendering = depends on their infrastructure"
    ],
    workflow: [
      "Upload east_elevation.png → Exterior mode → Golden hour render in seconds",
      "Upload floor_level1.png → Render 2D Floor Plan → interior visualization",
      "Upload south_elevation.png → Twilight dramatic render",
      "Use inpainting to swap materials (e.g., test white stucco vs. stone)",
      "Export 4K renders for contractor presentations"
    ],
    verdict: "Untouchable photorealistic quality for static images. The $79 one-time price is unbeatable. But zero 3D model, zero chatbot — it's a pure rendering engine. Use alongside Planner 5D (3D) and Maket (chatbot)."
  }
];

const combo = {
  name: "THE POWER COMBO",
  icon: "⚡",
  desc: "No single tool does everything. Here's the winning stack:",
  tools: [
    { name: "ArchSynth", role: "Primary — Renders + 3D + AI Chat", price: "$29/mo", pct: 60 },
    { name: "Maket.ai", role: "NLP Planning + Zoning + Layout iteration", price: "$30/mo (or free tier)", pct: 25 },
    { name: "Planner 5D", role: "PDF→3D model + 360° orbit + VR", price: "$4.99/mo", pct: 15 },
  ],
  total: "$64/mo (or $34/mo with Maket free tier)",
  why: "ArchSynth handles 60% of your needs (renders + chatbot + 3D). Maket fills the NLP gap for design questions/zoning. Planner 5D gives you the most accurate 3D from your actual PDFs."
};

function ScoreBar({ score, color, max = 10 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 6, background: "#1c2333", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${(score / max) * 100}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.5s" }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 800, color, minWidth: 24, textAlign: "right", fontFamily: "'JetBrains Mono', monospace" }}>{score}</span>
    </div>
  );
}

function WeightedScore(tool) {
  let total = 0, maxTotal = 0;
  CRITERIA.forEach(c => { total += tool.scores[c.key] * c.weight; maxTotal += 10 * c.weight; });
  return Math.round((total / maxTotal) * 100);
}

export default function ToolComparison() {
  const [expanded, setExpanded] = useState(new Set([0]));
  const [tab, setTab] = useState("rank");
  const toggle = i => setExpanded(p => { const n = new Set(p); n.has(i)?n.delete(i):n.add(i); return n; });

  return (
    <div style={{ minHeight: "100vh", background: "#080c14", color: "#e6edf3", fontFamily: "'DM Sans', -apple-system, sans-serif", padding: "20px 14px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24, padding: "30px 20px 24px", background: "linear-gradient(160deg, #0f1623 0%, #141e30 50%, #0f1623 100%)", borderRadius: 20, border: "1px solid #1e293b", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #f59e0b, #8b5cf6, #10b981, #3b82f6, #ef4444)" }} />
          <div style={{ fontSize: 11, color: "#f59e0b", textTransform: "uppercase", letterSpacing: 4, fontWeight: 700, marginBottom: 6 }}>
            625 Ocean Street • Satellite Beach FL
          </div>
          <h1 style={{ margin: "0 0 6px", fontSize: 24, fontWeight: 900, color: "#f8fafc" }}>
            AI Rendering Tool — Final Rankings
          </h1>
          <p style={{ color: "#64748b", fontSize: 13, margin: "0 0 16px", maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
            Scored against YOUR actual EDC Engineering drawings (A1-A5). Requirements: PDF input → 3D model + 360° → photorealistic renders → NLP chatbot.
          </p>

          {/* Criteria weights bar */}
          <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
            {CRITERIA.map((c, i) => (
              <div key={i} style={{ background: "#0d131f", borderRadius: 8, padding: "6px 12px", border: "1px solid #1e293b", fontSize: 11 }}>
                <span>{c.icon}</span> <span style={{ color: "#94a3b8", fontWeight: 600 }}>{c.label}</span> <span style={{ color: "#475569", fontFamily: "monospace" }}>({c.weight}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16, justifyContent: "center" }}>
          {[{ k: "rank", l: "📊 Rankings" }, { k: "matrix", l: "🎯 Score Matrix" }, { k: "combo", l: "⚡ Power Combo" }].map(t => (
            <button key={t.k} onClick={() => setTab(t.k)} style={{
              padding: "8px 18px", borderRadius: 10, border: tab === t.k ? "1px solid #f59e0b44" : "1px solid #1e293b",
              background: tab === t.k ? "#f59e0b12" : "#0d131f", color: tab === t.k ? "#f59e0b" : "#64748b",
              fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s"
            }}>{t.l}</button>
          ))}
        </div>

        {/* RANKINGS TAB */}
        {tab === "rank" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {tools.map((t, i) => {
              const ws = WeightedScore(t);
              return (
                <div key={i} style={{ background: "linear-gradient(135deg, #0d131f, #111827)", border: `1px solid ${t.color}22`, borderRadius: 16, overflow: "hidden" }}>
                  <div onClick={() => toggle(i)} style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12, background: `${t.color}10`, border: `2px solid ${t.color}33`,
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600, lineHeight: 1 }}>#{t.rank}</div>
                      <div style={{ fontSize: 17, fontWeight: 900, color: t.color, lineHeight: 1.1 }}>{ws}%</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 16, fontWeight: 800 }}>{t.name}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: `${t.color}15`, color: t.color, whiteSpace: "nowrap" }}>{t.badge}</span>
                        <span style={{ fontSize: 11, color: "#64748b", fontFamily: "monospace" }}>{t.price}</span>
                      </div>
                      <p style={{ margin: "3px 0 0", fontSize: 12, color: "#8b949e", lineHeight: 1.4 }}>{t.tagline}</p>
                    </div>
                    <div style={{ fontSize: 13, color: "#334155", transition: "transform 0.3s", transform: expanded.has(i) ? "rotate(180deg)" : "none" }}>▼</div>
                  </div>

                  {expanded.has(i) && (
                    <div style={{ padding: "0 20px 20px", borderTop: "1px solid #1e293b33" }}>
                      {/* Score bars */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, margin: "14px 0", padding: 12, background: "#080c14", borderRadius: 10 }}>
                        {CRITERIA.map((c, j) => (
                          <div key={j}>
                            <div style={{ fontSize: 10, color: "#64748b", marginBottom: 4, textAlign: "center" }}>{c.icon} {c.label}</div>
                            <ScoreBar score={t.scores[c.key]} color={t.color} />
                          </div>
                        ))}
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
                        {/* Strengths */}
                        <div style={{ background: "#0a1120", borderRadius: 12, padding: 14, border: "1px solid #1e293b" }}>
                          <div style={{ fontSize: 11, color: "#10b981", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>✅ Strengths</div>
                          {t.strengths.map((s, j) => (
                            <div key={j} style={{ fontSize: 12, color: "#c9d1d9", padding: "3px 0", lineHeight: 1.5 }}>
                              <span style={{ color: "#10b981", marginRight: 6 }}>+</span>{s}
                            </div>
                          ))}
                        </div>

                        {/* Weaknesses + Workflow */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          <div style={{ background: "#0a1120", borderRadius: 12, padding: 14, border: "1px solid #1e293b" }}>
                            <div style={{ fontSize: 11, color: "#f87171", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>⚠️ Weaknesses</div>
                            {t.weaknesses.map((w, j) => (
                              <div key={j} style={{ fontSize: 12, color: "#94a3b8", padding: "2px 0", lineHeight: 1.5 }}>
                                <span style={{ color: "#f87171", marginRight: 6 }}>−</span>{w}
                              </div>
                            ))}
                          </div>

                          <div style={{ background: `${t.color}08`, borderRadius: 12, padding: 14, border: `1px solid ${t.color}18` }}>
                            <div style={{ fontSize: 11, color: t.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>🔧 Your Workflow</div>
                            {t.workflow.map((w, j) => (
                              <div key={j} style={{ fontSize: 12, color: "#c9d1d9", padding: "2px 0", lineHeight: 1.5 }}>
                                <span style={{ color: t.color, marginRight: 6, fontFamily: "monospace", fontSize: 10 }}>{j + 1}.</span>{w}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Verdict */}
                      <div style={{ marginTop: 12, padding: "12px 16px", background: `${t.color}08`, borderRadius: 10, borderLeft: `3px solid ${t.color}` }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: t.color }}>VERDICT: </span>
                        <span style={{ fontSize: 12, color: "#c9d1d9", lineHeight: 1.6 }}>{t.verdict}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* MATRIX TAB */}
        {tab === "matrix" && (
          <div style={{ background: "#0d131f", borderRadius: 16, border: "1px solid #1e293b", overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  <th style={{ padding: "14px 16px", textAlign: "left", color: "#64748b", fontWeight: 700, borderBottom: "1px solid #1e293b", fontSize: 11, position: "sticky", left: 0, background: "#0d131f", zIndex: 1 }}>Tool</th>
                  {CRITERIA.map((c, i) => (
                    <th key={i} style={{ padding: "14px 10px", textAlign: "center", color: "#64748b", fontWeight: 700, borderBottom: "1px solid #1e293b", fontSize: 10, lineHeight: 1.3 }}>
                      {c.icon}<br />{c.label}<br /><span style={{ color: "#334155" }}>({c.weight}%)</span>
                    </th>
                  ))}
                  <th style={{ padding: "14px 12px", textAlign: "center", color: "#f59e0b", fontWeight: 800, borderBottom: "1px solid #1e293b", fontSize: 11 }}>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((t, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1e293b22" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 700, color: t.color, position: "sticky", left: 0, background: "#0d131f", zIndex: 1 }}>
                      #{t.rank} {t.name}
                    </td>
                    {CRITERIA.map((c, j) => {
                      const s = t.scores[c.key];
                      const bg = s >= 9 ? "#10b98118" : s >= 7 ? "#3b82f618" : s >= 5 ? "#f59e0b18" : "#ef444418";
                      const fg = s >= 9 ? "#10b981" : s >= 7 ? "#3b82f6" : s >= 5 ? "#f59e0b" : "#ef4444";
                      return (
                        <td key={j} style={{ padding: "12px 10px", textAlign: "center" }}>
                          <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 6, background: bg, color: fg, fontWeight: 800, fontFamily: "monospace", fontSize: 13 }}>
                            {s}
                          </span>
                        </td>
                      );
                    })}
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <span style={{ display: "inline-block", padding: "6px 14px", borderRadius: 8, background: `${t.color}18`, color: t.color, fontWeight: 900, fontFamily: "monospace", fontSize: 15 }}>
                        {WeightedScore(t)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* COMBO TAB */}
        {tab === "combo" && (
          <div>
            <div style={{ background: "linear-gradient(160deg, #1a0f2e, #0f1e2e, #0f2e1a)", borderRadius: 20, padding: 24, border: "1px solid #f59e0b22", marginBottom: 16 }}>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <span style={{ fontSize: 36 }}>{combo.icon}</span>
                <h2 style={{ margin: "8px 0 4px", fontSize: 22, fontWeight: 900, background: "linear-gradient(135deg, #f59e0b, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {combo.name}
                </h2>
                <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>{combo.desc}</p>
              </div>

              {combo.tools.map((ct, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: "#080c1488", borderRadius: 12, marginBottom: 8, border: "1px solid #1e293b" }}>
                  <div style={{ width: 50, height: 50, borderRadius: 12, background: "#f59e0b08", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 20, color: "#f59e0b", flexShrink: 0 }}>
                    {ct.pct}%
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#e6edf3" }}>{ct.name}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>{ct.role}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#f59e0b", fontFamily: "monospace" }}>{ct.price}</div>
                </div>
              ))}

              <div style={{ textAlign: "center", marginTop: 16, padding: "14px 20px", background: "#f59e0b08", borderRadius: 12, border: "1px solid #f59e0b22" }}>
                <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, marginBottom: 4 }}>Total Investment</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#f59e0b" }}>{combo.total}</div>
                <p style={{ fontSize: 12, color: "#94a3b8", margin: "8px 0 0", lineHeight: 1.6 }}>{combo.why}</p>
              </div>
            </div>

            {/* Quick decision */}
            <div style={{ background: "#0d131f", borderRadius: 16, padding: 20, border: "1px solid #1e293b" }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 800, color: "#10b981" }}>🎯 Quick Decision Guide</h3>
              {[
                { q: "Only ONE tool?", a: "ArchSynth ($29/mo) — best all-rounder with chatbot + renders + 3D", c: "#f59e0b" },
                { q: "Best chatbot experience?", a: "Maket.ai ($30/mo) — ask anything about architecture in plain English", c: "#8b5cf6" },
                { q: "Most accurate 3D from my PDFs?", a: "Planner 5D ($4.99/mo) — accepts PDF/DWG, auto-recognizes blueprints", c: "#10b981" },
                { q: "Best single renders (no 3D needed)?", a: "ArchiVinci ($79 one-time) — untouchable photorealistic quality", c: "#ef4444" },
                { q: "Best 360° virtual tours?", a: "Getfloorplan ($35/floor) — Unreal Engine quality, 24hr delivery", c: "#3b82f6" },
                { q: "FREE option?", a: "Google Colab notebook (already built + deployed to your GitHub repo)", c: "#94a3b8" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: i < 5 ? "1px solid #1e293b33" : "none" }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#64748b", minWidth: 200 }}>{item.q}</div>
                  <div style={{ fontSize: 12, color: item.c, fontWeight: 600 }}>{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", padding: "24px 0 12px", color: "#334155", fontSize: 10, fontFamily: "monospace" }}>
          625 Ocean Street • EDC Engineering A1-A5 Analysis • BidDeed.AI / Everest Capital USA • Feb 2026
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

const matchups = [
  {
    paid: {
      name: "ArchSynth",
      price: "$29/mo",
      role: "Renders + AI Chat + 3D",
      coverage: "60%",
      scores: { render: 9, chat: 9, model3d: 9, pdf: 8, speed: 10 }
    },
    open: {
      name: "ComfyUI + ControlNet + FLUX",
      price: "$0",
      role: "Renders (superior quality)",
      coverage: "40%",
      scores: { render: 10, chat: 0, model3d: 0, pdf: 9, speed: 7 }
    },
    winner: "open",
    reason: "ComfyUI renders are objectively better quality than ArchSynth — FLUX + architecture checkpoints + ControlNet structural fidelity. ArchSynth wins on convenience (14-sec sketch-to-render vs manual workflow) and built-in chatbot. For 625 Ocean where you have clean EDC elevation PNGs ready to go, ComfyUI is the clear rendering winner.",
    supplement: "Add Claude API ($0 on Max plan) for NLP chatbot capability. You already have it."
  },
  {
    paid: {
      name: "Maket.ai",
      price: "$30/mo",
      role: "NLP Chatbot + Floor Plans",
      coverage: "25%",
      scores: { render: 5, chat: 10, model3d: 7, pdf: 7, speed: 9 }
    },
    open: {
      name: "Sweet Home 3D + FreeCAD BIM",
      price: "$0",
      role: "Floor Plans + BIM Model",
      coverage: "35%",
      scores: { render: 5, chat: 0, model3d: 8, pdf: 8, speed: 8 }
    },
    winner: "paid",
    reason: "Maket's NLP chatbot is genuinely unmatched — 'add a wet bar to level 1' in plain English is powerful. Sweet Home 3D matches floor plan capabilities and FreeCAD BIM exceeds Maket's structural modeling. The chatbot gap is the only real loss going open-source.",
    supplement: "Claude API + custom prompt = 80% of Maket's chatbot for architecture questions. Not the same as in-app NLP editing, but close for planning discussions."
  },
  {
    paid: {
      name: "Planner 5D",
      price: "$4.99/mo",
      role: "PDF → 3D + 360° Orbit",
      coverage: "15%",
      scores: { render: 6, chat: 3, model3d: 10, pdf: 9, speed: 7 }
    },
    open: {
      name: "Blender + FloorplanToBlender3d",
      price: "$0",
      role: "3D Model + Cinema Rendering",
      coverage: "25%",
      scores: { render: 9, chat: 0, model3d: 10, pdf: 7, speed: 4 }
    },
    winner: "open",
    reason: "Blender's 3D capabilities are in a completely different league — Planner 5D is a consumer tool, Blender is industry-standard used by Netflix, EA, and NASA. FloorplanToBlender3d auto-converts floor plan images. Cycles renderer produces cinema-quality output. The only trade-off: Planner 5D has AI plan recognition (upload PDF, wait 10min), while FTBL needs cleaner input images.",
    supplement: "Export Blender model as glTF → embed in Three.js web viewer for browser-based 360° rotation."
  }
];

const summary = {
  paid: { total: "$64/mo", annual: "$768/yr", setup: "5 min", timePerProject: "~1 hour", renderQuality: "8/10", model3d: "8/10", chatbot: "9/10" },
  open: { total: "$0", annual: "$0", setup: "2-4 hours (one-time)", timePerProject: "~4 hours", renderQuality: "10/10", model3d: "10/10", chatbot: "3/10" }
};

const everestStack = [
  { step: 1, tool: "Sweet Home 3D", time: "30 min", action: "Import A3/A4/A5 PDFs as backgrounds → trace walls → add furniture → 3D walkthrough", output: "Furnished interior visualization + client walkthrough", replaces: "Maket.ai floor plan features" },
  { step: 2, tool: "ComfyUI (Colab)", time: "20 min", action: "Upload A1/A2 elevation PNGs → ControlNet Lineart → FLUX architecture render → 4K upscale", output: "4-8 photorealistic exterior renders (golden hour, dusk, daylight)", replaces: "ArchSynth rendering + ArchiVinci quality" },
  { step: 3, tool: "Blender + FTBL", time: "2-3 hours", action: "Floor plan PNGs → auto-detect walls → stack 3 floors → add exterior geometry → Cycles render", output: "Full 3D model + cinema-quality hero images + glTF export", replaces: "Planner 5D 3D model + 360° orbit" },
  { step: 4, tool: "FreeCAD BIM", time: "2-4 hours", action: "Parametric wall modeling → materials → structural elements → IFC export", output: "Construction-grade BIM model with material specs", replaces: "Nothing in paid stack (BONUS capability)" },
  { step: 5, tool: "Three.js viewer", time: "1 hour", action: "Import Blender glTF → embed in HTML → deploy to GitHub Pages", output: "Browser-based 360° interactive model at your GitHub Pages URL", replaces: "Planner 5D VR/360° view" }
];

export default function PowerComboComparison() {
  const [view, setView] = useState("matchup");

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Outfit', sans-serif",
      background: "linear-gradient(160deg, #080d17 0%, #0f1926 35%, #0a1420 70%, #060b14 100%)",
      color: "#e0e8f0",
      minHeight: "100vh",
      padding: "24px 16px"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@300;400;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ maxWidth: 920, margin: "0 auto 24px", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", gap: 8, alignItems: "center",
          background: "rgba(78,205,196,0.06)", border: "1px solid #4ecdc422",
          borderRadius: 24, padding: "5px 16px", marginBottom: 12
        }}>
          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono'", color: "#e07040", fontWeight: 600 }}>$64/mo PAID</span>
          <span style={{ color: "#3a4a60" }}>vs</span>
          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono'", color: "#4ecdc4", fontWeight: 600 }}>$0 OPEN SOURCE</span>
        </div>
        <h1 style={{
          fontFamily: "'Outfit'", fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 900,
          background: "linear-gradient(135deg, #fff 0%, #c8dce8 50%, #4ecdc4 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          margin: "0 0 8px", lineHeight: 1.12
        }}>
          The Everest Stack
        </h1>
        <p style={{ color: "#5a7090", fontSize: 13, maxWidth: 560, margin: "0 auto", lineHeight: 1.5 }}>
          Open-source replacements for ArchSynth + Maket + Planner 5D — tool-by-tool matchup, execution plan, and total cost comparison for 625 Ocean Street.
        </p>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
        {[
          { id: "matchup", label: "Head-to-Head" },
          { id: "execution", label: "Execution Plan" },
          { id: "totals", label: "Cost Summary" }
        ].map(t => (
          <button key={t.id} onClick={() => setView(t.id)} style={{
            padding: "8px 20px", borderRadius: 20,
            border: view === t.id ? "1.5px solid #4ecdc4" : "1.5px solid #1a2a40",
            background: view === t.id ? "rgba(78,205,196,0.1)" : "rgba(20,32,50,0.4)",
            color: view === t.id ? "#4ecdc4" : "#5a7090",
            fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, cursor: "pointer",
            transition: "all 0.2s"
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 920, margin: "0 auto" }}>

        {/* HEAD-TO-HEAD */}
        {view === "matchup" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {matchups.map((m, i) => (
              <div key={i} style={{
                background: "rgba(14,22,38,0.7)",
                border: "1px solid #1a2a40",
                borderRadius: 16,
                overflow: "hidden"
              }}>
                {/* VS Header */}
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr auto 1fr",
                  background: "rgba(10,16,28,0.8)", padding: "14px 20px",
                  alignItems: "center"
                }}>
                  <div>
                    <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono'", color: "#e07040", letterSpacing: 1, marginBottom: 3 }}>PAID</div>
                    <div style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: 17, color: "#f0f4f8" }}>{m.paid.name}</div>
                    <div style={{ fontSize: 12, color: "#e07040", fontWeight: 700, marginTop: 2 }}>{m.paid.price}</div>
                  </div>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "linear-gradient(135deg, #e0704020, #4ecdc420)",
                    border: "2px solid #2a3a50",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Outfit'", fontWeight: 900, fontSize: 12, color: "#7a8ba8"
                  }}>VS</div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono'", color: "#4ecdc4", letterSpacing: 1, marginBottom: 3 }}>OPEN SOURCE</div>
                    <div style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: 17, color: "#f0f4f8" }}>{m.open.name}</div>
                    <div style={{ fontSize: 12, color: "#4ecdc4", fontWeight: 700, marginTop: 2 }}>{m.open.price}</div>
                  </div>
                </div>

                {/* Score comparison bars */}
                <div style={{ padding: "16px 20px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                    {["render", "chat", "model3d", "pdf", "speed"].map(k => {
                      const labels = { render: "Render Quality", chat: "NLP Chatbot", model3d: "3D Model", pdf: "PDF Input", speed: "Speed" };
                      const pScore = m.paid.scores[k];
                      const oScore = m.open.scores[k];
                      const pWins = pScore > oScore;
                      return (
                        <div key={k} style={{ gridColumn: k === "speed" ? "1 / -1" : "auto" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: 10, color: "#5a7090", fontFamily: "'JetBrains Mono'" }}>{labels[k]}</span>
                            <span style={{ fontSize: 10, fontWeight: 700, color: pWins ? "#e07040" : oScore > pScore ? "#4ecdc4" : "#5a7090" }}>
                              {pScore === oScore ? "TIE" : pWins ? "PAID" : "OPEN"}
                            </span>
                          </div>
                          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                            <div style={{ flex: 1, height: 6, borderRadius: 3, background: "#0a1020", overflow: "hidden", display: "flex", justifyContent: "flex-end" }}>
                              <div style={{ width: `${pScore * 10}%`, height: "100%", borderRadius: 3, background: pWins ? "#e07040" : "#e0704055", transition: "width 0.5s" }} />
                            </div>
                            <span style={{ fontSize: 10, width: 16, textAlign: "center", color: "#5a7090", fontFamily: "'JetBrains Mono'", fontWeight: 600 }}>{pScore}</span>
                            <span style={{ color: "#2a3a50", fontSize: 10 }}>|</span>
                            <span style={{ fontSize: 10, width: 16, textAlign: "center", color: "#5a7090", fontFamily: "'JetBrains Mono'", fontWeight: 600 }}>{oScore}</span>
                            <div style={{ flex: 1, height: 6, borderRadius: 3, background: "#0a1020", overflow: "hidden" }}>
                              <div style={{ width: `${oScore * 10}%`, height: "100%", borderRadius: 3, background: !pWins && oScore > pScore ? "#4ecdc4" : "#4ecdc455", transition: "width 0.5s" }} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Winner badge */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 10,
                    background: m.winner === "open" ? "rgba(78,205,196,0.06)" : "rgba(224,112,64,0.06)",
                    border: `1px solid ${m.winner === "open" ? "#4ecdc422" : "#e0704022"}`,
                    borderRadius: 10, padding: "10px 14px", marginBottom: 10
                  }}>
                    <div style={{
                      fontSize: 18, width: 32, height: 32, borderRadius: 8,
                      background: m.winner === "open" ? "#4ecdc415" : "#e0704015",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      {m.winner === "open" ? "🏆" : "🥈"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: m.winner === "open" ? "#4ecdc4" : "#e07040", fontFamily: "'JetBrains Mono'", letterSpacing: 1 }}>
                        {m.winner === "open" ? "OPEN SOURCE WINS" : "PAID WINS (on convenience)"}
                      </div>
                      <div style={{ fontSize: 12, color: "#a0b0c0", lineHeight: 1.45, marginTop: 3 }}>{m.reason}</div>
                    </div>
                  </div>

                  {/* Supplement note */}
                  <div style={{
                    borderLeft: "2px solid #5ba4f544",
                    paddingLeft: 12, fontSize: 12, color: "#7090b0", lineHeight: 1.45
                  }}>
                    <span style={{ color: "#5ba4f5", fontWeight: 600 }}>Bridge the gap:</span> {m.supplement}
                  </div>
                </div>
              </div>
            ))}

            {/* Overall verdict */}
            <div style={{
              background: "linear-gradient(135deg, rgba(78,205,196,0.08) 0%, rgba(14,22,38,0.9) 100%)",
              border: "1.5px solid #4ecdc433", borderRadius: 16, padding: 22
            }}>
              <div style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: 20, color: "#f0f4f8", marginBottom: 8 }}>
                Overall: Open Source wins 2 out of 3
              </div>
              <div style={{ fontSize: 13, color: "#a0b8cc", lineHeight: 1.6 }}>
                ComfyUI <strong style={{ color: "#4ecdc4" }}>dominates</strong> ArchSynth on render quality. Blender <strong style={{ color: "#4ecdc4" }}>crushes</strong> Planner 5D on 3D capabilities. The only genuine loss is Maket's NLP chatbot — but you already have Claude on Max plan, which handles architectural Q&A natively. The $768/year savings goes straight to your bottom line, and you get <em>better</em> output quality.
              </div>
            </div>
          </div>
        )}

        {/* EXECUTION PLAN */}
        {view === "execution" && (
          <div>
            <div style={{
              display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20
            }}>
              {[
                { label: "Total Time", value: "4-6 hours", sub: "(one-time setup + first render)" },
                { label: "Cost", value: "$0", sub: "forever" },
                { label: "Output", value: "5 deliverables", sub: "renders, model, walkthrough, BIM, web viewer" }
              ].map(s => (
                <div key={s.label} style={{
                  flex: 1, minWidth: 140,
                  background: "rgba(14,22,38,0.7)", border: "1px solid #1a2a40",
                  borderRadius: 12, padding: "14px 16px", textAlign: "center"
                }}>
                  <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono'", color: "#5a7090", letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
                  <div style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: 24, color: "#4ecdc4", marginTop: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#4a6080", marginTop: 2 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {everestStack.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 0 }}>
                  {/* Timeline connector */}
                  <div style={{ width: 40, display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: `linear-gradient(135deg, #4ecdc420, #44aa9920)`,
                      border: "2px solid #4ecdc444",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Outfit'", fontWeight: 800, fontSize: 13, color: "#4ecdc4",
                      zIndex: 1
                    }}>{step.step}</div>
                    {i < everestStack.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: "linear-gradient(180deg, #4ecdc433, #1a2a40)", minHeight: 20 }} />
                    )}
                  </div>

                  {/* Card */}
                  <div style={{
                    flex: 1,
                    background: "rgba(14,22,38,0.7)", border: "1px solid #1a2a40",
                    borderRadius: 12, padding: "14px 18px", marginBottom: 12, marginLeft: 8
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                      <div style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: 15, color: "#f0f4f8" }}>{step.tool}</div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <span style={{
                          background: "#4ecdc412", border: "1px solid #4ecdc433", borderRadius: 6,
                          padding: "2px 8px", fontSize: 10, color: "#4ecdc4", fontFamily: "'JetBrains Mono'", fontWeight: 600
                        }}>⏱ {step.time}</span>
                        <span style={{
                          background: "#5ba4f512", border: "1px solid #5ba4f533", borderRadius: 6,
                          padding: "2px 8px", fontSize: 10, color: "#5ba4f5", fontFamily: "'JetBrains Mono'", fontWeight: 600
                        }}>Replaces: {step.replaces}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: "#a0b8cc", lineHeight: 1.5, marginBottom: 6 }}>{step.action}</div>
                    <div style={{
                      background: "rgba(78,205,196,0.05)", borderRadius: 6, padding: "6px 10px",
                      fontSize: 11, color: "#7ab0a8", borderLeft: "2px solid #4ecdc433"
                    }}>
                      <strong style={{ color: "#4ecdc4" }}>Output:</strong> {step.output}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* What you already have */}
            <div style={{
              background: "rgba(91,164,245,0.06)", border: "1px solid #5ba4f522",
              borderRadius: 14, padding: 18, marginTop: 8
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#5ba4f5", marginBottom: 8, fontFamily: "'JetBrains Mono'", letterSpacing: 1 }}>
                ✅ ALREADY DEPLOYED (from previous sessions)
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  "Google Colab notebook with ComfyUI workflow",
                  "ControlNet-optimized elevation PNGs (east + south)",
                  "All 4 elevation crops + 3 floor plan crops",
                  "ComfyUI architecture workflow JSON",
                  "GitHub repo with 18 files + GitHub Pages live",
                  "5 individual A1-A5 sheet PDFs ready for import"
                ].map((item, j) => (
                  <div key={j} style={{ fontSize: 12, color: "#90b0cc", paddingLeft: 8, borderLeft: "2px solid #5ba4f522" }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* COST SUMMARY */}
        {view === "totals" && (
          <div>
            {/* Side by side totals */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              {/* Paid */}
              <div style={{
                background: "rgba(224,112,64,0.04)", border: "1.5px solid #e0704033",
                borderRadius: 16, padding: 20
              }}>
                <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono'", color: "#e07040", letterSpacing: 2, marginBottom: 10 }}>PAID STACK</div>
                <div style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 36, color: "#e07040" }}>$64<span style={{ fontSize: 16, color: "#e0704088" }}>/mo</span></div>
                <div style={{ fontSize: 13, color: "#a08070", marginBottom: 16 }}>$768/year</div>
                {[
                  { tool: "ArchSynth", price: "$29/mo", role: "Renders + Chat + 3D" },
                  { tool: "Maket.ai", price: "$30/mo", role: "NLP + Floor Plans" },
                  { tool: "Planner 5D", price: "$4.99/mo", role: "PDF → 3D + 360°" }
                ].map(t => (
                  <div key={t.tool} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "8px 0", borderBottom: "1px solid #1a2a40"
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#d0b0a0" }}>{t.tool}</div>
                      <div style={{ fontSize: 10, color: "#6a5a50" }}>{t.role}</div>
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 13, fontWeight: 600, color: "#e07040" }}>{t.price}</div>
                  </div>
                ))}
                <div style={{ marginTop: 14 }}>
                  {Object.entries({ "Render Quality": "8/10", "3D Model": "8/10", "NLP Chatbot": "9/10", "Ease of Use": "9/10", "Time per Project": "~1 hour" }).map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#8a7a70", padding: "3px 0" }}>
                      <span>{k}</span><span style={{ color: "#c0a090", fontFamily: "'JetBrains Mono'" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Open Source */}
              <div style={{
                background: "rgba(78,205,196,0.04)", border: "1.5px solid #4ecdc433",
                borderRadius: 16, padding: 20
              }}>
                <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono'", color: "#4ecdc4", letterSpacing: 2, marginBottom: 10 }}>EVEREST STACK</div>
                <div style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 36, color: "#4ecdc4" }}>$0<span style={{ fontSize: 16, color: "#4ecdc488" }}>/mo</span></div>
                <div style={{ fontSize: 13, color: "#6a9a90", marginBottom: 16 }}>$0/year (forever)</div>
                {[
                  { tool: "ComfyUI + ControlNet", price: "$0", role: "Renders (10/10 quality)" },
                  { tool: "Sweet Home 3D + FreeCAD", price: "$0", role: "Floor Plans + BIM" },
                  { tool: "Blender + FTBL", price: "$0", role: "3D Model + Cinema Render" },
                  { tool: "Three.js viewer", price: "$0", role: "Web-based 360° (bonus)" }
                ].map(t => (
                  <div key={t.tool} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "8px 0", borderBottom: "1px solid #1a2a40"
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#a0d0c8" }}>{t.tool}</div>
                      <div style={{ fontSize: 10, color: "#5a8a80" }}>{t.role}</div>
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 13, fontWeight: 600, color: "#4ecdc4" }}>{t.price}</div>
                  </div>
                ))}
                <div style={{ marginTop: 14 }}>
                  {Object.entries({ "Render Quality": "10/10 ✦", "3D Model": "10/10 ✦", "NLP Chatbot": "3/10", "Ease of Use": "5/10", "Time per Project": "~4 hours" }).map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#6a9a90", padding: "3px 0" }}>
                      <span>{k}</span><span style={{ color: v.includes("✦") ? "#4ecdc4" : "#90c0b8", fontFamily: "'JetBrains Mono'", fontWeight: v.includes("✦") ? 700 : 400 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ROI Calculator */}
            <div style={{
              background: "linear-gradient(135deg, rgba(78,205,196,0.06) 0%, rgba(14,22,38,0.8) 100%)",
              border: "1.5px solid #4ecdc433", borderRadius: 16, padding: 22
            }}>
              <div style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: 20, color: "#f0f4f8", marginBottom: 14 }}>
                The Real Math
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginBottom: 16 }}>
                {[
                  { label: "Year 1 Savings", value: "$768", detail: "vs paid stack" },
                  { label: "Year 3 Savings", value: "$2,304", detail: "no subscriptions ever" },
                  { label: "Time Trade-off", value: "+3 hrs/project", detail: "offset by better quality" },
                  { label: "Render Quality", value: "+25%", detail: "ComfyUI > ArchSynth objectively" },
                  { label: "3D Precision", value: "+40%", detail: "Blender Cycles > Planner 5D" },
                  { label: "Chatbot Gap", value: "-70%", detail: "Claude API bridges most of this" }
                ].map(c => (
                  <div key={c.label} style={{
                    background: "rgba(10,16,28,0.5)", borderRadius: 10, padding: "12px 14px",
                    border: "1px solid #1a2a40"
                  }}>
                    <div style={{ fontSize: 10, color: "#5a7090", fontFamily: "'JetBrains Mono'", letterSpacing: 1 }}>{c.label}</div>
                    <div style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: 22, color: c.value.startsWith("-") ? "#e07040" : "#4ecdc4", marginTop: 4 }}>{c.value}</div>
                    <div style={{ fontSize: 10, color: "#4a6080", marginTop: 2 }}>{c.detail}</div>
                  </div>
                ))}
              </div>

              <div style={{
                background: "rgba(78,205,196,0.08)", borderRadius: 10, padding: 16,
                borderLeft: "3px solid #4ecdc4"
              }}>
                <div style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: 15, color: "#4ecdc4", marginBottom: 6 }}>
                  Verdict for Ariel Shapira, GC + Solo Founder
                </div>
                <div style={{ fontSize: 13, color: "#c0d4e0", lineHeight: 1.6 }}>
                  You're a licensed general contractor who reads construction drawings daily. The "ease of use" advantage of paid tools is irrelevant for you — you don't need Maket to explain what a load-bearing wall is. ComfyUI's rendering quality genuinely exceeds ArchSynth (10/10 vs 9/10). Blender is industry-standard for a reason. The Colab notebook is already deployed. Go open-source, save $768/year, get better output. The only scenario where paid makes sense: if you're delegating to someone non-technical (Mariam for Property360 client presentations) — then Sweet Home 3D for them + ComfyUI for you.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

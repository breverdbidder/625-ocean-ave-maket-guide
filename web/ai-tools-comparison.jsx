import { useState } from "react";

const tools = [
  {
    rank: 1,
    name: "ArchiVinci",
    url: "archivinci.com",
    tagline: "Best Overall — Integrates Nano Banana Pro + GPT Image",
    logo: "🏛️",
    nlp: "Text prompts via modules (Dream, Style Match, Exact Render). No full chatbot but deep NLP prompt controls per module.",
    nlpScore: 7,
    pricing: {
      free: "Free trial with limited renders",
      plans: [
        { name: "3 Days", price: "$39", note: "one-time" },
        { name: "1 Month", price: "$79", note: "one-time" },
        { name: "3 Months", price: "$239", note: "one-time" },
        { name: "6 Months", price: "$449", note: "one-time" },
      ],
      model: "One-time payments, NO subscriptions"
    },
    priceScore: 8,
    quality: "Photorealistic renders from sketches, 3D models, or floor plans. Multiple engines: ArchiVinci native (unlimited), Nano Banana Pro, GPT Image 1.5, QWEN Multi Angle (1 coin each). Interior, exterior, bird-eye, landscape, masterplan. Video generation available.",
    qualityScore: 9,
    ease: "Upload image → select module → set style → render. No CAD knowledge needed. Concurrent 4 renders. Supports SketchUp, Revit, 3ds Max imports.",
    easeScore: 9,
    satisfaction: "Highly rated on SourceForge. Users praise accuracy and speed. 165+ countries served. Reviews highlight faithful preservation of design lines during rendering.",
    satScore: 8,
    total: 34,
    pros: ["Integrates Nano Banana Pro directly", "No recurring subscriptions", "Unlimited renders on native engine", "Floor plan to 3D rendering module", "Multiple AI engines in one platform"],
    cons: ["No full conversational chatbot", "Coin system for premium engines", "English only"],
    bestFor: "Your exact use case — upload floor plan, get photorealistic renders using Nano Banana Pro and other engines, all with prompt-based controls."
  },
  {
    rank: 2,
    name: "Maket.ai",
    url: "maket.ai",
    tagline: "Best NLP Chatbot — 'ChatGPT for Architecture'",
    logo: "🏗️",
    nlp: "Full conversational AI chatbot. Virtual Assistant for materials, costs, design guidance. Regulatory Assistant for zoning codes via PDF upload + plain language Q&A. Text-to-floorplan generation. Strongest NLP in the category.",
    nlpScore: 10,
    pricing: {
      free: "Free plan: 1 project, unlimited floor plans, 2 low-res credits",
      plans: [
        { name: "Pro", price: "$30/mo", note: "or ~$24/mo billed annually" },
        { name: "Enterprise", price: "Custom", note: "custom workflows" },
      ],
      model: "Subscription (monthly or annual)"
    },
    priceScore: 9,
    quality: "Generates floor plans from text descriptions with accurate dimensions. 3D visualization and restyle with text prompts. Maket 2.0 (Q1 2026) promises enhanced renders. Currently more schematic than photorealistic — optimized for early-stage planning over final presentation renders.",
    qualityScore: 6,
    ease: "Extremely easy — describe what you want in natural language. No architecture or CAD knowledge required. Editing tools are lightweight but focused. DXF export for CAD refinement.",
    easeScore: 10,
    satisfaction: "1M+ registered users. $3.4M CAD seed funding (Oct 2025). Described as 'ChatGPT for architecture.' No aggregated review scores yet — still emerging. Maket 2.0 launching Q1 2026 with improved renders.",
    satScore: 7,
    total: 32,
    pros: ["Best-in-class NLP chatbot interface", "Virtual + Regulatory AI assistants", "Generates floor plans from text", "Zoning code compliance built-in", "Very affordable at $30/mo"],
    cons: ["Rendering quality not photorealistic yet", "Residential-focused only", "2.0 with better renders not yet released", "Limited fine-tuning controls"],
    bestFor: "Generating and iterating floor plans via conversation. Best chatbot experience. Less suited for final photorealistic renders from existing plans."
  },
  {
    rank: 3,
    name: "Snaptrude",
    url: "snaptrude.com",
    tagline: "Best Full BIM Platform — Text-to-3D Model with AI Agents",
    logo: "📐",
    nlp: "AI Mode accepts text prompts (building type, site, program) to generate editable 3D BIM models. Master AI orchestrates specialized agents for climate analysis, adjacencies, massing, zoning compliance. Not a chatbot per se, but deep NLP-driven generation.",
    nlpScore: 8,
    pricing: {
      free: "Free: 3 projects, basic BIM & Revit export",
      plans: [
        { name: "Individual", price: "$60/mo", note: "unlimited projects" },
        { name: "Organization", price: "$100/mo", note: "billed annually, teams" },
        { name: "Enterprise", price: "Custom", note: "SSO, API, unlimited licenses" },
      ],
      model: "Subscription (monthly or annual)"
    },
    priceScore: 7,
    quality: "Generates full LOD 250-300 BIM models from text prompts. Built-in rendering and visualization. Revit/IFC/DWG export. Real-time area, cost, sunlight analysis. Four modes: Program, Design, Present, BIM. Most comprehensive output but more technical than pure rendering tools.",
    qualityScore: 8,
    ease: "Browser-based, no installation. Learning curve ~1 day for basics, ~1 week for proficiency. Requires some architectural understanding to get best results. Integrates with Revit, Rhino, SketchUp, AutoCAD.",
    easeScore: 7,
    satisfaction: "Featured in Dezeen, AEC Magazine. Trusted by leading architecture firms. Active development with frequent releases. Strong for professional architects but may be overkill for investor/developer use cases.",
    satScore: 8,
    total: 30,
    pros: ["Full BIM model from text prompts", "AI agent orchestration system", "Direct Revit export", "Browser-based, real-time collaboration", "Built-in code compliance checking"],
    cons: ["More complex than pure render tools", "$60-100/mo is pricier", "Aimed at architects, not investors", "Rendering less photorealistic than ArchiVinci"],
    bestFor: "If you need actual editable 3D BIM models (not just renderings) from your floor plans, with professional export to Revit/CAD."
  },
  {
    rank: 4,
    name: "ArkDesign AI",
    url: "arkdesign.ai",
    tagline: "Best for Multi-Family Feasibility — Code-Compliant Schematics",
    logo: "🏢",
    nlp: "Parameter-driven input (not conversational chatbot). Input building type, zoning district, lot shape, unit mix → AI generates optimized schemes. Step-by-step wizard rather than free-form NLP. Some text-based guidance in the workflow.",
    nlpScore: 5,
    pricing: {
      free: "Lite: Free, 3 projects, 3 PDF reports",
      plans: [
        { name: "Pro", price: "$180/mo", note: "was $399, 12 projects" },
        { name: "Enterprise", price: "Custom", note: "contact sales" },
      ],
      model: "Subscription"
    },
    priceScore: 4,
    quality: "Optimized building schematics for multi-family/mixed-use. Code-compliant floor plans with cost estimation. 3D massing visualization. Strong on feasibility reports but not photorealistic renders. Outputs are schematic-level, not presentation-quality.",
    qualityScore: 6,
    ease: "7-stage wizard guides you through lot setup, core design, unit mix, and schematic sections. Structured but rigid. Requires understanding of zoning concepts. 5,300+ users in 120+ countries.",
    easeScore: 6,
    satisfaction: "Trusted by notable NYC architecture firms. 8,000+ completed projects. Licensed architects available as consultants. Niche but respected in multi-family development. Limited public reviews.",
    satScore: 7,
    total: 23,
    pros: ["US building code compliance built-in", "Feasibility reports with cost estimates", "Revit export available", "Strong for multi-family optimization", "Architect consultants available"],
    cons: ["$180/mo is expensive", "No conversational chatbot/NLP", "Multi-family focused, not single-family", "Schematic only — not photorealistic", "Wizard-based, not prompt-based"],
    bestFor: "Multi-family/mixed-use feasibility studies with zoning compliance. NOT ideal for your single-family floor plan rendering needs."
  },
  {
    rank: 5,
    name: "Coohom (3D Design)",
    url: "coohom.com",
    tagline: "Best for Interior Staging — Fast Photorealistic Interiors",
    logo: "🛋️",
    nlp: "AI-powered scene generation with some text prompt capability. More template/drag-drop driven than NLP. Auto-furnishing and style suggestions. Limited chatbot functionality compared to Maket.",
    nlpScore: 4,
    pricing: {
      free: "Free tier with limited renders",
      plans: [
        { name: "Pro", price: "$29-49/mo", note: "varies by region" },
        { name: "Enterprise", price: "Custom", note: "white-label available" },
      ],
      model: "Subscription"
    },
    priceScore: 7,
    quality: "Photorealistic interior renders in seconds. 10M+ users across 200 countries. Strong furniture/material library. Excellent for staging and interior visualization. Weak on exterior/architectural rendering from floor plans.",
    qualityScore: 7,
    ease: "Very intuitive drag-and-drop interface. 7,000+ furniture items. Cross-device (PC, iOS, Android, web). Lowest learning curve for interior work.",
    easeScore: 8,
    satisfaction: "Featured in Forbes, TechNode. 10M+ customers. Strong in Asia-Pacific market. Well-established platform with proven track record. Less known in US architecture circles.",
    satScore: 7,
    total: 26,
    pros: ["Fastest photorealistic interior renders", "Massive furniture/material library", "10M+ user base — proven platform", "Cross-device support", "White-label enterprise option"],
    cons: ["Minimal NLP/chatbot capability", "Interior-focused, weak on exterior", "Can't generate floor plans from text", "Less architectural, more staging", "Not ideal for floor plan → 3D building"],
    bestFor: "Interior staging and visualization once you have a design. NOT for generating 3D building models from floor plans."
  }
];

const categories = [
  { key: "nlpScore", label: "NLP/Chatbot", color: "#4a90d9" },
  { key: "priceScore", label: "Price Value", color: "#5ab83c" },
  { key: "qualityScore", label: "Render Quality", color: "#c9a96e" },
  { key: "easeScore", label: "Ease of Use", color: "#d94a7a" },
  { key: "satScore", label: "Satisfaction", color: "#9b59b6" },
];

function ScoreBar({ score, max = 10, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 120, height: 8, background: "#1a1a2e", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${(score / max) * 100}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.6s ease" }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color, minWidth: 20 }}>{score}</span>
    </div>
  );
}

function ToolCard({ tool, isExpanded, onToggle }) {
  const medalColors = { 1: "#c9a96e", 2: "#c0c0c0", 3: "#cd7f32", 4: "#666", 5: "#555" };
  const medalLabels = { 1: "🥇", 2: "🥈", 3: "🥉", 4: "#4", 5: "#5" };

  return (
    <div
      style={{
        background: tool.rank === 1 ? "linear-gradient(135deg, #1a1a2e 0%, #1e2a3a 100%)" : "#12121f",
        border: tool.rank === 1 ? "2px solid #c9a96e" : "1px solid #2a2a3e",
        borderRadius: 16,
        padding: 24,
        cursor: "pointer",
        transition: "all 0.3s",
        position: "relative",
        overflow: "hidden"
      }}
      onClick={onToggle}
    >
      {tool.rank === 1 && (
        <div style={{ position: "absolute", top: 0, right: 0, background: "#c9a96e", color: "#000", padding: "4px 16px", borderRadius: "0 14px 0 12px", fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
          RECOMMENDED
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28 }}>{tool.logo}</span>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, color: medalColors[tool.rank], fontWeight: 700 }}>{medalLabels[tool.rank]}</span>
              <h3 style={{ margin: 0, fontSize: 20, color: "#fff", fontFamily: "'Georgia', serif" }}>{tool.name}</h3>
            </div>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "#8a8aa0", letterSpacing: 0.5 }}>{tool.tagline}</p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#c9a96e", fontFamily: "'Georgia', serif" }}>{tool.total}<span style={{ fontSize: 14, color: "#666" }}>/50</span></div>
          <div style={{ fontSize: 10, color: "#666", letterSpacing: 1, textTransform: "uppercase" }}>Total Score</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: isExpanded ? 16 : 0 }}>
        {categories.map(cat => (
          <div key={cat.key}>
            <div style={{ fontSize: 10, color: "#666", marginBottom: 4, letterSpacing: 0.5 }}>{cat.label}</div>
            <ScoreBar score={tool[cat.key]} color={cat.color} />
          </div>
        ))}
      </div>

      {isExpanded && (
        <div style={{ marginTop: 16, borderTop: "1px solid #2a2a3e", paddingTop: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <h4 style={{ fontSize: 12, color: "#c9a96e", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 8px" }}>NLP / Chatbot Capabilities</h4>
              <p style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6, margin: 0 }}>{tool.nlp}</p>
            </div>
            <div>
              <h4 style={{ fontSize: 12, color: "#c9a96e", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 8px" }}>Render Quality</h4>
              <p style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6, margin: 0 }}>{tool.quality}</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <h4 style={{ fontSize: 12, color: "#5ab83c", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 8px" }}>Pricing</h4>
              <p style={{ fontSize: 12, color: "#888", margin: "0 0 6px" }}>{tool.pricing.model}</p>
              <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 6px" }}>Free: {tool.pricing.free}</p>
              {tool.pricing.plans.map((p, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: "1px solid #1a1a2e" }}>
                  <span style={{ fontSize: 13, color: "#ccc" }}>{p.name}</span>
                  <span style={{ fontSize: 13, color: "#5ab83c", fontWeight: 600 }}>{p.price} <span style={{ fontSize: 10, color: "#666" }}>{p.note}</span></span>
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: 12, color: "#d94a7a", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 8px" }}>Ease of Use</h4>
              <p style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6, margin: 0 }}>{tool.ease}</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div>
              <h4 style={{ fontSize: 11, color: "#5ab83c", margin: "0 0 6px" }}>✅ Pros</h4>
              {tool.pros.map((p, i) => (
                <p key={i} style={{ fontSize: 12, color: "#aaa", margin: "2px 0", lineHeight: 1.5 }}>• {p}</p>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: 11, color: "#e74c3c", margin: "0 0 6px" }}>⚠️ Cons</h4>
              {tool.cons.map((c, i) => (
                <p key={i} style={{ fontSize: 12, color: "#888", margin: "2px 0", lineHeight: 1.5 }}>• {c}</p>
              ))}
            </div>
            <div style={{ background: "#1a1a2e", borderRadius: 8, padding: 12 }}>
              <h4 style={{ fontSize: 11, color: "#c9a96e", margin: "0 0 6px" }}>🎯 Best For</h4>
              <p style={{ fontSize: 12, color: "#ddd", margin: 0, lineHeight: 1.6 }}>{tool.bestFor}</p>
            </div>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 8, fontSize: 11, color: "#555" }}>
        {isExpanded ? "▲ Click to collapse" : "▼ Click to expand details"}
      </div>
    </div>
  );
}

export default function App() {
  const [expanded, setExpanded] = useState(0);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a14", color: "#fff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 28, fontWeight: 400, color: "#fff", margin: "0 0 8px" }}>
            AI Architecture Rendering Tools
          </h1>
          <p style={{ color: "#8a8aa0", fontSize: 14, margin: "0 0 4px" }}>
            Ranked for: Floor Plan → Photorealistic 3D Rendering with NLP/Chatbot
          </p>
          <p style={{ color: "#555", fontSize: 12 }}>
            625 Ocean Street Project • February 2026
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: 24, padding: "12px 16px", background: "#12121f", borderRadius: 12, border: "1px solid #2a2a3e" }}>
          {categories.map(cat => (
            <div key={cat.key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: cat.color }} />
              <span style={{ fontSize: 11, color: "#888" }}>{cat.label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tools.map((tool, i) => (
            <ToolCard
              key={tool.name}
              tool={tool}
              isExpanded={expanded === i}
              onToggle={() => setExpanded(expanded === i ? -1 : i)}
            />
          ))}
        </div>

        <div style={{ marginTop: 24, background: "#12121f", border: "1px solid #c9a96e33", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontFamily: "'Georgia', serif", fontSize: 18, color: "#c9a96e", margin: "0 0 12px" }}>
            ⚡ Recommendation for 625 Ocean Street
          </h3>
          <p style={{ fontSize: 14, color: "#ccc", lineHeight: 1.7, margin: "0 0 12px" }}>
            <strong style={{ color: "#fff" }}>Primary tool: ArchiVinci ($79/month one-time)</strong> — Upload your floor plan directly, use the "Render 2D Floor Plan" module with Nano Banana Pro engine for photorealistic output. I'll write the prompts. No subscription lock-in.
          </p>
          <p style={{ fontSize: 14, color: "#ccc", lineHeight: 1.7, margin: "0 0 12px" }}>
            <strong style={{ color: "#fff" }}>Secondary tool: Maket.ai ($30/mo)</strong> — Use for generating alternative floor plan layouts via conversational AI. Best chatbot in the category. Feed its outputs into ArchiVinci for final renders.
          </p>
          <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7, margin: 0 }}>
            Combined monthly cost: ~$109 first month ($79 ArchiVinci + $30 Maket). After that, $30/mo Maket only. Both tools within your $100/mo API budget target if timed right.
          </p>
        </div>
      </div>
    </div>
  );
}

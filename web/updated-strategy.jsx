import { useState } from "react";

const findings = [
  {
    title: "Your PDF Contains ELEVATIONS — This Changes Everything",
    icon: "🏆",
    color: "#10b981",
    content: "Pages A1-A2 have East/South/West/North elevation drawings showing the building's exterior profile. These are BETTER than simple floor plans for ControlNet. The building outline, windows, roofline, balconies — all clearly visible. This is the #1 input for photorealistic exterior renders."
  },
  {
    title: "Floor Plans Are Too Dense for Raw ControlNet",
    icon: "⚠️",
    color: "#f59e0b",
    content: "Pages A3-A5 have detailed construction drawings with dimensions, annotations, hatch patterns, door swings, electrical symbols, etc. ControlNet MLSD will detect hundreds of irrelevant lines. These need pre-processing (done — I extracted clean crops) or should only be used as reference."
  },
  {
    title: "Three-Story Building = Multiple Render Angles Needed",
    icon: "📐",
    color: "#3b82f6",
    content: "Level 1 (1,966 sqft): Garage, Rec Room, Office, Bedroom. Level 2 (2,432 sqft): Kitchen, Bedrooms, Bath. Level 3 (1,913 sqft): Open Balcony. You need renders from 4 exterior elevations + interior views per floor + rooftop pool deck = 10-15 renders minimum."
  }
];

const rankings = [
  {
    rank: 1,
    name: "Google Colab + ControlNet",
    badge: "BEST FOR EXTERIORS",
    color: "#10b981",
    prevRank: 1,
    change: "same",
    why: "ELEVATIONS are the ideal input",
    details: [
      "Feed East/South elevation drawings → ControlNet Canny → photorealistic exterior",
      "Pre-processed elevation images already extracted for you",
      "ControlNet-optimized versions (white-on-black) ready to upload",
      "Use Canny preprocessor (not MLSD) — better with architectural line drawings",
      "Free on Google Colab, works on your HP ProDesk"
    ],
    limitation: "Floor plan interiors need text-only prompts (no ControlNet) — still works but less precise",
    input: "Elevation Drawings (A1-A2)",
    action: "Upload east_elevation_controlnet.png to Colab notebook"
  },
  {
    rank: 2,
    name: "ArchiVinci ($79)",
    badge: "BEST FOR FLOOR PLANS",
    color: "#f59e0b",
    prevRank: 1,
    change: "up",
    why: "Handles architectural PDFs natively",
    details: [
      "\"Render 2D Floor Plan\" module designed specifically for construction drawings",
      "Can process floor plans WITH dimensions and annotations",
      "Nano Banana Pro engine handles the noise — trained on architectural docs",
      "Upload the raw PDF pages directly — no pre-processing needed",
      "Generates interior renders from floor plan layouts"
    ],
    limitation: "$79 cost, but handles your dense floor plans where ControlNet struggles",
    input: "Raw Floor Plans (A3-A5) + Elevations",
    action: "Upload floor_level1.png, floor_level2.png to ArchiVinci Floor Plan module"
  },
  {
    rank: 3,
    name: "Maket.ai ($30/mo)",
    badge: "BEST FOR REDESIGN",
    color: "#8b5cf6",
    prevRank: 2,
    change: "down",
    why: "Great for iterating layouts, not rendering existing plans",
    details: [
      "NLP chatbot can analyze your floor plan and suggest modifications",
      "Can generate ALTERNATIVE floor plans via text description",
      "Virtual Assistant for materials and cost estimation",
      "Regulatory Assistant can check zoning from uploaded PDFs"
    ],
    limitation: "Rendering is schematic, not photorealistic. Better for layout iteration than final renders.",
    input: "Text description of your floor plan + PDF upload",
    action: "Use for \"What if I move the kitchen?\" type exploration"
  },
  {
    rank: 4,
    name: "Sweet Home 3D (Free)",
    badge: "MOST PRACTICAL NOW",
    color: "#3b82f6",
    prevRank: 5,
    change: "up",
    why: "Manually recreate from your plans = accurate 3D walkthrough",
    details: [
      "Use your exact dimensions from the floor plans to draw walls",
      "First Level: 1,966 sqft with exact room sizes from A3",
      "Second Level: 2,432 sqft kitchen + bedrooms from A4",
      "Third Level: 1,913 sqft open balcony from A5",
      "Add furniture, materials, render from any angle",
      "No GPU, no cloud — runs on your HP ProDesk"
    ],
    limitation: "Manual work (~2-3 hours to recreate all 3 floors). Not AI-generated.",
    input: "Your floor plan dimensions (manually traced)",
    action: "Download Sweet Home 3D → trace Level 1 from A3 sheet dimensions"
  },
  {
    rank: 5,
    name: "FloorplanToBlender3d",
    badge: "WON'T WORK",
    color: "#ef4444",
    prevRank: 3,
    change: "down",
    why: "Dense construction drawings break its simple OpenCV detection",
    details: [
      "Designed for SIMPLE floor plan images with clean walls",
      "Your drawings have dimensions, annotations, symbols, hatch patterns",
      "OpenCV wall detection will fail on construction-grade blueprints",
      "Would need to manually redraw simplified floor plans first"
    ],
    limitation: "Effectively unusable with your actual architectural PDFs without major manual cleanup.",
    input: "N/A — too complex",
    action: "Skip this tool"
  }
];

const strategy = {
  phase1: {
    title: "TODAY — Exterior Renders (Free)",
    time: "~30 min",
    steps: [
      "Open Google Colab notebook (already built)",
      "Upload east_elevation_controlnet.png to ControlNet",
      "Set preprocessor to 'canny' (not mlsd)",
      "Paste Golden Hour exterior prompt",
      "Generate → 4 photorealistic exterior variations"
    ]
  },
  phase2: {
    title: "THIS WEEK — Interior Renders (Free or $79)",
    time: "~1-2 hours",
    steps: [
      "Option A (Free): Use Colab with text-only prompts (no ControlNet) — describe rooms from floor plan",
      "Option B ($79): ArchiVinci 'Render 2D Floor Plan' module — upload raw floor plans directly",
      "Generate interior renders for each major room per floor",
      "Pool deck render using text prompts with elevation as ControlNet reference"
    ]
  },
  phase3: {
    title: "IF NEEDED — Full 3D Walkthrough",
    time: "~3 hours",
    steps: [
      "Sweet Home 3D: Manually trace all 3 floors from your dimension callouts",
      "Add furniture and materials",
      "Generate walkthrough video from any angle",
      "No cost, runs on HP ProDesk"
    ]
  }
};

function RankChange({ change, prevRank }) {
  if (change === "up") return <span style={{color:"#10b981",fontSize:11,fontWeight:700}}>▲ was #{prevRank}</span>;
  if (change === "down") return <span style={{color:"#f87171",fontSize:11,fontWeight:700}}>▼ was #{prevRank}</span>;
  return <span style={{color:"#8b949e",fontSize:11}}>— unchanged</span>;
}

export default function UpdatedStrategy() {
  const [expanded, setExpanded] = useState(new Set([0]));
  const toggle = i => setExpanded(p => { const n = new Set(p); n.has(i)?n.delete(i):n.add(i); return n; });

  return (
    <div style={{minHeight:"100vh",background:"#010409",color:"#e6edf3",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",padding:"24px 16px"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>

        {/* Header */}
        <div style={{textAlign:"center",marginBottom:28,padding:"28px 20px",background:"linear-gradient(135deg,#0d1117,#161b22)",borderRadius:18,border:"1px solid #21262d"}}>
          <div style={{fontSize:11,color:"#f59e0b",textTransform:"uppercase",letterSpacing:3,fontWeight:700,marginBottom:8}}>
            Updated Strategy — Real PDF Analysis
          </div>
          <h1 style={{margin:"0 0 8px",fontSize:26,fontWeight:900,background:"linear-gradient(135deg,#f59e0b,#10b981)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            Rankings Changed
          </h1>
          <p style={{color:"#8b949e",fontSize:14,margin:0}}>
            Your 5-page architectural PDF from EDC Engineering has ELEVATION drawings — this is better than we expected
          </p>
        </div>

        {/* Key Findings */}
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
          {findings.map((f,i) => (
            <div key={i} style={{background:`${f.color}08`,border:`1px solid ${f.color}22`,borderRadius:12,padding:"14px 18px"}}>
              <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                <span style={{fontSize:20}}>{f.icon}</span>
                <div>
                  <h3 style={{margin:"0 0 4px",fontSize:14,fontWeight:800,color:f.color}}>{f.title}</h3>
                  <p style={{margin:0,fontSize:13,color:"#c9d1d9",lineHeight:1.6}}>{f.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Updated Rankings */}
        <h2 style={{fontSize:16,fontWeight:800,color:"#e6edf3",marginBottom:14,fontFamily:"'JetBrains Mono',monospace",display:"flex",alignItems:"center",gap:10}}>
          <span style={{color:"#f59e0b"}}>📊</span> Updated Tool Rankings
        </h2>

        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:28}}>
          {rankings.map((r,i) => (
            <div key={i} style={{
              background:"linear-gradient(135deg,#0d1117,#161b22)",
              border:`1px solid ${r.color}33`,
              borderRadius:14,overflow:"hidden",
              opacity: r.change === "down" && r.rank === 5 ? 0.6 : 1
            }}>
              <div onClick={()=>toggle(i)} style={{padding:"16px 20px",cursor:"pointer",display:"flex",alignItems:"center",gap:14}}>
                <div style={{
                  width:40,height:40,borderRadius:10,
                  background:`${r.color}15`,border:`2px solid ${r.color}44`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontWeight:900,fontSize:17,color:r.color,flexShrink:0
                }}>#{r.rank}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    <span style={{fontSize:15,fontWeight:800}}>{r.name}</span>
                    <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:12,background:`${r.color}18`,color:r.color}}>{r.badge}</span>
                    <RankChange change={r.change} prevRank={r.prevRank} />
                  </div>
                  <p style={{margin:"2px 0 0",fontSize:12,color:"#8b949e"}}>{r.why}</p>
                </div>
                <div style={{fontSize:14,color:"#484f58",transition:"transform 0.3s",transform:expanded.has(i)?"rotate(180deg)":"none"}}>▼</div>
              </div>

              {expanded.has(i) && (
                <div style={{padding:"0 20px 18px",borderTop:"1px solid #21262d22",paddingTop:14}}>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:12,marginBottom:12}}>
                    <div style={{background:"#0d111799",borderRadius:10,padding:14,border:"1px solid #21262d"}}>
                      <div style={{fontSize:11,color:r.color,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Why It Works</div>
                      {r.details.map((d,j) => (
                        <div key={j} style={{fontSize:13,color:"#c9d1d9",padding:"3px 0",lineHeight:1.5}}>
                          <span style={{color:r.color,marginRight:6}}>+</span>{d}
                        </div>
                      ))}
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:10}}>
                      <div style={{background:"#0d111799",borderRadius:10,padding:14,border:"1px solid #21262d"}}>
                        <div style={{fontSize:11,color:"#f87171",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>Limitation</div>
                        <p style={{margin:0,fontSize:13,color:"#c9d1d9"}}>{r.limitation}</p>
                      </div>
                      <div style={{background:`${r.color}08`,borderRadius:10,padding:14,border:`1px solid ${r.color}22`}}>
                        <div style={{fontSize:11,color:r.color,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>Input</div>
                        <p style={{margin:"0 0 8px",fontSize:13,color:"#e6edf3",fontWeight:600}}>{r.input}</p>
                        <div style={{fontSize:11,color:"#8b949e",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Next Action</div>
                        <p style={{margin:0,fontSize:13,color:r.color}}>{r.action}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Execution Plan */}
        <div style={{background:"linear-gradient(135deg,#10b98110,#3b82f610)",border:"1px solid #10b98130",borderRadius:16,padding:22,marginBottom:24}}>
          <h3 style={{margin:"0 0 16px",fontSize:15,fontWeight:800,color:"#10b981",fontFamily:"monospace"}}>
            🎯 EXECUTION PLAN — 3 Phases
          </h3>
          {Object.values(strategy).map((phase,i) => (
            <div key={i} style={{marginBottom:i<2?16:0}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <div style={{
                  width:28,height:28,borderRadius:8,
                  background:i===0?"#10b98120":i===1?"#3b82f620":"#8b5cf620",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:13,fontWeight:800,color:i===0?"#10b981":i===1?"#3b82f6":"#8b5cf6"
                }}>{i+1}</div>
                <h4 style={{margin:0,fontSize:14,fontWeight:700,color:"#e6edf3"}}>{phase.title}</h4>
                <span style={{fontSize:11,color:"#8b949e",fontFamily:"monospace"}}>{phase.time}</span>
              </div>
              {phase.steps.map((s,j) => (
                <div key={j} style={{fontSize:13,color:"#c9d1d9",paddingLeft:38,lineHeight:1.7}}>
                  <span style={{color:"#484f58",marginRight:6}}>→</span>{s}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Files Ready */}
        <div style={{background:"#0d1117",border:"1px solid #21262d",borderRadius:14,padding:18}}>
          <h3 style={{margin:"0 0 12px",fontSize:14,fontWeight:800,color:"#58a6ff"}}>📁 Files Extracted & Ready</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:8}}>
            {[
              {name:"east_elevation_controlnet.png",use:"⭐ Upload to Colab ControlNet",color:"#10b981"},
              {name:"south_elevation_controlnet.png",use:"Colab — south view render",color:"#10b981"},
              {name:"east_elevation.png",use:"Original crop — reference",color:"#3b82f6"},
              {name:"south_elevation.png",use:"Original crop — reference",color:"#3b82f6"},
              {name:"west_elevation.png",use:"Original crop — reference",color:"#3b82f6"},
              {name:"north_elevation.png",use:"Original crop — reference",color:"#3b82f6"},
              {name:"floor_level1.png",use:"ArchiVinci or Sweet Home 3D",color:"#f59e0b"},
              {name:"floor_level2.png",use:"ArchiVinci or Sweet Home 3D",color:"#f59e0b"},
              {name:"floor_level3.png",use:"ArchiVinci or Sweet Home 3D",color:"#f59e0b"},
            ].map((f,i) => (
              <div key={i} style={{background:"#161b22",borderRadius:8,padding:"8px 12px",border:"1px solid #21262d",fontSize:12}}>
                <div style={{color:"#e6edf3",fontWeight:700,fontFamily:"monospace",marginBottom:2}}>{f.name}</div>
                <div style={{color:f.color,fontSize:11}}>{f.use}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{textAlign:"center",padding:20,color:"#484f58",fontSize:11,fontFamily:"monospace"}}>
          625 Ocean Street • EDC Engineering Drawings Analysis • BidDeed.AI • Feb 2026
        </div>
      </div>
    </div>
  );
}

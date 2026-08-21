import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";
import { deckMeta, slides } from "../assets/deck-content.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const renderDir = path.join(root, "artifacts", "deck-renders");
const outputPath = path.join(root, "assets", "downloads", "le-contradicteur-deck.pptx");

const W = 1280;
const H = 720;
const C = {
  ivory: "#F4F0E7",
  paper: "#FFFDF8",
  charcoal: "#1D1D1B",
  muted: "#6C6A64",
  line: "#D7D1C5",
  red: "#C64335",
  redSoft: "#F3D9D3",
  blue: "#506B7A",
  blueSoft: "#DCE6E9",
  sand: "#E8E0D2"
};

const presentation = Presentation.create({ slideSize: { width: W, height: H } });

function addText(slide, text, position, options = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    position,
    fill: options.fill ?? "none",
    line: { style: "solid", fill: options.line ?? "none", width: options.lineWidth ?? 0 },
    borderRadius: options.radius ?? 0,
    name: options.name
  });
  shape.text = text;
  shape.text.style = {
    fontSize: options.fontSize ?? 22,
    fontFamily: "Arial",
    bold: options.bold ?? false,
    color: options.color ?? C.charcoal,
    alignment: options.align ?? "left",
    verticalAlignment: options.vertical ?? "middle"
  };
  return shape;
}

function addBox(slide, position, options = {}) {
  return slide.shapes.add({
    geometry: options.geometry ?? "roundRect",
    position,
    fill: options.fill ?? C.paper,
    line: { style: "solid", fill: options.line ?? C.line, width: options.lineWidth ?? 1 },
    borderRadius: options.radius ?? 18,
    shadow: options.shadow ?? "shadow-none",
    name: options.name
  });
}

function addRule(slide, left, top, width, color = C.line, height = 2) {
  return addBox(slide, { left, top, width, height }, {
    geometry: "rect",
    fill: color,
    line: color,
    lineWidth: 0,
    radius: 0
  });
}

function addBadge(slide, text, left, top, width, tone = "blue") {
  const palette = tone === "red"
    ? { fill: C.redSoft, color: C.red }
    : tone === "dark"
      ? { fill: C.charcoal, color: C.paper }
      : { fill: C.blueSoft, color: C.blue };
  return addText(slide, text, { left, top, width, height: 30 }, {
    fill: palette.fill,
    color: palette.color,
    fontSize: 12,
    bold: true,
    align: "center",
    radius: 15
  });
}

function addFooter(slide, data) {
  addRule(slide, 64, 664, 1152, C.line, 1);
  addText(slide, `${data.number} / ${String(slides.length).padStart(2, "0")}`, {
    left: 64, top: 675, width: 110, height: 20
  }, { fontSize: 11, color: C.muted, bold: true });
  addText(slide, `${deckMeta.status}  ·  ${deckMeta.regime}  ·  ${deckMeta.execution}`, {
    left: 260, top: 675, width: 956, height: 20
  }, { fontSize: 10, color: C.muted, align: "right", bold: true });
}

function addHeader(slide, data) {
  addText(slide, data.eyebrow, { left: 64, top: 34, width: 640, height: 24 }, {
    fontSize: 12, color: C.red, bold: true
  });
  addText(slide, data.title, { left: 64, top: 78, width: 1148, height: 104 }, {
    fontSize: data.title.length > 70 ? 38 : 44,
    bold: true,
    color: C.charcoal
  });
}

function addStatement(slide, text, top = 188, width = 1120) {
  addText(slide, text, { left: 64, top, width, height: 58 }, {
    fontSize: 20, color: C.muted
  });
}

function addNotes(slide, data) {
  const sourceLines = (data.sources ?? []).map((source) => `- ${source}`);
  slide.speakerNotes.textFrame.setText([
    data.notes ?? "",
    "",
    "[Sources]",
    ...sourceLines,
    "[/Sources]"
  ]);
  slide.speakerNotes.setVisible(true);
}

function createSlide(data) {
  const slide = presentation.slides.add();
  slide.background.fill = C.ivory;
  addNotes(slide, data);

  if (data.layout === "cover") {
    addText(slide, data.eyebrow, { left: 64, top: 42, width: 560, height: 28 }, {
      fontSize: 13, color: C.red, bold: true
    });
    addText(slide, data.title, { left: 64, top: 120, width: 760, height: 156 }, {
      fontSize: 64, bold: true
    });
    addText(slide, data.statement, { left: 64, top: 304, width: 700, height: 92 }, {
      fontSize: 25, color: C.muted
    });
    addText(slide, data.kicker, { left: 64, top: 446, width: 650, height: 44 }, {
      fontSize: 18, color: C.blue, bold: true
    });

    const bars = [190, 154, 222, 176, 204];
    bars.forEach((height, index) => {
      const x = 892 + index * 54;
      addBox(slide, { left: x, top: 345 - height / 2, width: 22, height }, {
        geometry: "rect",
        fill: index === 4 ? C.red : C.blue,
        line: "none",
        lineWidth: 0,
        radius: 11
      });
      addText(slide, `A${index + 1}`, { left: x - 7, top: 475, width: 36, height: 22 }, {
        fontSize: 11, color: C.muted, bold: true, align: "center"
      });
    });
    addRule(slide, 858, 348, 330, C.charcoal, 3);
    addBadge(slide, "ARBITRER SANS MOYENNER", 884, 520, 280, "dark");
    addFooter(slide, data);
    return slide;
  }

  addHeader(slide, data);
  if (data.layout !== "closing") addStatement(slide, data.statement);

  if (data.layout === "editorial") {
    addBox(slide, { left: 64, top: 276, width: 494, height: 318 }, {
      fill: C.charcoal, line: C.charcoal, radius: 24
    });
    addText(slide, data.callout, { left: 98, top: 318, width: 426, height: 200 }, {
      fontSize: 35, bold: true, color: C.paper
    });
    addRule(slide, 98, 546, 110, C.red, 7);
    data.items.forEach((item, index) => {
      const top = 294 + index * 96;
      addText(slide, String(index + 1).padStart(2, "0"), { left: 614, top, width: 54, height: 42 }, {
        fontSize: 14, color: C.red, bold: true
      });
      addText(slide, item, { left: 678, top, width: 500, height: 72 }, {
        fontSize: 20, color: C.charcoal, bold: index === 0
      });
      if (index < data.items.length - 1) addRule(slide, 614, top + 78, 564, C.line, 1);
    });
  }

  if (data.layout === "split") {
    const columns = [
      { box: data.left, left: 64, fill: C.charcoal, color: C.paper, accent: C.red },
      { box: data.right, left: 658, fill: C.paper, color: C.charcoal, accent: C.blue }
    ];
    columns.forEach(({ box, left, fill, color, accent }) => {
      addBox(slide, { left, top: 276, width: 558, height: 312 }, {
        fill, line: fill === C.paper ? C.line : C.charcoal, radius: 24
      });
      addText(slide, box.title, { left: left + 34, top: 304, width: 480, height: 42 }, {
        fontSize: 25, bold: true, color
      });
      addRule(slide, left + 34, 362, 76, accent, 6);
      box.items.forEach((item, index) => {
        addText(slide, `—  ${item}`, { left: left + 34, top: 394 + index * 55, width: 476, height: 42 }, {
          fontSize: 19, color
        });
      });
    });
    addText(slide, data.footer, { left: 92, top: 606, width: 1088, height: 35 }, {
      fontSize: 13, color: C.muted, align: "center", bold: true
    });
  }

  if (data.layout === "flow") {
    const widths = [178, 200, 208, 198, 208];
    const tones = [C.sand, C.blueSoft, C.paper, C.redSoft, C.charcoal];
    const textColors = [C.charcoal, C.charcoal, C.charcoal, C.charcoal, C.paper];
    let x = 64;
    data.steps.forEach((step, index) => {
      const width = widths[index];
      addBox(slide, { left: x, top: 302, width, height: 224 }, {
        fill: tones[index], line: index === 4 ? C.charcoal : C.line, radius: 22
      });
      addText(slide, String(index + 1).padStart(2, "0"), { left: x + 22, top: 322, width: 44, height: 28 }, {
        fontSize: 12, color: index === 4 ? C.redSoft : C.red, bold: true
      });
      addText(slide, step.label, { left: x + 22, top: 370, width: width - 44, height: 42 }, {
        fontSize: 24, bold: true, color: textColors[index]
      });
      addText(slide, step.detail, { left: x + 22, top: 424, width: width - 44, height: 76 }, {
        fontSize: 16, color: index === 4 ? C.paper : C.muted
      });
      if (index < data.steps.length - 1) {
        addRule(slide, x + width, 409, 24, C.red, 4);
      }
      x += width + 24;
    });
    addBadge(slide, "MÊME MODÈLE · CONTEXTES SÉPARÉS", 64, 548, 300, "blue");
    addBadge(slide, "UN BLOQUANT NE SE MOYENNE PAS", 382, 548, 300, "red");
  }

  if (data.layout === "comparison") {
    const panels = [
      { value: data.left, left: 64, fill: C.paper, line: C.line, tone: "blue" },
      { value: data.right, left: 658, fill: C.charcoal, line: C.charcoal, tone: "red" }
    ];
    panels.forEach(({ value, left, fill, line, tone }) => {
      addBox(slide, { left, top: 274, width: 558, height: 308 }, { fill, line, radius: 24 });
      addBadge(slide, value.label, left + 28, 296, 196, tone);
      addText(slide, value.title, { left: left + 28, top: 358, width: 500, height: 76 }, {
        fontSize: 31, bold: true, color: fill === C.charcoal ? C.paper : C.charcoal
      });
      addText(slide, value.detail, { left: left + 28, top: 458, width: 488, height: 70 }, {
        fontSize: 18, color: fill === C.charcoal ? C.redSoft : C.muted
      });
    });
    addText(slide, data.footer, { left: 64, top: 602, width: 1152, height: 34 }, {
      fontSize: 14, color: C.muted, align: "center", bold: true
    });
  }

  if (data.layout === "personas") {
    const gap = 14;
    const width = (1152 - gap * 4) / 5;
    data.personas.forEach((persona, index) => {
      const left = 64 + index * (width + gap);
      addBox(slide, { left, top: 292, width, height: 284 }, {
        fill: index % 2 === 0 ? C.paper : C.blueSoft,
        line: C.line,
        radius: 20
      });
      addText(slide, persona.id, { left: left + 20, top: 312, width: 46, height: 28 }, {
        fontSize: 12, color: C.red, bold: true
      });
      addText(slide, persona.name, { left: left + 20, top: 364, width: width - 40, height: 72 }, {
        fontSize: persona.name.length > 14 ? 18 : 23, bold: true
      });
      addRule(slide, left + 20, 454, 58, index === 4 ? C.red : C.blue, 5);
      addText(slide, persona.question, { left: left + 20, top: 478, width: width - 40, height: 64 }, {
        fontSize: 17, color: C.muted, bold: true
      });
    });
  }

  if (data.layout === "ledger") {
    const columns = [
      { title: "CE QUE LE CODE DEVRA ÉTABLIR", items: data.established, left: 64, accent: C.blue, fill: C.blueSoft },
      { title: "CE QU’IL NE POURRA PAS ÉTABLIR", items: data.notEstablished, left: 658, accent: C.red, fill: C.redSoft }
    ];
    columns.forEach(({ title, items, left, accent, fill }) => {
      addBox(slide, { left, top: 280, width: 558, height: 322 }, { fill, line: C.line, radius: 24 });
      addText(slide, title, { left: left + 28, top: 306, width: 500, height: 30 }, {
        fontSize: 14, color: accent, bold: true
      });
      items.forEach((item, index) => {
        addText(slide, index === 0 ? item : `—  ${item}`, { left: left + 28, top: 358 + index * 56, width: 500, height: 44 }, {
          fontSize: 18, color: C.charcoal, bold: index === 0
        });
      });
    });
  }

  if (data.layout === "boundary") {
    data.path.forEach((stage, index) => {
      const left = 64 + index * 392;
      const fill = index === 0 ? C.blueSoft : index === 1 ? C.redSoft : C.paper;
      const accent = index === 0 ? C.blue : index === 1 ? C.red : C.charcoal;
      addBox(slide, { left, top: 304, width: 366, height: 230 }, { fill, line: C.line, radius: 22 });
      addText(slide, stage.label, { left: left + 26, top: 330, width: 314, height: 44 }, {
        fontSize: 25, bold: true
      });
      addText(slide, stage.state, { left: left + 26, top: 392, width: 314, height: 32 }, {
        fontSize: 13, color: accent, bold: true
      });
      addText(slide, stage.detail, { left: left + 26, top: 448, width: 314, height: 52 }, {
        fontSize: 17, color: C.muted
      });
      if (index < data.path.length - 1) addRule(slide, left + 366, 418, 26, C.charcoal, 3);
    });
    addText(slide, data.footer, { left: 64, top: 566, width: 1152, height: 40 }, {
      fontSize: 16, color: C.red, align: "center", bold: true
    });
  }

  if (data.layout === "closing") {
    addBox(slide, { left: 64, top: 286, width: 734, height: 294 }, {
      fill: C.charcoal, line: C.charcoal, radius: 26
    });
    addText(slide, data.statement, { left: 102, top: 326, width: 656, height: 190 }, {
      fontSize: 31, color: C.paper, bold: true
    });
    data.asks.forEach((ask, index) => {
      addText(slide, String(index + 1).padStart(2, "0"), { left: 846, top: 302 + index * 88, width: 54, height: 34 }, {
        fontSize: 12, color: C.red, bold: true
      });
      addText(slide, ask, { left: 910, top: 294 + index * 88, width: 304, height: 68 }, {
        fontSize: 18, color: C.charcoal, bold: index === 0
      });
    });
    addBadge(slide, "OUVRIR LA MAQUETTE", 846, 568, 260, "dark");
  }

  addFooter(slide, data);
  return slide;
}

for (const slideData of slides) createSlide(slideData);

await fs.mkdir(renderDir, { recursive: true });
await fs.mkdir(path.dirname(outputPath), { recursive: true });

for (const [index, slide] of presentation.slides.items.entries()) {
  const stem = `slide-${String(index + 1).padStart(2, "0")}`;
  const png = await presentation.export({ slide, format: "png", scale: 1 });
  await fs.writeFile(path.join(renderDir, `${stem}.png`), new Uint8Array(await png.arrayBuffer()));
  const layout = await slide.export({ format: "layout" });
  await fs.writeFile(path.join(renderDir, `${stem}.layout.json`), await layout.text());
}

const montage = await presentation.export({ format: "webp", montage: true, scale: 1 });
await fs.writeFile(path.join(renderDir, "deck-montage.webp"), new Uint8Array(await montage.arrayBuffer()));

const pptx = await PresentationFile.exportPptx(presentation);
await pptx.save(outputPath);

try {
  await fs.rename(`${outputPath}.inspect.ndjson`, path.join(renderDir, "deck.inspect.ndjson"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

process.stdout.write(`Deck créé : ${outputPath}\n`);

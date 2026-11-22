// =====================================================================
// คีย์บอร์ดบนจอ: โน้ต (ดรมฟ) / ไทย (เกษมณี) / อังกฤษ (QWERTY)
// หน้าตาและวิธีจัดผังตาม SyyDai IME (https://syydai.gitlab.io/ime/):
//  - ผังแป้นเป็นข้อมูล อ้างอิงตำแหน่งแป้นด้วย KeyboardEvent.code → [ปกติ, Shift]
//  - จอกว้าง ≥ 500px ใช้กริด 52 คอลัมน์แบบ PC (แถวเหลื่อม, Enter สูง 2 แถว)
//    จอแคบใช้กริด 11 คอลัมน์แบบมือถือ
//  - ตัวหลักอยู่กลางแป้น ตัวที่ได้เมื่อกด Shift อยู่มุมขวาบน
//  - Shift แตะครั้งเดียว = ตัวถัดไป, แตะซ้ำ = ล็อก, แตะอีกครั้ง = ปิด
//  - อุปกรณ์สัมผัส: ช่องพิมพ์โน้ตตั้ง inputmode="none" เสมอ (คีย์บอร์ดของระบบไม่เด้ง)
//    แตะช่องพิมพ์แล้วเปิดคีย์บอร์ดบนจอแทน
// ต้องโหลดหลัง script/index.js (ใช้ thmNote, showKeyboard)
// =====================================================================
(function () {
  const LAYOUTS = {
    thai: {
      keys: {
        Backquote: ["_", "%"], Digit1: ["ๅ", "+"], Digit2: ["/", "๑"], Digit3: ["-", "๒"],
        Digit4: ["ภ", "๓"], Digit5: ["ถ", "๔"], Digit6: ["ุ", "ู"], Digit7: ["ึ", "฿"],
        Digit8: ["ค", "๕"], Digit9: ["ต", "๖"], Digit0: ["จ", "๗"], Minus: ["ข", "๘"], Equal: ["ช", "๙"],
        KeyQ: ["ๆ", "๐"], KeyW: ["ไ", "\""], KeyE: ["ำ", "ฎ"], KeyR: ["พ", "ฑ"], KeyT: ["ะ", "ธ"],
        KeyY: ["ั", "ํ"], KeyU: ["ี", "๊"], KeyI: ["ร", "ณ"], KeyO: ["น", "ฯ"], KeyP: ["ย", "ญ"],
        BracketLeft: ["บ", "ฐ"], BracketRight: ["ล", ","], Backslash: ["ฃ", "ฅ"],
        KeyA: ["ฟ", "ฤ"], KeyS: ["ห", "ฆ"], KeyD: ["ก", "ฏ"], KeyF: ["ด", "โ"], KeyG: ["เ", "ฌ"],
        KeyH: ["้", "็"], KeyJ: ["่", "๋"], KeyK: ["า", "ษ"], KeyL: ["ส", "ศ"], Semicolon: ["ว", "ซ"], Quote: ["ง", "."],
        KeyZ: ["ผ", "("], KeyX: ["ป", ")"], KeyC: ["แ", "ฉ"], KeyV: ["อ", "ฮ"], KeyB: ["ิ", "ฺ"],
        KeyN: ["ื", "์"], KeyM: ["ท", "?"], Comma: ["ม", "ฒ"], Period: ["ใ", "ฬ"], Slash: ["ฝ", "ฦ"],
      },
    },
    en: {
      keys: {
        Backquote: ["`", "~"], Digit1: ["1", "!"], Digit2: ["2", "@"], Digit3: ["3", "#"], Digit4: ["4", "$"],
        Digit5: ["5", "%"], Digit6: ["6", "^"], Digit7: ["7", "&"], Digit8: ["8", "*"], Digit9: ["9", "("],
        Digit0: ["0", ")"], Minus: ["-", "_"], Equal: ["=", "+"],
        KeyQ: ["q", "Q"], KeyW: ["w", "W"], KeyE: ["e", "E"], KeyR: ["r", "R"], KeyT: ["t", "T"],
        KeyY: ["y", "Y"], KeyU: ["u", "U"], KeyI: ["i", "I"], KeyO: ["o", "O"], KeyP: ["p", "P"],
        BracketLeft: ["[", "{"], BracketRight: ["]", "}"], Backslash: ["\\", "|"],
        KeyA: ["a", "A"], KeyS: ["s", "S"], KeyD: ["d", "D"], KeyF: ["f", "F"], KeyG: ["g", "G"],
        KeyH: ["h", "H"], KeyJ: ["j", "J"], KeyK: ["k", "K"], KeyL: ["l", "L"], Semicolon: [";", ":"], Quote: ["'", "\""],
        KeyZ: ["z", "Z"], KeyX: ["x", "X"], KeyC: ["c", "C"], KeyV: ["v", "V"], KeyB: ["b", "B"],
        KeyN: ["n", "N"], KeyM: ["m", "M"], Comma: [",", "<"], Period: [".", ">"], Slash: ["/", "?"],
      },
    },
  };

  // ลำดับแป้น (กริดจัดตำแหน่ง/ความกว้างด้วย CSS ตาม data-code) · "@lang" / "@hide" = แถบเลือกผัง / ปุ่มซ่อน
  const ORDER = {
    pc: ("Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9 Digit0 Minus Equal Backspace " +
      "KeyQ KeyW KeyE KeyR KeyT KeyY KeyU KeyI KeyO KeyP BracketLeft BracketRight Enter " +
      "KeyA KeyS KeyD KeyF KeyG KeyH KeyJ KeyK KeyL Semicolon Quote Backslash " +
      "ShiftLeft KeyZ KeyX KeyC KeyV KeyB KeyN KeyM Comma Period Slash ShiftRight Backquote " +
      "@lang Space @hide").split(" "),
    mbl: ("Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9 Digit0 Minus " +
      "KeyQ KeyW KeyE KeyR KeyT KeyY KeyU KeyI KeyO KeyP BracketLeft " +
      "KeyA KeyS KeyD KeyF KeyG KeyH KeyJ KeyK KeyL Semicolon Quote " +
      "ShiftLeft KeyX KeyC KeyV KeyB KeyN KeyM Comma Period Slash Backspace " +
      "KeyZ Backslash Backquote Space Equal BracketRight Enter " +
      "@lang @hide").split(" "),
  };

  const FN_LABEL = { Backspace: "⌫", Enter: "⏎", ShiftLeft: "⇧", ShiftRight: "⇧" };
  const LANGS = [["note", "ดรมฟ"], ["thai", "ไทย"], ["en", "EN"]];
  const STORE_KEY = "kbLayout";

  const kb = document.getElementById("keyboard");
  // ย้ายไปอยู่ใต้ <body> โดยตรง เพื่อให้ลอยอยู่เหนือแถบสถานะได้ (ไม่ติด stacking context ของพื้นที่ทำงาน)
  document.body.appendChild(kb);
  const noteBox = document.getElementById("kbNote");
  const noteNav = document.getElementById("kbNoteNav");
  const textBox = document.getElementById("kbText");
  const narrow = window.matchMedia("(max-width: 499px)");
  const touch = window.matchMedia("(pointer: coarse)");

  let current = "note";
  let shift = 0; // 0 = ปิด, 1 = ตัวถัดไป, 2 = ล็อก

  // อักขระประกอบ (สระบน/ล่าง วรรณยุกต์) แสดงคู่กับ ◌ ให้อ่านง่าย
  const COMBINING = /^[ัิ-ฺ็-๎]$/;
  const show = ch => (COMBINING.test(ch) ? "◌" + ch : ch);

  // ---------- แทรก/ลบข้อความที่ตำแหน่ง caret ----------
  function changed() {
    thmNote.dispatchEvent(new Event("input", { bubbles: true }));
    keepCaretVisible();
  }
  function insertText(text) {
    thmNote.setRangeText(text, thmNote.selectionStart, thmNote.selectionEnd, "end");
    changed();
  }
  function backspace() {
    const s = thmNote.selectionStart, e = thmNote.selectionEnd;
    if (s !== e) thmNote.setRangeText("", s, e, "end");
    else if (s > 0) {
      // ลบทีละ 1 code unit เหมือนคีย์บอร์ดจริง (สระ/วรรณยุกต์ลบทีละตัว)
      thmNote.setRangeText("", s - 1, s, "end");
    } else return;
    changed();
  }
  // พิมพ์ต่อท้ายแล้วบรรทัดล่างสุดไม่ถูกคีย์บอร์ดบัง
  function keepCaretVisible() {
    if (thmNote.selectionEnd < thmNote.value.length - 1) return;
    const over = thmNote.getBoundingClientRect().bottom - kb.getBoundingClientRect().top + 8;
    if (over > 0) window.scrollBy(0, over);
  }

  // ---------- แถบเลือกผัง + ปุ่มซ่อน (ย้ายไปอยู่ในผังที่แสดงอยู่) ----------
  const lang = document.createElement("div");
  lang.className = "kb-lang";
  lang.setAttribute("role", "tablist");
  lang.setAttribute("aria-label", "ผังแป้นพิมพ์");
  const globe = document.createElement("button");
  globe.type = "button";
  globe.textContent = "🌐";
  globe.title = "สลับผังแป้นพิมพ์";
  globe.addEventListener("click", () => {
    const i = LANGS.findIndex(l => l[0] === current);
    setLayout(LANGS[(i + 1) % LANGS.length][0]);
  });
  lang.appendChild(globe);
  LANGS.forEach(([id, label]) => {
    const t = document.createElement("button");
    t.type = "button";
    t.dataset.layout = id;
    t.setAttribute("role", "tab");
    t.textContent = label;
    t.addEventListener("click", () => setLayout(id));
    lang.appendChild(t);
  });

  const hideBtn = document.createElement("button");
  hideBtn.type = "button";
  hideBtn.className = "kb-key kb-fn kb-hide";
  hideBtn.textContent = "▼";
  hideBtn.title = "ซ่อนคีย์บอร์ด";
  hideBtn.addEventListener("click", () => { kb.style.display = "none"; });

  // ---------- สร้างผังข้อความ (ไทย/EN) จากข้อมูล ----------
  function buildText() {
    const style = narrow.matches ? "mbl" : "pc";
    const layout = LAYOUTS[current];
    textBox.className = "kb-layout kb-text " + style;
    textBox.innerHTML = "";
    ORDER[style].forEach(code => {
      if (code === "@lang") return textBox.appendChild(lang);
      if (code === "@hide") return textBox.appendChild(hideBtn);
      const b = document.createElement("button");
      b.type = "button";
      b.className = "kb-key";
      b.dataset.code = code;
      if (FN_LABEL[code]) {
        b.classList.add("kb-fn");
        b.textContent = FN_LABEL[code];
        b.setAttribute("aria-label", code.replace(/Left|Right/, ""));
      } else if (code === "Space") {
        b.innerHTML = '<span class="kb-space-label"></span>';
        b.setAttribute("aria-label", "เว้นวรรค");
      } else {
        const [n, sh] = layout.keys[code] || ["", ""];
        b.dataset.n = n;
        b.dataset.s = sh;
        b.innerHTML = '<span class="kb-main"></span><span class="kb-l3"></span>';
      }
      textBox.appendChild(b);
    });
    const sp = textBox.querySelector(".kb-space-label");
    if (sp) sp.textContent = current === "thai" ? "ไทย" : "English";
    paintShift();
  }

  function paintShift() {
    textBox.querySelectorAll(".kb-key").forEach(b => {
      const code = b.dataset.code;
      if (code === "ShiftLeft" || code === "ShiftRight") {
        b.classList.toggle("on", shift > 0);
        b.classList.toggle("locked", shift === 2);
        b.textContent = shift ? "⬆" : "⇧";
        b.setAttribute("aria-pressed", String(shift > 0));
        b.title = shift === 2 ? "Shift ล็อกอยู่" : "Shift (แตะสองครั้งเพื่อล็อก)";
        return;
      }
      if (b.dataset.n === undefined) return;
      const main = shift ? b.dataset.s : b.dataset.n;
      const alt = shift ? b.dataset.n : b.dataset.s;
      b.querySelector(".kb-main").textContent = show(main);
      // ตัวอังกฤษพิมพ์ใหญ่/เล็กไม่ต้องแสดงซ้ำที่มุม
      b.querySelector(".kb-l3").textContent = alt && alt.toLowerCase() !== main.toLowerCase() ? show(alt) : "";
      b.setAttribute("aria-label", main);
    });
  }

  function press(code) {
    switch (code) {
      case "ShiftLeft": case "ShiftRight": shift = (shift + 1) % 3; paintShift(); return;
      case "Backspace": backspace(); return;
      case "Enter": insertText("\n"); return;
      case "Space": insertText(" "); return;
    }
    const b = textBox.querySelector(`[data-code="${code}"]`);
    const ch = b && (shift ? b.dataset.s : b.dataset.n);
    if (ch) insertText(ch);
    if (shift === 1) { shift = 0; paintShift(); }
  }

  // คลิก (รวมถึงกด Enter/Space บนปุ่มด้วยคีย์บอร์ดจริง) · Backspace ใช้ pointer เพื่อกดค้างลบต่อเนื่อง
  textBox.addEventListener("click", e => {
    const b = e.target.closest(".kb-key[data-code]");
    if (!b) return;
    if (b.dataset.code === "Backspace" && e.detail !== 0) return;
    press(b.dataset.code);
  });
  let repeatT = null;
  const stopRepeat = () => { clearTimeout(repeatT); clearInterval(repeatT); repeatT = null; };
  textBox.addEventListener("pointerdown", e => {
    const b = e.target.closest('.kb-key[data-code="Backspace"]');
    if (!b) return;
    backspace();
    repeatT = setTimeout(() => { repeatT = setInterval(backspace, 60); }, 400);
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach(t => textBox.addEventListener(t, stopRepeat));

  // ---------- ทุกปุ่มในคีย์บอร์ด: ไม่แย่งโฟกัสจากช่องพิมพ์ + แสดงสถานะกด ----------
  kb.addEventListener("mousedown", e => { if (e.target.closest("button")) e.preventDefault(); });
  kb.addEventListener("pointerdown", e => {
    const b = e.target.closest("button");
    if (b) b.classList.add("pressed");
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach(t => kb.addEventListener(t, () => {
    kb.querySelectorAll("button.pressed").forEach(b => b.classList.remove("pressed"));
  }, true));

  // ---------- เลือกผัง ----------
  function setLayout(id) {
    if (id !== "note" && !LAYOUTS[id]) id = "note";
    current = id;
    shift = 0;
    noteBox.hidden = id !== "note";
    textBox.hidden = id === "note";
    if (id === "note") {
      noteNav.append(lang, hideBtn);
    } else {
      buildText();
    }
    lang.querySelectorAll("[data-layout]").forEach(t => t.setAttribute("aria-selected", String(t.dataset.layout === id)));
    try { localStorage.setItem(STORE_KEY, id); } catch (e) {}
  }
  narrow.addEventListener("change", () => { if (current !== "note") buildText(); });

  // ---------- เปิด/ปิด: เว้นที่ด้านล่างของหน้าเท่าความสูงคีย์บอร์ด ----------
  const isOpen = () => kb.style.display !== "none";
  function syncOpen() {
    document.body.classList.toggle("kb-open", isOpen());
    document.documentElement.style.setProperty("--kb-h", kb.offsetHeight + "px");
  }
  new MutationObserver(syncOpen).observe(kb, { attributes: true, attributeFilter: ["style"] });
  if ("ResizeObserver" in window) new ResizeObserver(syncOpen).observe(kb);

  // ---------- อุปกรณ์สัมผัส: ไม่ให้คีย์บอร์ดของระบบปรากฏ ----------
  function syncInputMode() {
    if (touch.matches) thmNote.setAttribute("inputmode", "none");
    else thmNote.removeAttribute("inputmode");
  }
  touch.addEventListener("change", syncInputMode);
  syncInputMode();
  // แตะช่องพิมพ์ → เปิดคีย์บอร์ดบนจอ
  const openOnTouch = () => { if (touch.matches && !isOpen()) kb.style.display = "block"; };
  thmNote.addEventListener("focus", openOnTouch);
  thmNote.addEventListener("pointerup", openOnTouch);

  let saved = "note";
  try { saved = localStorage.getItem(STORE_KEY) || "note"; } catch (e) {}
  setLayout(saved);
  syncOpen();
})();

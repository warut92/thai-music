// -------- STYLES --------
const style = document.createElement("style");
style.textContent = `
  #linkBox {
    position: absolute;
    top: 40px;
    right: 20px;
    background-color: yellow;
    padding: 10px;
    border: 1px solid blue;
    display: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  #toggleBtn {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 24px;
    cursor: pointer;
    background: none;
    border: none;
  }
  #linkBox a {
    display: block;
    margin: 5px 0;
    color: #007BFF;
    text-decoration: none;
  }
  #linkBox a:hover {
    text-decoration: underline;
  }
`;
document.head.appendChild(style);

// -------- TOGGLE BUTTON --------
const toggleBtn = document.createElement("button");
toggleBtn.id = "toggleBtn";
toggleBtn.textContent = "🍎";
document.body.appendChild(toggleBtn);

// -------- LINK BOX DIV --------
const linkBox = document.createElement("div");
linkBox.id = "linkBox";
document.body.appendChild(linkBox);

// -------- LINKS DATA --------
const links = [
  { text: "หน้าหลัก", url: "./index.html" },
  { text: "แบบที่ 1", url: "./4bars1-1.html" },
  { text: "แบบที่ 2", url: "./4bars2-1.html" },
  { text: "แบบที่ 3", url: "./4bars3-1.html" },
  { text: "แบบที่ 4", url: "./4bars4-1.html" },
  { text: "แบบปรับแต่งเอง", url: "./4bars4-custom.html" }

];

// -------- CREATE LINKS --------
links.forEach(link => {
  const a = document.createElement("a");
  a.href = link.url;
  a.textContent = link.text;
  a.target = "";
  linkBox.appendChild(a);
});

// -------- TOGGLE FUNCTION --------
toggleBtn.addEventListener("click", () => {
  const isVisible = linkBox.style.display === "block";
  linkBox.style.display = isVisible ? "none" : "block";
});

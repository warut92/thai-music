const themes = {

    theme1: {
        normal: "Sarabun, sans-serif",
        bold: "Kanit, sans-serif",
        background: "#f9fafb",
        text: "#222222",
        boxBackground: "#eeeeee",
        border: "#030712"
    },
  
    theme2: {
        normal: "Tahoma, sans-serif",
        bold: "Arial, sans-serif",
        background: "#fff8dc",
        text: "#333333",
        boxBackground: "#f5e6b3",
        border: "#f76a2b"
    },
  
    theme3: {
        normal: "Verdana, sans-serif",
        bold: "Trebuchet MS, sans-serif",
        background: "#202124",
        text: "#eeeeee",
        boxBackground: "#303134",
        border: "#282bbd"
    },
    theme4: {
        normal: "Verdana, sans-serif",
        bold: "Trebuchet MS, sans-serif",
        background: "#4b5a71",
        text: "#eeeeee",
        boxBackground: "#303134",
        border: "#0c0432"
    },
    theme5: {
        normal: "Verdana, sans-serif",
        bold: "Trebuchet MS, sans-serif",
        background: "#312c85",
        text: "#eeeeee",
        boxBackground: "#303134",
        border: "#7b85fd"
    },
    theme6: {
        normal: "Verdana, sans-serif",
        bold: "Trebuchet MS, sans-serif",
        background: "#009966",
        text: "#eeeeee",
        boxBackground: "#303134",
        border: "#004f3b"
    },
    // ใบเตย
    theme7: {
        normal: "Sarabun, sans-serif",
        bold: "Kanit, sans-serif",
        background: "#f1f8ee",
        text: "#1f3a2a",
        boxBackground: "#dcebd5",
        border: "#3f7d4e"
    },
    // ชมพู
    theme8: {
        normal: "Sarabun, sans-serif",
        bold: "Kanit, sans-serif",
        background: "#fdf2f5",
        text: "#3a2230",
        boxBackground: "#f6dbe4",
        border: "#c2416b"
    },
    // ฟ้า
    theme9: {
        normal: "Sarabun, sans-serif",
        bold: "Kanit, sans-serif",
        background: "#eef6fc",
        text: "#1c2c3d",
        boxBackground: "#d6e7f5",
        border: "#2563a8"
    },
    // แดงชาด
    theme10: {
        normal: "Sarabun, sans-serif",
        bold: "Kanit, sans-serif",
        background: "#fbf1ea",
        text: "#3b1d14",
        boxBackground: "#efd5c6",
        border: "#b33a1e"
    },
    // ลายรดน้ำ (ดำ-ทอง)
    theme11: {
        normal: "Sarabun, sans-serif",
        bold: "Kanit, sans-serif",
        background: "#1a1410",
        text: "#f1dfb0",
        boxBackground: "#0e0b08",
        border: "#c9a14a"
    },
    // ม่วงราตรี
    theme12: {
        normal: "Sarabun, sans-serif",
        bold: "Kanit, sans-serif",
        background: "#2a2238",
        text: "#ece6f5",
        boxBackground: "#1c1726",
        border: "#a68bd6"
    }
  };
  
  
  function setTheme(themeName) {
  
    const theme = themes[themeName];
  
    if (!theme) return;
  
    document.documentElement.style.setProperty(
        "--font-normal",
        theme.normal
    );
  
    document.documentElement.style.setProperty(
        "--font-bold",
        theme.bold
    );
  
    document.documentElement.style.setProperty(
        "--background",
        theme.background
    );
  
    document.documentElement.style.setProperty(
        "--text",
        theme.text
    );
  
    document.documentElement.style.setProperty(
        "--box-background",
        theme.boxBackground
    );

    document.documentElement.style.setProperty(
        "--border-color",
        theme.border
    );
  
    // จำธีมที่เลือก
    localStorage.setItem("selectedTheme", themeName);
  }
  
  
  // โหลดธีมที่เคยเลือกไว้
  const savedTheme = localStorage.getItem("selectedTheme");
  
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme("theme1");
  }
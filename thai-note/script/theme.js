const themes = {

    theme1: {
        normal: "Sarabun, sans-serif",
        bold: "Kanit, sans-serif",
        background: "#ffffff",
        text: "#222222",
        boxBackground: "#eeeeee"
    },
  
    theme2: {
        normal: "Tahoma, sans-serif",
        bold: "Arial, sans-serif",
        background: "#fff8dc",
        text: "#333333",
        boxBackground: "#f5e6b3"
    },
  
    theme3: {
        normal: "Verdana, sans-serif",
        bold: "Trebuchet MS, sans-serif",
        background: "#202124",
        text: "#eeeeee",
        boxBackground: "#303134"
    },
    theme4: {
        normal: "Verdana, sans-serif",
        bold: "Trebuchet MS, sans-serif",
        background: "#4b5a71",
        text: "#eeeeee",
        boxBackground: "#303134"
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
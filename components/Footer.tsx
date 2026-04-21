import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      {`© ${year} TikTok Video & Image Downloader`}<br />
      Made with ❤️ by <strong>Jenit Lal Shakya</strong><br />
      Not affiliated with TikTok or ByteDance Ltd.<br />
      All rights to original videos belong to their respective owners.<br />
    </footer>
  );
};

export default Footer;

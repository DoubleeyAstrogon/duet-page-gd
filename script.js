document.getElementById('year')?.append(new Date().getFullYear());

/* =====================
   CONTACT PAGE LOGIC
===================== */

document.addEventListener("DOMContentLoaded", () => {
  	const gmailBtn = document.getElementById("gmailBtn");
  	const copyBtn = document.getElementById("copyEmail");
  	const email = "zkonto45@gmail.com";  //hello
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const overlay = document.querySelector(".mobile-overlay");
    const links = document.querySelectorAll(".mobile-link");

  if (gmailBtn) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      gmailBtn.href = `mailto:${email}?subject=Duet%20Support`;
      gmailBtn.target = "_self";
    }
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = "✅ Email Copied!";
        setTimeout(() => {
          copyBtn.textContent = "📋 Copy Email Address";
        }, 2000);
      } catch {
        alert("Could not copy email.");
      }
    });
  }
    
	//Mobile Hamburger Menu Code i think mahbe
    if (hamburger && mobileMenu && overlay) {
      function closeMenu() {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
      }

      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("active");
        overlay.classList.toggle("active");
        document.body.style.overflow =
          mobileMenu.classList.contains("active") ? "hidden" : "";
      });

      overlay.addEventListener("click", closeMenu);

      links.forEach(link => {
        link.addEventListener("click", () => {
          links.forEach(l => l.classList.remove("active"));
          link.classList.add("active");
          closeMenu();
        });
      });
    }

}); // DOMContentLoaded

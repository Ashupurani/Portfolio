function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}
document.getElementById('year').textContent = new Date().getFullYear();

// Ensure résumé link works even if clicked before load
document.addEventListener('DOMContentLoaded', () => {
  const resumeLinks = document.querySelectorAll('a[href="assets/resume.pdf"]');
  resumeLinks.forEach(link => link.setAttribute('download', 'Ashu-Purani-Resume.pdf'));
});

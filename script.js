function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}
document.getElementById('year').textContent = new Date().getFullYear();

// Ensure résumé links download with a clean filename
document.addEventListener('DOMContentLoaded', () => {
  const resumeLinks = document.querySelectorAll('a[href="assets/resume.pdf"]');
  resumeLinks.forEach(link => link.setAttribute('download', 'Ashu-Purani-Resume.pdf'));
});
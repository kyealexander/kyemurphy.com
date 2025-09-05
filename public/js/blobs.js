document.addEventListener("DOMContentLoaded", () => {
  const blobs = document.querySelectorAll('.blob');

  blobs.forEach(blob => {
    const top = Math.floor(Math.random() * 80);
    const left = Math.floor(Math.random() * 80);
    blob.style.position = 'absolute';
    blob.style.top = `${top}%`;
    blob.style.left = `${left}%`;
    blob.style.width = '500px';
    blob.style.height = '500px';
  });

  setTimeout(() => {
    blobs.forEach(blob => blob.classList.add('blob-loaded'));
  }, 100);
});



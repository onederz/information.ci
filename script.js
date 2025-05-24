// Add this to your existing script
document.querySelectorAll('.room-option').forEach(option => {
  option.addEventListener('click', function() {
    const roomType = this.dataset.room;
    
    // Update active tab
    document.querySelectorAll('.room-option').forEach(opt => opt.classList.remove('active'));
    this.classList.add('active');
    
    // Update content
    document.querySelectorAll('.room-info').forEach(info => info.classList.remove('active'));
    document.querySelector(`.${roomType}-info`).classList.add('active');
  });
});


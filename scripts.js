
document.addEventListener("DOMContentLoaded", function() {
    // Creating random flying lines
    setInterval(function() {
        let line = document.createElement('div');
        line.classList.add('line');
        line.style.left = Math.random() * 100 + 'vw';
        line.style.top = Math.random() * 100 + 'vh';
        document.body.appendChild(line);
    }, 300);

    // Button functionality (optional)
    document.getElementById('enter-code').addEventListener('click', function() {
        alert('Enter Code functionality');
    });

    document.getElementById('bhb').addEventListener('click', function() {
        alert('BHB functionality');
    });
});

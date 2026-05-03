// Handles mobile navigation and quiz scoring for the Milestone 3 website.
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#main-menu');

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.textContent = isOpen ? 'Close menu' : 'Menu';
    });
  }

  const quizForm = document.querySelector('#quizForm');
  const resultBox = document.querySelector('#quizResult');

  if (quizForm && resultBox) {
    quizForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = new FormData(quizForm);
      let score = 0;
      const total = 8;

      const answers = {
        q1: 'a',
        q2: 'b',
        q3: 'b',
        q4: 'b',
        q5: 'b',
        q8: 'a'
      };

      Object.entries(answers).forEach(([name, correct]) => {
        if (form.get(name) === correct) {
          score += 1;
        }
      });

      const selectedQ6 = form.getAll('q6').sort().join(',');
      if (selectedQ6 === ['a', 'b', 'd'].join(',')) {
        score += 1;
      }

      const q7 = String(form.get('q7') || '').trim().toLowerCase();
      if (q7 === 'tls') {
        score += 1;
      }

      const percent = Math.round((score / total) * 100);
      const passed = percent >= 75;
      resultBox.className = `result-box show ${passed ? 'pass' : 'review'}`;
      resultBox.innerHTML = `
        <h3>${passed ? 'Strong result' : 'Keep reviewing'}</h3>
        <p>You scored <strong>${score} out of ${total}</strong> (${percent}%).</p>
        <p>${passed ? 'You understand the main differences between HTTP, HTTPS, TLS, and HTTP/3.' : 'Review the History, Security, and Key Concepts pages, then try again.'}</p>
      `;
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    quizForm.addEventListener('reset', () => {
      resultBox.className = 'result-box';
      resultBox.innerHTML = '';
    });
  }
});

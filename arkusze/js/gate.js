/* Bramka z hasłem. Ładowana w <head>, zanim cokolwiek się pokaże.
   Zmiana hasła: strona "Dla rodzica" > Zmiana hasła. Wygeneruj tam nową linię i wklej ją poniżej.
   To jest bramka, nie zamek. Trzyma z dala przypadkowych gości, nie kogoś, kto zna się na rzeczy. */
(function () {
  'use strict';
  var HASH = 'a726073d'; // hasło: nukacola

  var A = window.ARKUSZE = window.ARKUSZE || {};
  var KEY = 'akademia-arkusze:gate';

  function hash(s) {
    s = String(s == null ? '' : s).trim().toLowerCase();
    var h = 0x811c9dc5;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
    }
    return ('0000000' + h.toString(16)).slice(-8);
  }
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function remember() { try { localStorage.setItem(KEY, HASH); } catch (e) { /* tryb prywatny */ } }
  function unlocked() { return stored() === HASH; }

  A.gate = {
    hash: hash,
    isUnlocked: unlocked,
    lock: function () { try { localStorage.removeItem(KEY); } catch (e) {} }
  };

  if (unlocked()) return;
  // Zasłaniamy stronę od razu, jeszcze zanim przeglądarka narysuje treść.
  document.documentElement.classList.add('locked');

  function build() {
    var box = document.createElement('div');
    box.id = 'gate';
    box.innerHTML =
      '<form class="gate-card" autocomplete="off">' +
        '<svg class="gate-mark" viewBox="0 0 32 32" aria-hidden="true">' +
          '<rect x="3" y="3" width="26" height="26" rx="5" fill="#16202A"/>' +
          '<rect x="7" y="7" width="8" height="5" rx="1" fill="#34A853"/>' +
          '<rect x="17" y="7" width="8" height="5" rx="1" fill="#8A9AAA"/>' +
          '<rect x="7" y="14" width="8" height="5" rx="1" fill="#8A9AAA"/>' +
          '<rect x="17" y="14" width="8" height="5" rx="1" fill="#34A853"/>' +
          '<rect x="7" y="21" width="8" height="5" rx="1" fill="#34A853"/>' +
          '<rect x="17" y="21" width="8" height="5" rx="1" fill="#FFFFFF" fill-opacity=".85"/>' +
        '</svg>' +
        '<h1>Akademia Arkuszy</h1>' +
        '<p class="gate-lead">Ta strona jest prywatna. Wpisz hasło, żeby wejść.</p>' +
        '<div class="field"><label for="gate-pw">Hasło</label>' +
        '<input id="gate-pw" type="password" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="go"></div>' +
        '<label class="switch"><input id="gate-show" type="checkbox"> Pokaż hasło</label>' +
        '<p class="gate-err" role="alert" hidden>Nie to hasło. Spróbuj jeszcze raz.</p>' +
        '<button class="btn primary" type="submit">Wejdź</button>' +
        '<p class="gate-note">Hasło wpisujesz raz na tym komputerze. Potem strona już Cię pamięta.</p>' +
      '</form>';
    document.body.appendChild(box);

    var form = box.querySelector('form');
    var pw = box.querySelector('#gate-pw');
    var show = box.querySelector('#gate-show');
    var err = box.querySelector('.gate-err');
    var card = box.querySelector('.gate-card');

    show.addEventListener('change', function () {
      pw.type = show.checked ? 'text' : 'password';
      pw.focus();
    });
    pw.addEventListener('input', function () { err.hidden = true; });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (hash(pw.value) === HASH) {
        remember();
        document.documentElement.classList.remove('locked');
        box.remove();
        var main = document.getElementById('main');
        if (main) main.focus();
        return;
      }
      err.hidden = false;
      pw.select();
      card.classList.remove('shake');
      void card.offsetWidth;
      card.classList.add('shake');
    });
    pw.focus();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();

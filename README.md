# Akademia AI

Kurs 13 misji dla młodego człowieka, który chce sprawnie używać AI (ChatGPT na koncie rodzica) w codziennym życiu. Statyczna strona bez budowania: HTML, CSS i JavaScript, gotowa na GitHub Pages.

## Uruchomienie lokalne

Dowolny serwer plików w katalogu projektu, na przykład:

```bash
python3 -m http.server 8765
```

Potem otwórz `http://localhost:8765`. Otwieranie `index.html` bezpośrednio z dysku też działa, ale przycisk „Kopiuj” w niektórych przeglądarkach wymaga adresu `http://` albo `https://`.

## Publikacja na GitHub Pages

1. Utwórz publiczne repozytorium i wypchnij do niego zawartość tego katalogu (gałąź `main`).
2. W repozytorium: Settings → Pages → Source: „Deploy from a branch”, Branch: `main`, folder `/ (root)`.
3. Po minucie strona jest pod `https://<login>.github.io/<nazwa-repo>/`.

Plik `.nojekyll` wyłącza przetwarzanie Jekyll, dzięki czemu katalogi i pliki są serwowane bez zmian.

## Imię ucznia

Imię nie jest nigdzie w kodzie. Ustawia się je na stronie albo linkiem z parametrem, na przykład `https://<login>.github.io/<repo>/?imie=Filip`. Po otwarciu imię zapisuje się w przeglądarce i znika z adresu.

## Postęp

Postęp (zaliczone misje, odhaczone kroki, Dziennik) zapisuje się w `localStorage` przeglądarki. W Ustawieniach jest „kod zapisu” do przeniesienia postępu na inny komputer albo zrobienia kopii.

## Struktura

- `index.html` – szkielet strony, ładuje treść i logikę
- `css/style.css` – style
- `js/app.js` – routing (`#/misja/3`, `#/niezbednik`, `#/dziennik`, `#/rodzic`, `#/ustawienia`), zapis postępu, kopiowanie, animacja warstwy
- `js/content/misje-*.js` – treść misji (każda misja to jeden obiekt)
- `js/content/niezbednik.js` – karty technik
- `js/content/rodzic.js` – strona dla rodzica

## Dodanie misji

Skopiuj dowolny obiekt misji z `js/content/misje-*.js`, zmień `id` na kolejny numer i uzupełnij pola. Lista misji, warstwy wydruku i tabela dla rodzica budują się automatycznie. Formatowanie w treści: `**gruby**`, `` `kod` ``, `[[Klawisz]]`.

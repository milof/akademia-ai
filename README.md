# Akademia AI i Akademia Arkuszy

Dwa kursy misji dla młodych ludzi, w jednym repozytorium, pod jednym adresem GitHub Pages. Statyczne strony bez budowania: HTML, CSS i JavaScript.

- **Akademia AI** (katalog główny, `https://<login>.github.io/<repo>/`): 13 misji o sprawnym używaniu AI (ChatGPT na koncie rodzica) w codziennym życiu.
- **Akademia Arkuszy** (katalog `arkusze/`, `https://<login>.github.io/<repo>/arkusze/`): 15 misji o Arkuszach Google od zera do poziomu średniego: tabele, formuły, SUMA i spółka, pinezka `$`, sortowanie, wykresy, formatowanie warunkowe, JEŻELI, daty, WYSZUKAJ.PIONOWO, tabela przestawna, własny projekt.

Każdy kurs ma własne pliki (style, logikę, treść, bramkę z hasłem) i własny postęp w przeglądarce. Wspólne są tylko repozytorium, hasło i sposób publikacji. Poniższe uwagi dotyczą obu kursów; tam, gdzie kursy się różnią, jest to zaznaczone.

## Hasło

Wejście jest zamknięte hasłem **nukacola** (wielkie litery i spacje nie mają znaczenia). Wpisuje się je raz na danej przeglądarce. Przycisk „Zablokuj stronę” w Ustawieniach każe zapytać o nie ponownie.

Zmiana hasła: na stronie „Dla rodzica” danego kursu wpisz nowe hasło w sekcji „Zmiana hasła”, skopiuj wygenerowaną linię i wklej ją w `js/gate.js` (Akademia AI) albo `arkusze/js/gate.js` (Akademia Arkuszy) w miejsce linii zaczynającej się od `var HASH`. Oba kursy mają dziś to samo hasło, ale każdy ma własny plik bramki, więc mogą się rozjechać. Po zmianie wszyscy wpisują nowe hasło jeszcze raz.

To jest bramka, nie zamek. Zasłania stronę przed kimś, kto trafi na adres przypadkiem, a `robots.txt` i `noindex` trzymają ją poza wyszukiwarkami. Darmowe GitHub Pages działa tylko z publicznego repozytorium, więc treść kursu jest widoczna dla każdego, kto trafi na to repo. Nie ma tu nic prywatnego: żadnego imienia, żadnych rozmów, żadnych danych dziecka.

## Po wypchnięciu zmian

GitHub Pages odświeża się w około minutę, ale przeglądarka trzyma stare `style.css` i pliki `.js` jeszcze do dziesięciu minut. Jeśli po `git push` strona wygląda po staremu, to nie znaczy, że zmiana nie weszła. Wciśnij `Ctrl` + `Shift` + `R`, żeby wymusić pobranie od nowa, albo po prostu wróć za dziesięć minut.

## Uruchomienie lokalne

Dowolny serwer plików w katalogu projektu, na przykład:

```bash
python3 -m http.server 8765
```

Potem otwórz `http://localhost:8765` (Akademia AI) albo `http://localhost:8765/arkusze/` (Akademia Arkuszy). Otwieranie `index.html` bezpośrednio z dysku też działa, ale przycisk „Kopiuj” w niektórych przeglądarkach wymaga adresu `http://` albo `https://`.

## Publikacja na GitHub Pages

1. Utwórz publiczne repozytorium i wypchnij do niego zawartość tego katalogu (gałąź `main`).
2. W repozytorium: Settings → Pages → Source: „Deploy from a branch”, Branch: `main`, folder `/ (root)`.
3. Po minucie strona jest pod `https://<login>.github.io/<nazwa-repo>/`.

Plik `.nojekyll` wyłącza przetwarzanie Jekyll, dzięki czemu katalogi i pliki są serwowane bez zmian.

## Imię ucznia

Imię nie jest nigdzie w kodzie. Ustawia się je na stronie albo linkiem z parametrem, na przykład `https://<login>.github.io/<repo>/?imie=Imię` albo `https://<login>.github.io/<repo>/arkusze/?imie=Imię`. Po otwarciu imię zapisuje się w przeglądarce i znika z adresu.

## Postęp

Postęp (zaliczone misje, odhaczone kroki, Dziennik) zapisuje się w `localStorage` przeglądarki, osobno dla każdego kursu (klucze `akademia-ai:v1` i `akademia-arkusze:v1`). W Ustawieniach każdego kursu jest „kod zapisu” do przeniesienia postępu na inny komputer albo zrobienia kopii. Kod z jednego kursu nie pasuje do drugiego.

## Struktura

Akademia AI (katalog główny):

- `index.html` – szkielet strony, ładuje treść i logikę
- `css/style.css` – style
- `js/gate.js` – bramka z hasłem (ładowana w `<head>`, zanim pokaże się treść)
- `js/app.js` – routing (`#/misja/3`, `#/niezbednik`, `#/dziennik`, `#/rodzic`, `#/ustawienia`), zapis postępu, kopiowanie, animacja warstwy
- `js/content/misje-*.js` – treść misji (każda misja to jeden obiekt)
- `js/content/niezbednik.js` – karty technik
- `js/content/rodzic.js` – strona dla rodzica

Akademia Arkuszy (katalog `arkusze/`) ma ten sam układ: `arkusze/index.html`, `arkusze/css/style.css`, `arkusze/js/gate.js`, `arkusze/js/app.js`, `arkusze/js/content/*.js`. Różnice: paleta zielona, odznaka postępu to arkusz wypełniany komórka po komórce, a przykład w misji to podgląd arkusza (pole `example.sheets`) zamiast rozmowy z AI. Krok misji ma pole `copy` (formuła albo tabelka do wklejenia; kolumny rozdziela `\t`, wiersze `\n`), a zamiast sekcji „Dopytaj” jest „Spróbuj też” (pole `variants`).

## Dodanie misji

Skopiuj dowolny obiekt misji z `js/content/misje-*.js` (albo `arkusze/js/content/misje-*.js`), zmień `id` na kolejny numer i uzupełnij pola. Lista misji, odznaka postępu i tabela dla rodzica budują się automatycznie. Formatowanie w treści: `**gruby**`, `` `kod` ``, `[[Klawisz]]`, a w Akademii Arkuszy dodatkowo `{{Pozycja menu}}`.

## Formuły w Akademii Arkuszy

Wszystkie formuły są w zapisie dla arkusza z regionem Polska: polskie nazwy funkcji (SUMA, JEŻELI, WYSZUKAJ.PIONOWO), średnik między argumentami, przecinek dziesiętny. Nazwy i ścieżki w menu sprawdzone w polskiej pomocy Google 11 września 2026. Uwaga na dwie różnice względem Excela: największa liczba to `MAX` (nie MAKS), a „nie znaleziono” to `#N/A` (nie #N/D).

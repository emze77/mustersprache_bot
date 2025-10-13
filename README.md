## Was ist Commoning?

"Commoning heißt: Menschen organisieren sich auf Augenhöhe, um miteinander gut auszukommen sowie selbstbestimmt Nützliches für sich und andere herzustellen. Die Beteiligten entscheiden gemein-verantwortlich darüber, was sie brauchen und wie sie Vermögenswerte (Ressourcen, Zeit und Räume) bewirtschaften, gestalten und verteilen.

Vertrauen ist hierfür der Schlüssel. Es kann jedoch nicht vorausgesetzt werden, sondern entsteht im Tun. Commoning braucht einerseits eine Haltung, die Vertrauen gewährt, ohne vertrauensselig zu sein und andererseits Handlungen, die Vertrauen aktiv fördern. Die Muster des Commoning unterstützen beides." [\[1\]](http://mustersprache.commoning.wiki/view/welcome-visitors/view/commoning)

## Die Mustersprache des Commonings

Die Mustersprache des Commonings wurde insbesonders durch Silke Helfrich erforscht. Der erste Entwurf der Mustersprache enthält 33 Muster, welche nicht _erfunden_, sondern _gefunden_ wurden: Überall, wo Commoning stattfindet, kommt es zu sehr ähnlichen Herausforderungen. Die Muster sind keine Kopfgeburten zur Lösung dafür, sondern die Essenz von gelungen Lösungen, mit welchen diese Herausforderungen gemeistert wurden. Die Muster sind damit eine Werkzeug, um eine lebendige und faire Welt jenseits von Markt und Staat erreichen zu können. 

Die Texte der Muster unterliegen der CC BY-SA 4.0 - Lizenz; Urheber sind Silke Helfrich & Julia Petzold.

Die Illustrationen unterliegen der Peer Production License (PPL); Urheber ist Mercé M. Tarrés;

## Der Bot

Der Mastodon-Bot veröffentlicht einmal wöchentlich ein zufällig gewähltes Muster der Mustersprache. Nachdem jedes Muster einmal gepostet wurde, fängt die Auswahl wieder von vorne an.

Die technische Grundlage verdanke ich einem Tutorial von [The Coding Train](https://thecodingtrain.com/tracks/mastodon/mastodon/setting-up-a-mastodon-bot) − vielen Dank hierfür!

### Installation

#### Lokal Repository einrichten

Voraussetzung sind installiertes Git, Node und NPM.

Hole das Repository auf einen lokalen Ordner und Installiere dort die notwendigen Node-Packages:

```plaintext
npm install
```

Willst du den Code lokal laufen lassen, lege im Hauptordner die Datei “.env” an.

#### Auf Mastodon API-Keys holen

Gehe auf deinem Mastodon-Account auf **Einstellungen − Entwicklung** und lege eine neue Anwendung mit READ-WRITE Berechtigung an. Es werden drei Keys erstellt.

#### Keys einrichten

Öffne die .env-Datei und lege sie folgend an:

```plaintext
MASTODON_CLIENT_KEY=(CLIENT KEY EINFÜGEN)
MASTODON_CLIENT_SECRET=(SECRET KEY EINFÜGEN)
MASTODON_ACCESS_TOKEN=(ACCESS TOKEN einfüg
MASTODON_API_URL=https://climatejustice.social/api/v1/ (zum Beispiel)
```

Die Keys kommen ohne Anführungszeichen direkt nach dem “=”.

Die .env-Datei wird durch .gitignore nicht gepusht und das passt so. Willst du den Code **online laufen lassen**, lege die Keys auch online in deinem Repo ab. Auf Github: **Settings** − **Secrets and variables** − **Action** − **New repository secret** (Drei mal anlegen mit gleichem Namen wie in der .env-Datei). In der run-bot.yml-Datei musst du außerdem noch die Mastodon-Api anpassen.

#### Run

```plaintext
node js/bot.js
```
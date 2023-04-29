<br />

<p align="center">
    <img src="https://raw.githubusercontent.com/cedricr/100joursdezbeul/main/static/ogimg-v2.png" alt="100joursdezbeul logo" height="280">
</p>

<p align="center">
    <img src="https://img.shields.io/badge/license-MIT-green" alt="license" />
    <img alt="flat" src="https://img.shields.io/badge/mastodon-@SolInfoNat-lightgrey?logo=mastodon&style=social">
    <img alt="flat" src="https://img.shields.io/badge/twitter-@SolInfoNat-lightgrey?logo=twitter&style=social">
</p>

<br />

## Proposer un événement

Utiliser le framaforms: https://framaforms.org/100-jours-de-zbeul-proposer-un-evenement-1682372493

## Contribuer au code

Lancer le projet localement:

```
npm install

npm run dev -- --open
```

Pour pouvoir traiter les données de Framaform:
1. exporter les résultats du framaform en CSV
2. Copier/coller les resultats dans https://cloud.solidairesinformatique.org/f/546961 à partir de la colonne B
3. Revérifier les soumissions en ajoutant 'x' dans la colonne A pour ceux qui sont des soumissions multiples et ne doivent pas être traités
4. Lancer le script d'update

/!\ ne modifier que la colonne A dans ce fichier, les autres seront ecrasées à chaque mise à jour.

Pour mettre à jour les données depuis le spreadsheet:
1. on lance `npm run updateData -- '<username nextcloud>' '<password nextcloud>'` en local
2. Créer votre MR/Patch
3. Mettre à jour le spreadsheet avec le contenu de `new-events.csv`
4. Mettre à jour le spreadsheet https://cloud.solidairesinformatique.org/f/544151 pour requalifier les events manuellement
 
Le script va générer 5 fichiers:
- `src/lib/assets/data.json` : contient les données valides qui seront affichées sur le site. A commit apres revérification
- `src/lib/assets/data-ignored.json` : contient les données invalides qui ne seront pas affichées sur le site. A commit apres revérification
- `src/lib/assets/metadata.json` : contient les meta données de l'import. A commit apres revérification
- `new-events.csv` : contient les nouveaux events créé par Attac et ceux venant du framaform, a copier dans le spreadsheet à la main. NE PAS COMMIT
- `data-<timestamp>.bck.json` : contient les données avant l'import au cas où il y a un soucis. NE PAS COMMIT


Pour contribuer anonymement:
1. faites un checkout du projet
2. allez dans le repertoire du projet
3. lancez `git config --local user.name "anonymous"` pour changer vos noms dans tous les commits
4. lancez  `git config --local user.email "anonymous@anonymous.com"` pour changer votre emain dans tous les commits
5. lancez  `git config --local commit.gpgsign false` pour ne pas envoyer votre clef gpg si vous en avez une 
6. créez une branche comme habituellement 
7. faites vos modifications
8. créez un patch avec `git format-patch origin/main`
9. envoyez le à un contributeur public du projet via leur page de profile > contact

## Remerciements

Immenses remerciements à :

- Attac pour les [données](https://france.attac.org/se-mobiliser/retraites-pour-le-droit-a-une-retraite-digne-et-heureuse/article/on-ne-les-lache-pas-la-carte-des-mobilisations)
- [@Teddyruptif](https://nitter.net/Teddyruptif/) pour le [logo](https://nitter.net/Teddyruptif/status/1649460414676172803)
- Toustes les camarades de Solidaires Informatique qui ont contribué ou encouragé ce projet !

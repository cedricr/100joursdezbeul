Lancer le projet localement:

```
npm install

npm run dev -- --open
```

Pour mettre à jour les données depuis le spreadsheet:
1. on met à jour le spreadsheet à la main
2. on l'export en CSV
3. on lance `npm run updateData -- <fichier.csv>` en local
4. Créer votre MR/Patch
5. Mettre à jour le spreadsheet avec le contenu de `attac-new-events.csv`
 
Le script va générer 5 fichiers:
- `src/lib/assets/data.json` : contient les données valides qui seront affichées sur le site. A commit apres revérification
- `src/lib/assets/data-ignored.json` : contient les données invalides qui ne seront pas affichées sur le site. A commit apres revérification
- `src/lib/assets/metadata.json` : contient les meta données de l'import. A commit apres revérification
- `attac-new-events.csv` : contient les nouveaux events créé par Attac, a copier dans le spreadsheet à la main. NE PAS COMMIT
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

Immenses remerciements à :

- Attac pour les [données](https://france.attac.org/se-mobiliser/retraites-pour-le-droit-a-une-retraite-digne-et-heureuse/article/on-ne-les-lache-pas-la-carte-des-mobilisations)
- [@Teddyruptif](https://nitter.net/Teddyruptif/) pour le [logo](https://nitter.net/Teddyruptif/status/1649460414676172803)
- Toustes les camarades de Solidaires Informatique qui ont contribué ou encouragé ce projet !

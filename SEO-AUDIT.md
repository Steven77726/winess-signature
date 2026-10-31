# Audit SEO WINESS Signature — 31 octobre 2026

## Réalisé
- Identification du dépôt de production par correspondance exacte de index.html téléchargé et CNAME : Steven77726/winess-signature. Le dépôt WINESSIGNATURE est une ancienne version, non modifiée.
- Trois pages originales : mariage, anniversaire, entreprise. Réutilisation des photos, styles, tarifs et coordonnées existants. Métadonnées propres, canonique, Service et BreadcrumbList.
- Liens du menu vers les pages dédiées ; accès à la page casher.
- Navigation transversale sur 14 pages : correction des deux pages orphelines bar-mobile-paris.html et vin-casher-paris.html.
- Recentrage du titre/H1 de la page casher sur le bar à cocktails : l'offre est un service bar, pas un traiteur de repas. URL historique conservée.
- Page bar mobile : cible location avec bartender, sans promettre de location de matériel seul.
- Sitemap de 11 à 14 URL ; dates des pages effectivement modifiées mises à jour.
- Aucune modification des CSS, photos, prix, horaires disponibles ou traitement des demandes de devis.

## Constat technique
Le HTML principal est rendu directement, non dépendant de JavaScript pour les contenus SEO. Robots autorise l'exploration ; canoniques, description, sitemap, GA4 et données structurées existent déjà. Pas de noindex trouvé sur les pages de contenu. Accueil HTTP 200 constaté. Les vidéos sont déjà chargées à la demande (preload none). Ne pas confondre taille des médias du dépôt et poids du chargement initial.

Avant : 11 pages de contenu, deux pages sans lien entrant ; liens mariage/anniversaire/entreprise vers un formulaire générique. Après : 14 pages à titre unique, une H1 et une canonique chacune, JSON-LD analysable, aucune ressource locale liée manquante. Vérification visuelle du modèle mariage sur navigateur. Les Core Web Vitals réels et les performances mobiles chiffrées ne sont pas disponibles dans cette session : aucun score inventé.

## Mots-clés et destinations
| Intention | Destination principale |
|---|---|
| location bar mobile Paris / Île-de-France, avec barman | bar-mobile-paris.html |
| bar à cocktails mariage Paris / IDF | bar-cocktails-mariage.html |
| bar à cocktails anniversaire, barman à domicile | bar-cocktails-anniversaire.html |
| bar à cocktails entreprise, afterwork, soirée professionnelle | bar-cocktails-entreprise.html |
| bar mobile casher / cacher / kosher Paris | traiteur-casher-paris.html |
| bar à cocktails Paris, prestations | bar-cocktails.html |
| bar à vin et vins casher | bar-vin.html / vin-casher-paris.html |

Ces priorités reposent sur l'offre et les résultats observés, pas sur des volumes de recherche mesurés. Pas de multiplication de pages quasi identiques par ville. Les autres destinations d'IDF restent soumises à faisabilité selon l'offre existante.

## Concurrence observée
- Agence Vybe : page mariage spécifique, organisation et carte détaillées. https://www.agencevybe.com/mariage
- Bar'OOF : page mariage avec budgets, déroulé, FAQ et témoignages affichés. https://baroof.fr/bar-cocktails-mariage/
- Marizinha : catégories par événement, fondatrice et avis clients. https://www.marizinha.fr/
- Mixodyssée : page dédiée au service casher et clarification du niveau d'exigence. https://www.mixodyssee.fr/bar-cocktails-casher-evenement
- Love Tonight : positionnement mobile et casher explicite. https://love-tonight.com/
- LE BAR MOBILE : intention distincte de location de mobilier ; éviter de promettre cette offre si elle n'est pas proposée. https://lebarmobile.paris/

Les résultats de recherche consultés ne constituent pas un relevé de positions Google géolocalisé. Les avis et chiffres concurrents sont des affirmations de leurs sites, non audités.

## Mesure et blocages
Search Console : propriété https://winesssignature.fr/ détectée via Windsor, mais lectures bloquées : deux comptes Search Console connectés pour un forfait limité à un compte. Le connecteur renvoie des lignes de démonstration à zéro, parfois datées hors période ; elles ne sont PAS des statistiques. Aucun compte déconnecté, aucun forfait modifié. Rétablir la lecture depuis https://onboard.windsor.ai/app/ selon le choix du propriétaire. L'outil accessible ne permet pas de confirmer l'indexation URL par URL ni de soumettre le sitemap.

GA4 G-T4J0JQ16P6 présent ; événement devis_submit prévu après réponse positive du formulaire. Aucun faux devis envoyé. Accès au compte GA4 non établi, donc conversions et audience non vérifiées.

À mesurer après récupération des accès : clics, impressions, CTR et position par page/requête sur 28 jours, comparaison aux 28 jours précédents, France et mobile séparés ; demandes de devis réellement reçues ; indexation des trois nouvelles URL et sitemap. Un gain de classement ne peut pas être constaté le jour de publication.

## Travail restant qui exige des preuves métier ou des accès
1. Ajouter des cas clients réels (type d'événement, lieu, photos autorisées, organisation, témoignage autorisé). La galerie existe, mais les réalisations contextualisées restent limitées. Ne pas inventer d'avis ni de statistiques.
2. Vérifier la fiche Google Business, son lien vers le site et les services ; obtenir des avis authentiques et des liens de salles, traiteurs et partenaires pertinents. Aucun audit exhaustif de backlinks ni accès Business Profile réalisé.
3. Préciser les justificatifs et conditions de cacherout par événement avec le responsable ; ne pas afficher une certification globale non établie.
4. Consulter l'inspection URL et les Core Web Vitals dans Search Console dès le déblocage, puis corriger les problèmes réellement signalés.

Référence Google : https://developers.google.com/search/docs/fundamentals/seo-starter-guide — contenu utile, liens explorables, titres descriptifs ; effet à observer sur plusieurs semaines, aucune première page garantie.

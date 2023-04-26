<script lang="ts">
  const links = [{
    "content": "Article dans le média actu.fr",
    "source": "https://actu.fr/societe/100-jours-de-zbeul-la-seine-saint-denis-gagnera-t-elle-la-competition-anti-gouvernement_59197483.html",
    "image": "https://static.actu.fr/themes/actu_v2/dist/favicons/apple-touch-icon.png"
  },
  {
    "content": "Article dans le média regards.fr",
    "source": "http://www.regards.fr/actu/article/100-jours-de-zbeul-un-intervilles-des-casserolades-pour-contrer-l-apaisement",
    "image": "http://s.regards.oonops.eu/5re8/ico/144x144.png",
  },
  {
    "content": "Article dans le média France Bleu",
    "source": "https://www.francebleu.fr/infos/politique/l-herault-en-tete-d-une-competition-anti-gouvernement-qui-recense-les-casserolades-et-manifestations-6412137",
    "image": "https://www.francebleu.fr/images/apple-touch-icon.png",
  },
  {
    "content": "Carte Blanche vidéo de Lisa Lap, journaliste chez Le Média",
    "source": "https://www.youtube.com/watch?v=BOQCN89XQbk",
    "image": "https://yt3.googleusercontent.com/ytc/AGIKgqPkt6CndIvJYPiDUCVHzahnXjcnvoyr2N71n-MQqw=s176-c-k-c0x00ffffff-no-rj",
  },
  {
    "content": "Tweet de Nathalie Oziol, députée de Montpellier",
    "source": "https://nitter.net/NathalieOziol/status/1651105199958683648",
    "image": "https://nitter.net/pic/profile_images%2F1622999707218845696%2FX0c3RksC_bigger.jpg",
  },
];

const _line = document.querySelector('#line');
const _list = document.querySelector("#list");

const buildLine = (item) => {
    const copy = _line.content.cloneNode(true);
    const link = copy.querySelector(".link");
    link.href = item.source;
    link.textContent = item.content;
     
    const image = copy.querySelector(".image");
    image.src = item.image;
    return copy;
}

links.map(buildLine).forEach(line => {
    _list.appendChild(line);
})
</script>

<svelte:head><title>Presse | 100 jours de zbeul</title></svelte:head>

<main role="main">
	<div class="mx-auto mt-16 max-w-2xl">
    
    
		<h2>Revue de presse</h2>
    
		<ul id="list"></ul>

    <!-- todo: migrate to svelte compoment instead -->
    <template id="line">
      <li class="flex items-center gap-2 mb-3">
        <img class="image w-12 h-12 rounded-full" src="" alt="" width="384" height="512">
        <a class="link text-lg font-medium no-underline hover:underline"></a>
      </li>
    </template>
    
	</div>
</main>

<style lang="postcss">

</style>

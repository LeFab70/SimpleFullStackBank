export const initZoneDisplay =  () => {
  const zoneNouveauCompte = document.getElementById("zoneNouveauCompte");
  const zoneModificationCompte = document.getElementById(
    "zoneModificationCompte"
  );
  const zoneSuppressionCompte = document.getElementById(
    "zoneSuppressionCompte"
  );
  const zoneListeCompte = document.getElementById("zoneListeCompte");
  const zones = {
    "Nouveau compte": zoneNouveauCompte,
    "Modifier compte": zoneModificationCompte,
    "Supprimer compte": zoneSuppressionCompte,
    "Lister comptes": zoneListeCompte,
  };
  const buttonsDisplayOption = document.querySelectorAll(
    ".button-group > input[type=button]"
  );
  buttonsDisplayOption.forEach((button) => {
    button.addEventListener("click", () => {
      // cacher toutes les zones
      Object.values(zones).forEach((zone) => {
        zone.classList.remove("displayBloc");
        zone.classList.add("displayNone");
      });
      // afficher la zone correspondant au bouton cliqué
      const zoneToShow = zones[button.value];
      //console.info(zoneToShow);
      if (zoneToShow) {
        zoneToShow.classList.remove("displayNone");
        zoneToShow.classList.add("displayBloc");
      }
    });
  });
};

//with xmlhttprequest

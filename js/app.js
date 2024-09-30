// for (let i = 0; i<5; i++) {
//     setTimeout(() => {
//         const m = new Modal(5000, `Ceci est la modale ${i}`);
//     }, i*Math.random()*1000);
// }

const products = [
  {
    product: "Clavier mécanique",
  },
  {
    product: "Souris ergonomique",
  },
  {
    product: 'Ecran 24"',
  },
  {
    product: 'Ecran 27 UHD"',
  },
  {
    product: "Webcam Ultra HD",
  },
  {
    product: "Mémoire 16Go",
  },
];

const addModal = document.querySelector("#addModal");
const addBlueModal = document.querySelector("#addBlueModal");
addModal.addEventListener("click", () => {
  const prodId = (Math.floor(Math.random() * products.length));
  // const m = new Modal(5000, `${products[prodId].product}`);
  const m = new Modal(3000, `${products[prodId].product}`, 'modalStyle');
});
addBlueModal.addEventListener("click", () => {
  const prodId = (Math.floor(Math.random() * products.length));
  // const m = new Modal(5000, `${products[prodId].product}`);
  const m = new Modal(3000, `${products[prodId].product}`, 'modalBlue');
});
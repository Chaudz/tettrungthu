export type Rarity = "Common" | "Rare" | "Epic" | "Legendary";

export interface Prize {
  id: string;
  title: string;
  description: string;
  image: string;
  rarity: Rarity;
}

export const prizes: Prize[] = [
  {
    id: "p1",
    title: "Combo trà, bánh trung thu, lồng đèn",
    description: "Combo trà, bánh trung thu, lồng đèn",
    image: "/assets/combo.png",
    rarity: "Legendary",
  },
  {
    id: "p2",
    title: "Balo",
    description: "Balo",
    image: "/assets/balo.png",
    rarity: "Epic",
  },
  {
    id: "p3",
    title: "Thỏ mặt trăng",
    description: "Thỏ mặt trăng",
    image: "/assets/tho.png",
    rarity: "Rare",
  },
  {
    id: "p4",
    title: "Kẹo mút",
    description: "Kẹo mút",
    image: "/assets/keo-mut.png",
    rarity: "Common",
  },
  // {
  //   id: 'p5',
  //   title: 'Tea Set with Moon Motif',
  //   description: 'Elegant ceramic tea set with moon and star designs.',
  //   image: '/assets/tea-set.png',
  //   rarity: 'Epic',
  // },
  // {
  //   id: 'p6',
  //   title: 'Festival Voucher',
  //   description: 'Gift voucher for local Mid-Autumn treats.',
  //   image: '/assets/voucher.png',
  //   rarity: 'Common',
  // },
  // {
  //   id: 'p7',
  //   title: 'Jade Rabbit Pendant',
  //   description: 'Handcrafted jade pendant with rabbit design.',
  //   image: '/assets/jade-pendant.png',
  //   rarity: 'Legendary',
  // },
  // {
  //   id: 'p8',
  //   title: 'Star Projector',
  //   description: 'Projects stars and moon patterns on your ceiling.',
  //   image: '/assets/star-projector.png',
  //   rarity: 'Rare',
  // },
  // {
  //   id: 'p9',
  //   title: 'Moon Festival Tote Bag',
  //   description: 'Canvas bag with festive Mid-Autumn designs.',
  //   image: '/assets/tote-bag.png',
  //   rarity: 'Common',
  // },
];

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "cstrat",
  description:
    "Counter-Strike Stratroulette",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Strategies",
      href: "/strategies",
      disabled: true
    },
  ],
  links: {
  },
}
const env = import.meta.env;

// Payment Links are public checkout URLs, one per fixed-price service.
export const stripePaymentLinks: Record<string, string | undefined> = {
  "yoga-ind-1": env.PUBLIC_STRIPE_LINK_YOGA_IND_1 || undefined,
  "yoga-ind-5": env.PUBLIC_STRIPE_LINK_YOGA_IND_5 || undefined,
  "yoga-ind-8": env.PUBLIC_STRIPE_LINK_YOGA_IND_8 || undefined,
  "yoga-grp-1": env.PUBLIC_STRIPE_LINK_YOGA_GRP_1 || undefined,
  "yoga-grp-4": env.PUBLIC_STRIPE_LINK_YOGA_GRP_4 || undefined,
  "yoga-grp-8": env.PUBLIC_STRIPE_LINK_YOGA_GRP_8 || undefined,
  "massaggio-30": env.PUBLIC_STRIPE_LINK_MASSAGGIO_30 || undefined,
  "massaggio-100": env.PUBLIC_STRIPE_LINK_MASSAGGIO_100 || undefined,
  riflessologia: env.PUBLIC_STRIPE_LINK_RIFLESSOLOGIA || undefined,
  "linf-inferiori": env.PUBLIC_STRIPE_LINK_LINF_INFERIORI || undefined,
  "linf-superiori": env.PUBLIC_STRIPE_LINK_LINF_SUPERIORI || undefined,
  "linf-addome": env.PUBLIC_STRIPE_LINK_LINF_ADDOME || undefined,
  "linf-viso": env.PUBLIC_STRIPE_LINK_LINF_VISO || undefined,
};

export const paths = {
  home: "/",
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    forgotPassword: "/auth/forgot-password",
  },
  dashboard: {
    overview: "/dashboard",
    quotations: {
      main: "/dashboard/quotations",
      create: "/dashboard/quotations/create",
      single: (id: String) => `/dashboard/quotations/${id}`,
    },
    users: {
      main: "/dashboard/users",
      single: (id: String) => `/dashboard/users/${id}`,
    },
    invoices: {
      main: "/dashboard/invoices",
      single: (id: String) => `/dashboard/invoices/${id}`,
    },
    settings: "/dashboard/settings",
    account: "/dashboard/account",
  },
  errors: {
    notFound: "/errors/not-found",
    notAuthorized: "/errors/not-authorized",
  },
  userStatus: {
    pending: "/pending-account",
    blocked: "/blocked-account",
  },
  tcs: "/terms-and-conditions",
  privacyPolicy: "/privacy-policy",
} as const;

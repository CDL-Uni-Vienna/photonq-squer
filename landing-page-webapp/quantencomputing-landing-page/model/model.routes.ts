export enum Path {
  Login = "/login",
  Register = "/register",
  Profile = "/profile",
  MyProjects = "/my-projects",
  SingleExperiment = "/experiment/:id",
  ExperimentResult = "/experiment/:id/result",
  HowToGuides = "/how-to-guides",
}

export function getPathWithId(id: string, path: Path) {
  if (!path.includes(":id")) throw new Error("Path has no id");
  return path.replace(":id", id);
}

/**
 *
 */
export function getPublicRoutes() {
  return [
    {
      href: Path.Login,
      label: "Login",
    },
    {
      href: Path.Register,
      label: "Register",
    },
  ];
}

/**
 *
 */
export function getPrivateRoutes() {
  return [
    {
      href: Path.Profile,
      label: "Profile",
    },
    {
      href: Path.MyProjects,
      label: "My Experiments",
    },
    {
      href: Path.SingleExperiment,
      label: "Experiment",
    },
    {
      href: Path.ExperimentResult,
      label: "Result",
    },
  ];
}

/**
 *
 */
export function getPathsWithoutNavbar(): string[] {
  return ["experiment"];
}

/**
 *
 */
export function getLoggedInNavbarRoutes() {
  return [
    {
      href: Path.Profile,
      label: "Profile",
    },
    {
      href: Path.MyProjects,
      label: "My Experiments",
    },
    {
      href: Path.HowToGuides,
      label: "How to Guides",
    },
  ];
}

export function getLoggedOutNavbarRoutes() {
  return [
    {
      href: "/",
      label: "Home",
    },
    {
      href: Path.HowToGuides,
      label: "How to Guides",
    },
    {
      href: Path.Login,
      label: "Create Account",
    },
  ];
}
// Everything about the current job lives in one object. When you change companies, edit the
// `employer` below (and pick or add a motif in components/CompanyName.tsx) — every mention of the
// company on the site, and its little name animation, follows automatically.

// How the company name animates when it appears. Add a new one per company if you like.
export type Motif = "drive" | "none";

type EmployerInit = {
  name: string;
  legalName: string;
  city: string;
  startMonth: string;
  startYear: string;
  motif: Motif;
};

class Employer {
  readonly name: string;
  readonly legalName: string;
  readonly city: string;
  readonly startMonth: string;
  readonly startYear: string;
  readonly motif: Motif;

  constructor({ name, legalName, city, startMonth, startYear, motif }: EmployerInit) {
    this.name = name;
    this.legalName = legalName;
    this.city = city;
    this.startMonth = startMonth;
    this.startYear = startYear;
    this.motif = motif;
  }

  /** "August 2023" */
  get since() {
    return `${this.startMonth} ${this.startYear}`;
  }

  /** "2023–now" */
  get period() {
    return `${this.startYear}–now`;
  }
}

export const employer = new Employer({
  name: "Volkswagen Group",
  legalName: "Volkswagen Group Technology Solutions India",
  city: "Gurugram",
  startMonth: "August",
  startYear: "2023",
  // A car-like "drive-in": the name rolls in with a slight lean and a road stripe sweeps under it.
  motif: "drive",
});

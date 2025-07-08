export interface Genome {
  person: Person;
  stats: Stats;
  strengths: Strength[];
}

export interface Person {
  professionalHeadline: string;
  completion: number;
  showPhone: boolean;
  created: string;
  verified: boolean;
  flags: Flags;
  weight: number;
  ggId: string;
  completionStage: CompletionStage;
  locale: string;
  subjectId: number;
  picture: string;
  hasEmail: boolean;
  isTest: boolean;
  name: string;
  links: Link[];
  location: Location;
  theme: string;
  id: string;
  pictureThumbnail: string;
  claimant: boolean;
  summaryOfBio: string;
  weightGraph: string;
  publicId: string;
}

export interface Flags {
  accessCohort: boolean;
  benefits: boolean;
  canary: boolean;
  enlauSource: boolean;
  fake: boolean;
  featureDiscovery: boolean;
  firstSignalSent: boolean;
  signalsOnboardingCompleted: boolean;
  importingLinkedin: boolean;
  onBoarded: boolean;
  remoter: boolean;
  signalsFeatureDiscovery: boolean;
  importingLinkedinRecommendations: boolean;
  contactsImported: boolean;
  appContactsImported: boolean;
  genomeCompletionAcknowledged: boolean;
  cvImported: boolean;
  communityCreatedPrivate: boolean;
  communityCreatedClaimed: boolean;
  connectBenefitsViewed: boolean;
  recommendationLeadEmailSent: boolean;
  recommendationsAskedGenomeCompletion: boolean;
  behavioralTraitsAcknowledged: boolean;
  testTaken: boolean;
  previewFeatureDiscovery: boolean;
  boosted: boolean;
  addedFromTeamGenomeOrJobPost: boolean;
  reorderedExperiences: boolean;
  invited: boolean;
  invitationRequested: boolean;
  genomeIndexed: boolean;
}

export interface CompletionStage {
  stage: number;
  progress: number;
}

export interface Link {
  id: string;
  name: string;
  address: string;
}

export interface Location {
  name: string;
  shortName: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  placeId: string;
}

export interface Stats {
  strengths: number;
  publications: number;
  awards: number;
  education: number;
  jobs: number;
  projects: number;
}

export interface Strength {
  id: string;
  code: number;
  name: string;
  proficiency: string;
  implicitProficiency: boolean;
  weight: number;
  recommendations: number;
  media: unknown[];
  supra: boolean;
  created: string;
  hits: number;
  relatedExperiences: unknown[];
  pin: boolean;
}

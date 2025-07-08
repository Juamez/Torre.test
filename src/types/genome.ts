export interface Genome {
  person: Person;
  strentghs: Strengths[];
}

export interface Person {
  name: string;
  ggId: string;
  theme: string;
  completion: number;
  picture: string;
}

export interface Strengths {
  hits: number;
  name: string;
  id: string;
}
